import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../services/form.service';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

@Component({
  selector: 'app-main-canvas',
  imports: [
    FormEditorComponent,
    FormPreviewComponent,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './main-canvas.component.html',
  styles: ``,
})
export class MainCanvasComponent {
  formService = inject(FormService);

  activeTab = signal<'editor' | 'preview'>('editor');

  addRow() {
    this.formService.addRow();
  }
}
