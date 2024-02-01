import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticlesCardType} from "../../../types/articles-card.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getTopArticles(): Observable<ArticlesCardType[]> {
    return this.http.get<ArticlesCardType[]>(environment.api + 'articles/top');
  }
}
