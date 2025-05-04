import { Component, input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatFormFieldModule, MatCheckboxModule],
  templateUrl: './checkbox-field.component.html',
  styles: ``,
})
export class CheckboxFieldComponent {
  field = input.required<FormField>();
}
