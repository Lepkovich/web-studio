import {Component, Input, OnInit} from '@angular/core';
import {CategoriesType} from "../../../../types/categories.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Router} from "@angular/router";
import {FilteredCategoriesType} from "../../../../types/filtered-categories.type";

@Component({
  selector: 'article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.scss']
})
export class ArticleFilterComponent implements OnInit{

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }



  @Input() categories:CategoriesType[] = [];
  open = false;
  activeParams: ActiveParamsType = {pages: 1, categories: []};



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // const categoriesFromQuery = params['categories']; //взяли из queryParams только categories
      this.activeParams.categories = params['categories'];

      // this.filteredCategories = this.categories.filter(category => categoriesFromQuery.includes(category.url)); //отфильтровали categories
      //добавили active=true выбранным категориям

      // console.log('categoriesFromQuery', categoriesFromQuery);
      // console.log('filteredCategories', this.filteredCategories);

      // this.updateFilter(categoriesFromQuery);

    })
    console.log('ngOnInit');
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

    console.log('category', category);
    console.log('this.activeParams.categories', this.activeParams.categories);

    if(this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryParams = this.activeParams.categories.find(item => item === category)
      if (existingCategoryParams) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== category)
      } else if (!existingCategoryParams) {
        this.activeParams.categories.push(category);
      }
    } else {
      this.activeParams.categories = [category]
    }

    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      this.categories.forEach(category => {
        category.active = this.activeParams.categories.includes(category.url);
      });
    } else {
      this.categories.forEach(category => {
        category.active = false;
      });
    }

    console.log('this.activeParams.categories after if', this.activeParams.categories);
    console.log('this.activeParams after if', this.activeParams);

    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    })
  }

}
