import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FieldSettingsComponent } from './components/field-settings/field-settings.component';
import { FormElementsMenuComponent } from './components/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';

@Component({
  selector: 'app-root',
  imports: [
    FormElementsMenuComponent,
    MainCanvasComponent,
    FieldSettingsComponent,
    DragDropModule,
  ],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {}
