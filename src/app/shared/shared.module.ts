import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from './component/blog-card/blog-card.component';
import {RouterModule} from "@angular/router";
import { SliderCardComponent } from './component/slider-card/slider-card.component';



@NgModule({
  declarations: [
    BlogCardComponent,
    SliderCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BlogCardComponent,
    SliderCardComponent
  ]
})
export class SharedModule { }
