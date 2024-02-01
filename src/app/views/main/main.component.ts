import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {ArticlesCardType} from "../../../types/articles-card.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  articles: ArticlesCardType[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getTopArticles()
      .subscribe((data: ArticlesCardType[]) => {
        this.articles = data;
      })
  }

}
