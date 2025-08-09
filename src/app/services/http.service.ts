import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public userNameBehaviorSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  getAuthToken(): string | null {
    return JSON.parse(window.localStorage.getItem('auth_token') as string);
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem('auth_token', JSON.stringify(token));
    } else {
      window.localStorage.removeItem('auth_token');
    }
  }

  setUserId(id: number) {
    window.localStorage.setItem('user_id', id.toString());
  }

  getUserId() {
    return window.localStorage.getItem('user_id');
  }

  setLoginNameToCache(name: string) {
    window.localStorage.setItem('user_name', name);
    this.setUserName(name);
  }

  public setUserName(name: string): void {
    this.userNameBehaviorSubject.next(name);
  }

  getLoginNameFromCache(): string | null {
    return window.localStorage.getItem('user_name');
  }

  public getUserName(): Observable<string> {
    return this.userNameBehaviorSubject.asObservable();
  }

  removeToken() {
    window.localStorage.clear();
  }

  async request(method: string, url: string, data: any): Promise<any> {
    const requestUrl = environment.baseUrl + url;
    console.log('=== HTTP REQUEST DEBUG ===');
    console.log('Method:', method);
    console.log('URL:', requestUrl);
    console.log('Request data:', JSON.stringify(data, null, 2));

    // For login requests, don't manually add auth headers - let interceptor handle it
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('Headers:', headers.keys().map(key => `${key}: ${headers.get(key)}`));

    try {
      let response;
      if (method.toUpperCase() === 'POST') {
        response = await firstValueFrom(
          this.http.post(requestUrl, data, { headers: headers })
        );
      } else if (method.toUpperCase() === 'GET') {
        response = await firstValueFrom(
          this.http.get(requestUrl, { headers: headers })
        );
      } else if (method.toUpperCase() === 'PUT') {
        response = await firstValueFrom(
          this.http.put(requestUrl, data, { headers: headers })
        );
      } else {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }
      
      console.log('=== HTTP RESPONSE DEBUG ===');
      console.log('Response received:', JSON.stringify(response, null, 2));
      return response;
    } catch (error: any) {
      console.error('=== HTTP ERROR DEBUG ===');
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      console.error('Error details:', error);
      if (error.error) {
        console.error('Error body:', error.error);
      }
      throw error;
    }
  }

  get isLoggedIn() {
    if (window.localStorage.getItem('auth_token')) {
      return true;
    }
    return false;
  }

  public async logOut(): Promise<void> {
    try {
      await this.request('GET', '/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      window.localStorage.clear();
    }
  }

  public async getAuthIds(userId: number): Promise<any> {
    const requestUrl = environment.baseUrl + '/get-auth-ids/' + userId;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    try {
      return await firstValueFrom(
        this.http.get(requestUrl, { headers: headers })
      );
    } catch (error) {
      console.error('getAuthIds error:', error);
      throw error;
    }
  }

  async getSystemPrivileges(): Promise<any> {
    const requestUrl = environment.baseUrl + '/system-privileges';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    try {
      return await firstValueFrom(
        this.http.get(requestUrl, { headers: headers })
      );
    } catch (error) {
      console.error('getSystemPrivileges error:', error);
      throw error;
    }
  }

  async saveSystemPrivileges(data: any): Promise<any> {
    const requestUrl = environment.baseUrl + '/system-privileges';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    try {
      return await firstValueFrom(
        this.http.put(requestUrl, data, { headers: headers })
      );
    } catch (error) {
      console.error('saveSystemPrivileges error:', error);
      throw error;
    }
  }
}
