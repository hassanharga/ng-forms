import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';
import { FormElementsMenuComponent } from './components/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  imports: [
    FormElementsMenuComponent,
    MainCanvasComponent,
    FieldSettingsComponent,
    DragDropModule,
    MatButton,
    MatIcon,
  ],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  formService = inject(FormService);
}
