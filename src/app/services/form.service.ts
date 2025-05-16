import {
  ApplicationRef,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { FormField } from '../models/field';
import { FormRow } from '../models/form';
import { startViewTransition } from '../utils/view-transition';
import { FieldTypesService } from './field-types.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  fieldTypesService = inject(FieldTypesService);
  appRef = inject(ApplicationRef);

  #rows = signal<FormRow[]>([]);
  // #selectedRowId = signal<string | null>(null);
  #selectedFieldId = signal<string | null>(null);

  rows = this.#rows.asReadonly();
  selectedField = computed(() =>
    this.#rows()
      .flatMap((row) => row.fields)
      .find((field) => field.id === this.#selectedFieldId()),
  );

  constructor() {
    this.#rows.set([
      {
        id: crypto.randomUUID(),
        fields: [],
      },
    ]);
  }

  addField(field: FormField, rowId: string, index?: number) {
    const r = this.#rows();
    const newRows = r.map((row) => {
      if (row.id === rowId) {
        const newFields = [...row.fields];
        if (index !== undefined) {
          newFields.splice(index, 0, field);
        } else {
          newFields.push(field);
        }
        return { ...row, fields: newFields };
      }
      return row;
    });

    startViewTransition(() => {
      this.#rows.set(newRows);
    });
  }

  removeField(fieldId: string) {
    const r = this.#rows();
    const newRows = r.map((row) => {
      const newFields = row.fields.filter((field) => field.id !== fieldId);
      return { ...row, fields: newFields };
    });

    startViewTransition(() => {
      this.#rows.set(newRows);
      this.appRef.tick();
    });
  }

  addRow() {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };
    startViewTransition(() => {
      this.#rows.update((rows) => [...rows, newRow]);
    });
  }

  deleteRow(rowId: string) {
    if (this.#rows().length === 1) {
      return;
    }
    const newRows = this.#rows().filter((row) => row.id !== rowId);
    startViewTransition(() => {
      this.#rows.set(newRows);
      this.appRef.tick();
    });
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex = -1,
  ) {
    startViewTransition(() => {
      const r = [...this.#rows()];

      let fieldToMove: FormField | undefined;
      let sourceRowIndex = -1;
      let sourceFieldIndex = -1;

      r.forEach((row, rowIndex) => {
        if (row.id === sourceRowId) {
          sourceRowIndex = rowIndex;
          sourceFieldIndex = row.fields.findIndex(
            (field) => field.id === fieldId,
          );
          if (sourceFieldIndex >= 0) {
            fieldToMove = row.fields[sourceFieldIndex];
          }
        }
      });

      if (!fieldToMove) return;

      const newRows = [...r];
      const fieldsWithRemovedField = newRows[sourceRowIndex].fields.filter(
        (field) => field.id !== fieldId,
      );
      newRows[sourceRowIndex].fields = fieldsWithRemovedField;

      const targetRowIndex = newRows.findIndex((row) => row.id === targetRowId);
      if (targetRowIndex >= 0) {
        const targetFields = [...newRows[targetRowIndex].fields];
        targetFields.splice(targetIndex, 0, fieldToMove);
        newRows[targetRowIndex].fields = targetFields;
      }

      this.#rows.set(newRows);
      this.appRef.tick();
    });
  }

  setSelectedField(fieldId: string | null) {
    this.#selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const r = this.#rows();
    const newRows = r.map((row) => ({
      ...row,
      fields: row.fields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, ...data };
        }
        return field;
      }),
    }));

    this.#rows.set(newRows);
  }

  moveRowUp(rowId: string) {
    const r = this.#rows();
    const rowIndex = r.findIndex((row) => row.id === rowId);
    if (rowIndex > 0) {
      const newRows = [...r];
      const [movedRow] = newRows.splice(rowIndex, 1);
      newRows.splice(rowIndex - 1, 0, movedRow);

      startViewTransition(() => {
        this.#rows.set(newRows);
      });
    }
  }

  moveRowDown(rowId: string) {
    const r = this.#rows();
    const rowIndex = r.findIndex((row) => row.id === rowId);
    if (rowIndex < r.length - 1) {
      const newRows = [...r];
      const [movedRow] = newRows.splice(rowIndex, 1);
      newRows.splice(rowIndex + 1, 0, movedRow);
      startViewTransition(() => {
        this.#rows.set(newRows);
      });
    }
  }

  // export  related
  exportForm() {
    const formCode = this.generateFormCode();
    const blob = new Blob([formCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form.ts';
    a.click();
    URL.revokeObjectURL(url);
  }

  generateFormCode(): string {
    let code = this.generateImports();
    code += this.generateDecorators();

    return code;
  }

  generateImports(): string {
    return `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
      `;
  }

  generateDecorators(): string {
    // ,
    return `
@Component({
  selector: 'app-generated-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  template: \`${this.generateTemplate()}\`
})
export class GeneratedFormComponent {}
    `;
  }

  generateTemplate(): string {
    return `
      <form class="flex flex-col gap-4">
        ${this.generateFormFields()}
      </form>
    `;
  }

  generateFormFields(): string {
    let formFields = '';
    this.#rows()
      .filter((row) => row.fields.length > 0)
      .forEach((row) => {
        formFields += `
          <div class="flex flex-wrap gap-4">
          ${row.fields
            .map((field) => {
              return `
                <div class="flex-1">
                  ${this.generateFieldCode(field)}
                </div>
              `;
            })
            .join('\n')}
          </div>
        `;
      });

    return formFields;
  }

  generateFieldCode(field: FormField): string {
    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    if (!fieldDef) return '';

    return fieldDef.generateCode(field);
  }
}
