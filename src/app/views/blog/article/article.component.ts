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
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsToShowType} from "../../../../types/comments-to-show.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article!: ArticleType;
  relatedArticles: ArticlesCardType[] = [];
  isLogged: boolean = false;


  commentForm = this.fb.group({
    comment: ['', [Validators.required]],
  })

  articles: ArticlesCardType[] = [];
  commentParams: CommentsParamsType = {offset: 0, article: ''};
  comments: CommentsType | null = null;

  commentsToShow: CommentsType['comments'] | null = null;

  // commentsToShow: CommentsType['comments'] = [ {
  //   id: "",
  //   text: "",
  //   date: "",
  //   likesCount: 0,
  //   dislikesCount: 0,
  //   user: {
  //     id: "",
  //     name: ""
  //   }
  // } ];


  constructor(private articleService: ArticleService,
              private commentService: CommentService,
              private sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn();

    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe((data: ArticleType) => {
          this.article = data;
          this.getComments();
        });
      this.articleService.getRelatedArticles(params['url'])
        .subscribe((data: ArticlesCardType[]) => {
          this.relatedArticles = data;
        })

    })

  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getComments() {
    if (this.article.commentsCount && this.article.commentsCount > 0) {

      this.commentParams.article = this.article.id;
      this.commentParams.offset = 1;

      this.commentService.getComments(this.commentParams)
        .subscribe((data: CommentsType) => {
          this.comments = data;
          this.processComments();
        });
    }
  }

  processComments() {

    if (this.comments && this.comments.comments.length > 0) {
      const comments = this.comments.comments;
      if (this.commentsToShow && this.commentsToShow.length === 1 && this.commentsToShow[0].id === "") {
        this.commentsToShow[0] = comments[0];
      }

    }
    console.log('this.article', this.article);
    console.log('this.comment', this.comments);
    console.log('this.article.id', this.article.id);
    console.log('this.commentsToShow', this.commentsToShow);
  }

  sendComment() {

    if (this.commentForm.invalid) {
      this._snackBar.open('Ошибка формы на старте');
    }


    if (this.commentForm.valid && this.commentForm.value.comment && this.article.id) {
      const paramsObject: SendCommentType = {
        "text": this.commentForm.value.comment,
        "article": this.article.id
      }

      this.commentService.sendComment(paramsObject)
        .subscribe({
          next: (data: SendCommentType | DefaultResponseType) => {
            if (!(data as DefaultResponseType).error) {
              this._snackBar.open((data as DefaultResponseType).message)
            } else if ((data as DefaultResponseType).error) {
              this._snackBar.open((data as DefaultResponseType).message);
              throw new Error((data as DefaultResponseType).message);
            }
            this.commentForm.reset();
            this.getComments();
          },

          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message)
            } else {
              this._snackBar.open('Ошибка добавления комментария')
            }
          }
        })

      // Код eva
      // this.commentService.addCommentTo(this.article.id, this.commentForm.value.comment)
      //   .subscribe((data: DefaultResponseType) => {
      //   if (!data.error) {
      //     // this.productService.getProduct(this.product.url)
      //     //   .subscribe((data: ArticleType | DefaultResponseType) => {
      //     //     if ((data as DefaultResponseType).error !== undefined) {
      //     //       throw new Error((data as DefaultResponseType).message);
      //     //     }
      //     //     this.comments = (data as ArticleType).comments;
      //     //     this.text = '';
      //     //   })
      //     this.getComments();
      //   } else {
      //     console.log(data.message);
      //     this._snackBar.open('Произошла ошибка');
      //   }
      // })

    }


    if (this.commentForm.value && this.article.id) {

    }

  }
}
