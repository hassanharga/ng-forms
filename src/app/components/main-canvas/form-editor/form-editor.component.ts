import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FieldTypeDefinition, FormField } from '../../../models/field';
import { FormService } from '../../../services/form.service';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent],
  templateUrl: './form-editor.component.html',
  styles: ``,
})
export class FormEditorComponent {
  formService = inject(FormService);

  onDropInRow(e: CdkDragDrop<string>, rowId: string) {
    console.log('e ====>', e);

    if (e.previousContainer.data === 'field-selector') {
      const fieldType = e.item.data as FieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        label: fieldType.label,
        ...fieldType.defaultConfig,
      };
      this.formService.addField(newField, rowId, e.currentIndex);
      return;
    }
  }
}
