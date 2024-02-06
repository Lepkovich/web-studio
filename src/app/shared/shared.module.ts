import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './component/blog-card/blog-card.component';
import {RouterModule} from "@angular/router";
import { SliderCardComponent } from './component/slider-card/slider-card.component';
import { PopupFormComponent } from './component/popup-form/popup-form.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    BlogCardComponent,
    SliderCardComponent,
    PopupFormComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule
    ],
  exports: [
    BlogCardComponent,
    SliderCardComponent
  ]
})
export class SharedModule { }
