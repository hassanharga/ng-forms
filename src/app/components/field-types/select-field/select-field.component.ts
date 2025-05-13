import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-select-field',
  imports: [MatFormFieldModule, MatSelect, MatOption],
  templateUrl: './select-field.component.html',
  styles: ``,
})
export class SelectFieldComponent {
  field = input.required<FormField>();
}
