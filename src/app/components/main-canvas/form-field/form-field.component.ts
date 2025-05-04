import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '../../../models/field';
import { FieldTypesService } from '../../../services/field-types.service';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-form-field',
  imports: [NgComponentOutlet, TitleCasePipe, MatButtonModule, MatIconModule],
  templateUrl: './form-field.component.html',
  styles: ``,
})
export class FormFieldComponent {
  fieldTypesService = inject(FieldTypesService);
  formService = inject(FormService);

  field = input.required<FormField>();

  previewComponent = computed(() => {
    const type = this.fieldTypesService.getFieldType(this.field().type);

    return type?.component ?? null;
  });

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.removeField(this.field().id);
  }
}
