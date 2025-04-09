import { Component, HostListener } from '@angular/core';
import { SideMenuHeaderComponent } from "../side-menu-header/side-menu-header.component";
import { SideMenuOptionsComponent } from "../side-menu-options/side-menu-options.component";

@Component({
  selector: 'gifs-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
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
