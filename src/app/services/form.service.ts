import { computed, Injectable, signal } from '@angular/core';
import { FormField } from '../models/field';
import { FormRow } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
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

    this.#rows.set(newRows);
  }

  removeField(fieldId: string) {
    const r = this.#rows();
    const newRows = r.map((row) => {
      const newFields = row.fields.filter((field) => field.id !== fieldId);
      return { ...row, fields: newFields };
    });

    this.#rows.set(newRows);
  }

  addRow() {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };
    this.#rows.update((rows) => [...rows, newRow]);
  }

  deletwRow(rowId: string) {
    if (this.#rows().length === 1) {
      return;
    }
    const newRows = this.#rows().filter((row) => row.id !== rowId);
    this.#rows.set(newRows);
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex = -1,
  ) {
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
}
