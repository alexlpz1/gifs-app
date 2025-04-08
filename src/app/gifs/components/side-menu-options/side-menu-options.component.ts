import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption{
  label: string;
  sublabel: string;
  route:string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
[x: string]: any; 
 
  menuOptions:MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
    label: 'Trending',
    sublabel: 'Gifs Populares',
    route: '/dashboard/trending'
    },
    {
    icon: 'fa-solid fa-magnifying-glass',
    label: 'Buscador',
    sublabel: 'Buscar Gifs',
    route: '/dashboard/search'
    }
  ]
  trackByRoute(index: number, item: any) {
    return item.route;
  }

}
