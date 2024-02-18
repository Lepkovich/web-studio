import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesCardType} from "../../../../types/articles-card.type";
import {CategoriesType} from "../../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";
import {AppliedFilterType} from "../../../../types/applied-filter.type";

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
  appliedFilters: AppliedFilterType[] = [];


  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.articleService.getArticles()
      .subscribe(data => {
        this.articles = data.items;
        this.pages = data.pages;
        console.log(this.articles);
      })

    this.articleService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })

    this.activatedRoute.queryParams.subscribe(params => {
      // здесь нужно разобраться что присваивать в this.categories


      console.log(params);
      console.log(this.categories);

      // this.appliedFilters = params[];

    });
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {

  }


}
