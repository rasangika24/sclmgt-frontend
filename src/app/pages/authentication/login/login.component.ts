import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { CacheService } from 'src/app/services/CacheService';
import { MessageServiceService } from 'src/app/services/message-service/message-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userNamePasswordError = false;

  data!: any[];
  private cacheSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private cacheService: CacheService,
    private _messageService: MessageServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      loginName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cacheSubscription = this.cacheService.cache$.subscribe((data) => {
      this.data = data;
    });
  }

  getData(userId: number): void {
    const cachedData = this.cacheService.get(userId.toString());

    // If the data is not in cache, we retrieve it from the server and store it in the cache.
    if (!cachedData) {
      this.httpService
        .getAuthIds(userId)
        .then((data: any) => {
          try {
            if (data.length > 0) {
              this.cacheService.set(userId.toString(), data);
              this.router.navigate(['/dashboard']);
            } else {
              this._messageService.showError('User does not have privileges');
            }
          } catch (error) {
            this._messageService.showError('Action Failed');
          }
        })
        .catch((error) => {
          this._messageService.showError('Action Failed');
        });
    }
  }

  get formControl() {
    return this.loginForm?.controls;
  }

  onSubmitLogin(): void {
    this.submitted = true;
    if (this.loginForm?.valid) {
      console.log('Attempting login with:', {
        login: this.loginForm.value.loginName,
        password: '***' // Don't log actual password
      });
      
      this.httpService
        .request('POST', '/login', {
          login: this.loginForm.value.loginName,
          password: this.loginForm.value.password,
        })
        .then((response) => {
          console.log('Login response received:', response);
          
          // Based on your Postman response, the structure is:
          // { "id": 1, "firstName": "admin", "lastName": "head", "login": "admin", "token": "..." }
          if (response && response.token) {
          this.httpService.setAuthToken(response.token);
          this.httpService.setUserId(response.id);
          this.httpService.setLoginNameToCache(response.login);
          this.getData(response.id);
            this.userNamePasswordError = false;
          } else {
            console.error('Invalid response structure:', response);
            this.userNamePasswordError = true;
            this._messageService.showError('Invalid login response');
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
          this.userNamePasswordError = true;
          this._messageService.showError('Username or password incorrect');
        });
    }
  }
}
