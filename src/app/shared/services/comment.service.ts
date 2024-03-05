import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentsParamsType} from "../../../types/comments-params.type";
import {Observable} from "rxjs";
import {CommentsType} from "../../../types/comments.type";
import {environment} from "../../../environments/environment";
import {SendCommentType} from "../../../types/send-comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  constructor(private http: HttpClient) { }
  //
  // getComments(params: CommentsParamsType): Observable<CommentsType> {
  //   return this.http.get<CommentsType>(environment.api + 'comments', {params: params, withCredentials: true});
  // }

  getComments(params: CommentsParamsType): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', {params: params} );
  }

  // sendComment(params: SendCommentType): Observable<DefaultResponseType> {
  //   return this.http.post<DefaultResponseType>(environment.api + 'comments', params, {withCredentials: true})
  // }

  // sendComment(data: SendCommentType): Observable<SendCommentType | DefaultResponseType> {
  //   return this.http.post<SendCommentType | DefaultResponseType>(environment.api + 'comments', data, {withCredentials: true})
  // }
  sendComment(data: SendCommentType): Observable<SendCommentType | DefaultResponseType> {
    return this.http.post<SendCommentType | DefaultResponseType>(environment.api + 'comments', data,{withCredentials: true} )
  }
}
