import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { CacheService } from 'src/app/services/CacheService';
import { elementAt, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  data!: number[];
  private cacheSubscription!: Subscription;

  constructor(
    public navService: NavService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.cacheSubscription = this.cacheService.cache$.subscribe((data) => {
      this.data = data;

      this.setAuthStatusInNavItems(this.data);
    });
  }

  public setAuthStatusInNavItems(authId: number[]) {
    if (authId && authId.length > 0) {
      if (authId.includes(1)) {
        navItems.forEach((element) => {
          element.isVisible = true;
        });
        return;
      }

      navItems.forEach((element) => {
        // if (authId.includes(element.auth!)) {
        //   element.isVisible = true;
        // } else {
        //   element.isVisible = false;
        // }

        const authArray = element.auth;

        if (authArray) {
          for (let i = 0; i < authArray?.length; i++) {
            if (authId.includes(authArray[i])) {
              element.isVisible = true;
              break;
            } else {
              element.isVisible = false;
            }
          }
        }
      });
    } else if (
      JSON.parse(window.localStorage.getItem('privileges')!)?.length! > 0
    ) {
      const privilegeArray = JSON.parse(
        window.localStorage.getItem('privileges')!
      );

      if (privilegeArray.includes(1)) {
        navItems.forEach((element) => {
          element.isVisible = true;
        });
        return;
      }

      navItems.forEach((element) => {
        // if (privilegeArray.includes(element.auth!)) {
        //   element.isVisible = true;
        // } else {
        //   element.isVisible = false;
        // }

        const authArray = element.auth;

        if (authArray) {
          for (let i = 0; i < authArray?.length; i++) {
            if (privilegeArray.includes(authArray[i])) {
              element.isVisible = true;
              break;
            } else {
              element.isVisible = false;
            }
          }
        }
      });
    } else if (authId && authId.length === 0) {
      navItems.forEach((element) => {
        element.isVisible = false;
      });
    }
  }
}
