import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  games: JSON[];
  newGameTitle: string;
  newGameGenre: string;
  newGamePrice: number;
  newGameSum: string;
  newGameReleaseDate: Date | null;
  responseMessage: string;
  detailsButtonTitle: string;
  
  constructor(private userService: UserService, private gameService: GameService, private router: Router) {
    this.games = [];
    this.newGameTitle = '';
    this.newGameGenre = '';
    this.newGamePrice = 0;
    this.newGameSum = '';
    this.newGameReleaseDate = null;
    this.responseMessage = '';
    this.detailsButtonTitle = '';
    this.setDetailsButtonTitle();
  }
  
  setDetailsButtonTitle() {
    if (this.getRole() == 'admin') {
      this.detailsButtonTitle = 'Szerkesztés';
    } else {
      this.detailsButtonTitle = 'Részletek';
    }
  }

  getGames() {
    this.gameService.getGames().subscribe(games => {
      console.log(games);
      this.games = JSON.parse(JSON.stringify(games));
    }, error => {
      console.log(error);
      this.responseMessage = error.error.message;
    });
  }

  saveGame() {
    if (this.getRole() != 'admin') {
      this.responseMessage = 'Nincs jogosultsága a funkció használatához!';
    } else if (this.newGameTitle != '' && this.newGameGenre != '' && this.newGamePrice >= 0 && this.newGameSum != '' && this.newGameReleaseDate != null) {
      this.gameService.create(this.newGameTitle, this.newGameGenre, this.newGamePrice, this.newGameSum, this.newGameReleaseDate).subscribe(newGame => {
        console.log(newGame);
        this.ngOnInit();
        this.responseMessage = this.newGameTitle + ' című játék sikeresen hozzáadva az adatbázishoz!';
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    } else {
      if (this.newGamePrice < 0) {
        this.responseMessage = "A játék ára nem lehet negatív!";
      } else {
        this.responseMessage = 'Minden mező megadása kötelező!';
      }
    }
  }

  getTitle(game: JSON) {
    return JSON.parse(JSON.stringify(game)).title;
  }

  getGenre(game: JSON) {
    return JSON.parse(JSON.stringify(game)).genre;
  }

  getPrice(game: JSON) {
    return JSON.parse(JSON.stringify(game)).priceString;
  }

  getDetails(game: JSON) {
    localStorage.setItem('gameId', JSON.parse(JSON.stringify(game))._id);
    this.router.navigate(['/game']);
  }

  getRole() {
    return this.userService.getRole();
  }

  deleteGame(game: JSON) {
    this.gameService.deleteGame(JSON.parse(JSON.stringify(game))._id).subscribe(msg => {
      console.log(msg);
      this.ngOnInit();
      this.responseMessage = JSON.parse(JSON.stringify(game)).title + ' című játék sikeresen törölve az adatbázisból!';
    }, error => {
      console.log(error);
      this.responseMessage = error.error.message;
    });
  }

  ngOnInit(): void {
    this.setDetailsButtonTitle();
    this.getGames();
  }

}
