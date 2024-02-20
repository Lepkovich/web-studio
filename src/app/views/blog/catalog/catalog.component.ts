import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesCardType} from "../../../../types/articles-card.type";
import {CategoriesType} from "../../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";
import {FilteredCategoriesType} from "../../../../types/filtered-categories.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit{

  articles: ArticlesCardType[] = [];
  open = false;
  categories: CategoriesType[] = [];
  pages: number = 1;
  filteredCategories: FilteredCategoriesType[] = [];


  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.articleService.getArticles()
      .subscribe(data => {
        this.articles = data.items;
        this.pages = data.pages;
      })

    this.articleService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })

    this.activatedRoute.queryParams.subscribe(params => {
      // здесь нужно разобраться что присваивать в this.categories


      // console.log(params);

      const categoriesFromQuery = params['categories']; //взяли из queryParams только categories
      // console.log('categoriesFromQuery', categoriesFromQuery)
      // console.log('this.categories', this.categories);

      this.filteredCategories = this.categories.filter(category => categoriesFromQuery.includes(category.url)); //отфильтровали categories
      // console.log('filteredCategories', this.filteredCategories);

      // this.appliedFilters = params[];

    });
  }

  removeAppliedFilter(appliedFilter: FilteredCategoriesType) {
    console.log('appliedFilter', appliedFilter)
  }


}
