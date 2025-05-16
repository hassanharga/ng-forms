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
  styles: `
    @use '@angular/material' as mat;
    mat-button-toggle-group {
      @include mat.button-toggle-overrides(
        (
          shape: 5px,
          height: 36px,
          selected-state-background-color: var(--mat-sys-primary),
          selected-state-text-color: var(--mat-sys-on-primary),
        )
      );
    }
  `,
})
export class MainCanvasComponent {
  formService = inject(FormService);

  activeTab = signal<'editor' | 'preview'>('editor');

  addRow() {
    this.formService.addRow();
  }
}
