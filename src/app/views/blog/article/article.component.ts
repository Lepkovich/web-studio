import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {ArticlesCardType} from "../../../../types/articles-card.type";
import {ArticleType} from "../../../../types/article.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommentsParamsType} from "../../../../types/comments-params.type";
import {CommentsType} from "../../../../types/comments.type";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SendCommentType} from "../../../../types/send-comment.type";
import {CommentService} from "../../../shared/services/comment.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article!: ArticleType;
  relatedArticles: ArticlesCardType[] = [];

  commentForm = this.fb.group({
    comment: ['', [Validators.required]],
  })

  articles: ArticlesCardType[] = [];
  idArray: string[] = [];
  commentParams: CommentsParamsType = {offset: 3, article: 'asdf'};
  comment: CommentsType | null = null;

  constructor(private articleService: ArticleService,
              private commentService: CommentService,
              private sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;
          this.commentParams.article = this.article.id;
          // this.commentParams.offset = 3;
          this.commentService.getComments(this.commentParams)
            .subscribe((data: CommentsType) => {
              this.comment = data;
              console.log('this.comment', this.comment)
            });

        });
      this.articleService.getRelatedArticles(params['url'])
        .subscribe((data: ArticlesCardType[]) => {
          this.relatedArticles = data;
        })

    })

    // this.articleService.getArticles()
    //   .subscribe(data => {
    //     this.articles = data.items;
    //   })

  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  sendComment() {

    if (this.commentForm.invalid) {
      this._snackBar.open('Ошибка формы на старте');
    }
    ;

    if (this.commentForm.valid && this.commentForm.value.comment && this.article.id) {
      const paramsObject: SendCommentType = {
        "text": this.commentForm.value.comment,
        "article": this.article.id
      }

      console.log('this.article', this.article)
      console.log('this.article.id', this.article.id)

      this.commentService.sendComment(paramsObject)
        .subscribe({
          next: (data: SendCommentType | DefaultResponseType) => {
            if (!(data as DefaultResponseType).error) {
              this._snackBar.open((data as DefaultResponseType).message)
            } else if ((data as DefaultResponseType).error) {
              this._snackBar.open((data as DefaultResponseType).message);
              throw new Error((data as DefaultResponseType).message);
            }
          },

          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message)
            } else {
              this._snackBar.open('Ошибка добавления комментария')
            }
          }
        })

    }


    if (this.commentForm.value && this.article.id) {

    }

  }
}
