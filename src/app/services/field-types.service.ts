import { Injectable } from '@angular/core';
import { CheckboxFieldComponent } from '../components/field-types/checkbox-field/checkbox-field.component';
import { TextFieldComponent } from '../components/field-types/text-field/text-field.component';
import { FieldTypeDefinition } from '../models/field';

const TEXT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: TextFieldComponent,
};

// const NUMBER_FIELD_DEFINITION: FieldTypeDefinition = {
//   type: 'number',
//   label: 'Number Field',
//   icon: '123',
//   defaultConfig: {
//     label: 'Number Field',
//     required: false,
//   },
// };

// const DATE_FIELD_DEFINITION: FieldTypeDefinition = {
//   type: 'date',
//   label: 'Date Field',
//   icon: 'calendar_today',
//   defaultConfig: {
//     label: 'Text Field',
//     required: false,
//   },
// };

// const SELECT_FIELD_DEFINITION: FieldTypeDefinition = {
//   type: 'select',
//   label: 'Select Field',
//   icon: 'arrow_drop_down_circle',
//   defaultConfig: {
//     label: 'Select Field',
//     required: false,
//   },
// };

const CHECKBOX_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  component: CheckboxFieldComponent,
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    // ['number', NUMBER_FIELD_DEFINITION],
    // ['date', DATE_FIELD_DEFINITION],
    // ['select', SELECT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }
}
