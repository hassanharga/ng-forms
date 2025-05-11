import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/field';
import { FieldTypesService } from '../../../services/field-types.service';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  templateUrl: './field-preview.component.html',
  styles: ``,
})
export class FieldPreviewComponent {
  fieldTypesService = inject(FieldTypesService);

  field = input.required<FormField>();

  previewComponent = computed(() => {
    const type = this.fieldTypesService.getFieldType(this.field().type);

    return type?.component ?? null;
  });
}
