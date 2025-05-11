import { TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '../../../models/field';
import { FormService } from '../../../services/form.service';
import { FieldPreviewComponent } from '../field-preview/field-preview.component';

@Component({
  selector: 'app-form-field',
  imports: [
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    FieldPreviewComponent,
  ],
  templateUrl: './form-field.component.html',
  styles: ``,
})
export class FormFieldComponent {
  formService = inject(FormService);

  field = input.required<FormField>();

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.removeField(this.field().id);
  }
}
