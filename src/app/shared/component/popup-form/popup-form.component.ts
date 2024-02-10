import {Component, Input} from '@angular/core';

interface Title {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent {

  selectedValue: string;

  titles: Title[] = [
    {value: 'site', viewValue: 'Создание сайтов'},
    {value: 'promo', viewValue: 'Продвижение'},
    {value: 'adv', viewValue: 'Реклама'},
    {value: 'text', viewValue: 'Копирайтинг'}
  ];

  constructor() {
    this.selectedValue = this.titles[0].value;
  }

}

// @Input() offers!: OfferType[];
// @Input() selectedOffer!: OfferType;

// titles = [
//   'Создание сайтов',
//   'Продвижение',
//   'Реклама',
//   'Копирайтинг'
// ]
