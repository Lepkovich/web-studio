import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserInfoType} from "../../../types/user-info.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';
  public userNameKey: string = 'userName';

  public isLogged$: Subject<boolean> = new Subject<boolean>(); //используем глобально (хеадер и др. страницы)
  public userName$: Subject<string> = new Subject<string>(); //используем глобально в хедере
  private isLogged: boolean = false; //используем локально в сервисе

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey); //при обращении к сервису проверяем залогинен ли пользователь
    //!! - приводит к boolean любой из типов (в т.ч. null и undefined)
  }

  login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'login', {
      email, password, rememberMe
    })
  }

  getUserInfo(): Observable<DefaultResponseType | UserInfoType> {
    return this.http.get<DefaultResponseType | UserInfoType>(environment.api + 'users')
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'signup', {
      name, email, password
    })
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken
      })
    }

    throw throwError(() => 'Can not find token')
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'refresh', {
        refreshToken: tokens.refreshToken
      })
    }
    throw throwError(() => 'Can not use token')
  }

  public isLoggedIn() {
    return this.isLogged;
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }
  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  public getTokens(): {accessToken: string | null, refreshToken: string | null} {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: string | null) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.userIdKey)
    }
  }

  set userName(name: string | null) {
    if (name) {
      localStorage.setItem(this.userNameKey, name)
    } else {
      localStorage.removeItem(this.userNameKey)
    }
  }

  get userName(): null | string {
    return localStorage.getItem(this.userNameKey);
  }

}
