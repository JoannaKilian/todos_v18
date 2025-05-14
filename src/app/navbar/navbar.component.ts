import { Component, inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [],
})
export class NavbarComponent {
  private _renderer = inject(Renderer2);

  switchToLightTheme(): void {
    this._renderer.setAttribute(
      document.documentElement,
      'data-bs-theme',
      'light'
    );
  }

  switchToDarkTheme(): void {
    this._renderer.setAttribute(
      document.documentElement,
      'data-bs-theme',
      'dark'
    );
  }
}
