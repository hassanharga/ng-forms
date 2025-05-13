import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { OptionItem } from '../../../models/field';

@Component({
  selector: 'app-dynamic-options',
  imports: [MatIcon, MatFormFieldModule, FormsModule, MatInput],
  templateUrl: './dynamic-options.component.html',
  styles: ``,
})
export class DynamicOptionsComponent {
  title = input('');
  options = input.required<OptionItem[]>();

  optionsChange = output<OptionItem[]>();

  addOption() {
    const currentOptions = [...this.options()];
    currentOptions.push({
      label: `Option ${currentOptions.length + 1}`,
      value: `option ${currentOptions.length + 1}`,
    });

    this.optionsChange.emit(currentOptions);
  }

  updateField(i: number, newLabel: string) {
    const currentOptions = [...this.options()];
    currentOptions[i] = {
      ...currentOptions[i],
      label: newLabel,
    };
    this.optionsChange.emit(currentOptions);
  }

  removeOption(i: number) {
    const currentOptions = [...this.options()];
    currentOptions.splice(i, 1);
    this.optionsChange.emit(currentOptions);
  }
}
