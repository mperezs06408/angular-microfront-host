import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonsLibService } from '@commons-lib';
import { Subscription, forkJoin, map } from 'rxjs';
import { CharacterServiceService } from '../services/character-service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  title = 'mf-payment';
  cardData: { id: number; quantity: number }[] = [];
  charactersInfo: any = [];
  private charactersSubscription: Subscription;

  constructor(
    private _cartInfo: CommonsLibService,
    private _characterService: CharacterServiceService
  ) {
    this.cardData = this._cartInfo.charactersList;
    this.charactersSubscription = forkJoin(
      this.cardData.map((i) => this._characterService.getSingleCharacter(i.id))
    )
      .pipe(
        map((c) => {
          return c.map((i) => ({
            ...i,
            quantity: this.cardData.find((v) => v.id === i.id)?.quantity ?? 1,
          }));
        })
      )
      .subscribe((results) => {
        this.charactersInfo = results;
      });
  }

  ngOnDestroy(): void {
    if (this.charactersSubscription) {
      this.charactersSubscription.unsubscribe();
    }
  }

  cleanCharactersData() {
    this.charactersInfo = [];
    this.cardData = [];

    this._cartInfo.cleanCharactersList();
  }
}
