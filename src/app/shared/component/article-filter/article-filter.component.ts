import {Component, Input, OnInit} from '@angular/core';
import {CategoriesType} from "../../../../types/categories.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.scss']
})

export class ArticleFilterComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  @Input() categories: CategoriesType[] = [];
  @Input() open: boolean = false;

  activeParams: ActiveParamsType = {page: 1, categories: []};


  ngOnInit() {


    this.activatedRoute.queryParams.subscribe(params => {

        this.activeParams.categories = params['categories'] || []; // Установка значения по умолчанию

      if (this.categories && this.categories.length > 0) {
        this.categories.forEach(category => {
          category.active = this.activeParams.categories.includes(category.url);
        });
      }

      // возможно понадобится такой подход для подготовки запроса на бэкенд
      // const activeParams : ActiveParamsType = {categories: []};
      // if (params.hasOwnProperty('categories')) {
      //   this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
      // }
      // if (params.hasOwnProperty('pages')) {
      //   this.activeParams.pages = +params['pages']; //+ чтобы сразу конвертировать в цифру
      // }
      //
      // this.activeParams = activeParams;
    })
  }

  toggle() {
    this.open = !this.open;

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      this.categories.forEach(category => {
        category.active = this.activeParams.categories.includes(category.url);
      });
    }

  }

  updateFilter(category: string) {

    console.log('this.categories до', this.categories);

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryParams = this.activeParams.categories.find(item => item === category)
      if (existingCategoryParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== category)
      } else if (!existingCategoryParams) {
        // this.activeParams.categories.push(category); //так не работало из-за бага Angular
        this.activeParams.categories = [...this.activeParams.categories, category]; //решается через создание копии и добавления нового значения
      }
    } else {
      this.activeParams.categories = [category]
    }

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      this.categories.forEach(item => {
        item.active = this.activeParams.categories.includes(item.url);
      });
    } else {
      this.categories.forEach(item => {
        item.active = false;
      });
    }

    console.log('this.categories после', this.categories)

    // const queryParams = {
    //   pages: this.activeParams.page,
    //   categories: this.activeParams.categories
    // };

    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {queryParams: this.activeParams});

  }

}
