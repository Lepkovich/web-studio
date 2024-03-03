import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CommentsType} from "../../../types/comments.type";
import {CommentsParamsType} from "../../../types/comments-params.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {SendCommentType} from "../../../types/send-comment.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(params: CommentsParamsType): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', {
      params: params
    });
  }

  // sendComment(params: SendCommentType): Observable<DefaultResponseType> {
  //   return this.http.post<DefaultResponseType>(environment.api + 'comments', params, {withCredentials: true})
  // }

  sendComment(data: SendCommentType): Observable<SendCommentType | DefaultResponseType> {
    return this.http.post<SendCommentType | DefaultResponseType>(environment.api + 'comments', data, {withCredentials: true})
  }

}
