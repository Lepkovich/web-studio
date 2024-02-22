import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesCardType} from "../../../../types/articles-card.type";
import {CategoriesType} from "../../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";
import {FilteredCategoriesType} from "../../../../types/filtered-categories.type";
import {ActiveParamsType} from "../../../../types/active-params.type";

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
  activeParams: ActiveParamsType = {categories: []};



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
        if (this.categories && this.categories.length > 0) {
          this.activatedRoute.queryParams.subscribe(params => {
            this.activeParams.categories = params['categories']; //взяли из queryParams только categories
            console.log('this.activeParams', this.activeParams)
            if (this.activeParams.categories && this.activeParams.categories.length > 0) {
              this.filteredCategories = this.categories.filter(category => this.activeParams.categories.includes(category.url)); //отфильтровали categories
            } else {
              this.filteredCategories = [];
            }
          });
        }
      })


  }

  removeAppliedFilter(appliedFilter: FilteredCategoriesType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.url);

    const queryParams = {
      pages: this.activeParams.pages,
      categories: this.activeParams.categories
    };

    this.router.navigate(['/catalog'], {queryParams: queryParams});

    console.log('appliedFilter', appliedFilter);
    console.log('this.activeParams.categories', this.activeParams.categories)
  }


}
