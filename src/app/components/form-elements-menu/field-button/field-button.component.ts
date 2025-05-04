import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FieldTypeDefinition } from '../../../models/field';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  imports: [MatIconModule, DragDropModule],
  templateUrl: './field-button.component.html',
  styles: ``,
})
export class FieldButtonComponent {
  field = input.required<FieldTypeDefinition>();
}
