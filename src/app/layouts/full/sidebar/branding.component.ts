import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/dashboard">
        <img
         style="height: 150px; width: 120px; margin-left: 100px;"
          src="./assets/images/logos/dark-logo.jpg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
