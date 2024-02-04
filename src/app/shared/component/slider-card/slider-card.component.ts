import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'slider-card',
  templateUrl: './slider-card.component.html',
  styleUrls: ['./slider-card.component.scss']
})
export class SliderCardComponent implements OnInit{

  banner = [
    {
      preTitle: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса ',
      titleBold: '-15%!',
      text: ''
    },
    {
      preTitle: 'Акция',
      title: 'Нужен грамотный ',
      titleBold: 'копирайтер?',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.'
    },
    {
      preTitle: 'Новость дня',
      title: ' в ТОП-10 SMM-агенств Москвы!',
      titleBold: '6 место',
      text: 'Мы благодарим каждого, кто голосовал за нас!'
    },
  ]

  constructor() {
  }

  ngOnInit() {
  }

}
