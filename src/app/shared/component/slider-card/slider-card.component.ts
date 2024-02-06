import {Component, Input, OnInit} from '@angular/core';
import {BannerType} from "../../../../types/banner.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'slider-card',
  templateUrl: './slider-card.component.html',
  styleUrls: ['./slider-card.component.scss']
})
export class SliderCardComponent implements OnInit{

  @Input() banner!: BannerType;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
