import { Injectable, signal } from '@angular/core';
import { FormField } from '../models/field';
import { FormRow } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  #rows = signal<FormRow[]>([]);
  rows = this.#rows.asReadonly();

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
}
