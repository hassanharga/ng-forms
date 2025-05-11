import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldPreviewComponent } from '../field-preview/field-preview.component';

@Component({
  selector: 'app-form-preview',
  imports: [FieldPreviewComponent],
  templateUrl: './form-preview.component.html',
  styles: ``,
})
export class FormPreviewComponent {
  formService = inject(FormService);
}
