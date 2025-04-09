import { Component, HostListener } from '@angular/core';
import { SideMenuHeaderComponent } from "../side-menu-header/side-menu-header.component";
import { SideMenuOptionsComponent } from "../side-menu-options/side-menu-options.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gifs-side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  imports: [
    CommonModule,          // 👈 Necesario para usar *ngIf, *ngFor, etc.
    /* otros componentes que estés usando, como: */
    SideMenuHeaderComponent,
    SideMenuOptionsComponent,
  ]
})
export class SideMenuComponent {
  isMenuOpen = false;
  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 768; // Detecta pantallas pequeñas
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
