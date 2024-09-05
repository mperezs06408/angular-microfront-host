import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersServiceService } from '../services/characters-service.service';
import { CommonModule } from '@angular/common';
import { Character } from '../../utils/interfaces/services/charactersService.interface';
import { Subscription } from 'rxjs';
import { CommonsLibService } from '@commons-lib';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'mf-shopping';
  characters: Character[] = [];
  private charactersSubscription: Subscription;

  constructor(
    private _characters: CharactersServiceService,
    private _updateCart: CommonsLibService
  ) {
    this.charactersSubscription = this._characters
      .getCharacters()
      .subscribe((value) => {
        this.characters = value;
      });
  }

  public onAddCharacterToCart(character: Character) {
    this._updateCart.sendData(character.id);
  }

  ngOnDestroy(): void {
    if (this.charactersSubscription) {
      this.charactersSubscription.unsubscribe();
    }
  }
}
