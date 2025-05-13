import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FieldTypesService } from '../../services/field-types.service';
import { FormService } from '../../services/form.service';
import { DynamicOptionsComponent } from './dynamic-options/dynamic-options.component';

@Component({
  selector: 'app-field-settings',
  imports: [
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatCheckbox,
    MatSelect,
    MatOption,
    DynamicOptionsComponent,
  ],
  templateUrl: './field-settings.component.html',
  styles: ``,
})
export class FieldSettingsComponent {
  formservice = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  fieldSettings = computed(() => {
    const field = this.formservice.selectedField();
    if (!field) return [];

    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    if (!fieldDef) return [];
    return fieldDef.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const field = this.formservice.selectedField();
    if (!field) return {};

    return field as any;
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formservice.updateField(fieldId, { [key]: value });
  }
}
