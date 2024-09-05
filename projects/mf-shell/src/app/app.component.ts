import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonsLibService } from '@commons-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mf-shell';

  constructor(public commonsLibService: CommonsLibService) {
    this.getLSItems();
  }

  private getLSItems() {
    const existingItemsOnLS = localStorage.getItem(
      this.commonsLibService.localStorageItemName
    );

    if (existingItemsOnLS) {
      const itemsAsArray = JSON.parse(existingItemsOnLS);

      this.commonsLibService.initSavedCharacters(itemsAsArray);
    }
  }
}
