import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {ArticlesCardType} from "../../../../types/articles-card.type";
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{

  article!: ArticleType;
  relatedArticles: ArticlesCardType[] = [];

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;
        });
      this.articleService.getRelatedArticles(params['url'])
        .subscribe((data: ArticlesCardType[]) => {

        })
    })

    this.articleService.getTopArticles()

  }
}
