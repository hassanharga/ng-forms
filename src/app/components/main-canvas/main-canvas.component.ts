import { Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

@Component({
  selector: 'app-main-canvas',
  imports: [FormEditorComponent, FormPreviewComponent, MatButtonToggleModule],
  templateUrl: './main-canvas.component.html',
  styles: ``,
})
export class MainCanvasComponent {
  activeTab = signal<'editor' | 'preview'>('editor');
}
