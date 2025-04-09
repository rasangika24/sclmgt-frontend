import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation, OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CacheService } from 'src/app/services/CacheService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  loginName: string | null = '';

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    private router: Router,
    private cacheService: CacheService
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }

  public getUserDetails(): void {
    this.httpService.getUserName().subscribe((name: string) => {
      this.loginName = name;

      if (!this.loginName) {
        this.loginName = this.httpService.getLoginNameFromCache();
      }
    });
  }

  public logOutUser(): void {
    this.httpService.removeToken();
    this.cacheService.clear(this.httpService.getUserId()!);
    this.router.navigate(['/authentication/login']);
  }
}
