import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types.service';
import { FieldButtonComponent } from './field-button/field-button.component';
@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButtonComponent, DragDropModule],
  templateUrl: './form-elements-menu.component.html',
  styles: ``,
})
export class FormElementsMenuComponent {
  fieldTypesService = inject(FieldTypesService);

  fieldTypes = this.fieldTypesService.getAllFieldTypes();
}
