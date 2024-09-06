import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor(private _commonLib: CommonsLibService) {
    this.charactersSubscription = this._commonLib.charactersGateway
      .getAllCharacters()
      .subscribe((value) => {
        this.characters = value;
      });
  }

  public onAddCharacterToCart(character: Character) {
    this._commonLib.sendData(character.id);
  }

  ngOnDestroy(): void {
    if (this.charactersSubscription) {
      this.charactersSubscription.unsubscribe();
    }
  }
}
