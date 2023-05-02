import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { LoginService } from 'src/app/services/login.service';
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
  storedGameMessage: string | null;
  //gameId: string;
  detailsButtonTitle: string;
  
  constructor(private userService: UserService, private gameService: GameService, private router: Router) {
    this.games = [];
    this.newGameTitle = '';
    this.newGameGenre = '';
    this.newGamePrice = 0;
    this.newGameSum = '';
    this.newGameReleaseDate = null;
    this.responseMessage = '';
    this.storedGameMessage = '';
    //this.gameId = '';
    this.detailsButtonTitle = '';
    this.setDetailsButtonTitle();
  }
  
  setDetailsButtonTitle() {
    if (this.userService.getRole() == 'admin') {
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

  reload() {
    window.location.reload();
  }

  saveGame() {
    if (this.getRole() != 'admin') {
      this.responseMessage = 'Nincs jogosultsága a funkció használatához!';
    } else if (this.newGameTitle != '' && this.newGameGenre != '' && this.newGamePrice >= 0 && this.newGameSum != '' && this.newGameReleaseDate != null) {
      this.gameService.create(this.newGameTitle, this.newGameGenre, this.newGamePrice, this.newGameSum, this.newGameReleaseDate).subscribe(newGame => {
        console.log(newGame);
        localStorage.setItem('gameMessage', this.newGameTitle + ' című játék sikeresen hozzáadva az adatbázishoz!');
        //this.responseMessage = 'Az új játék sikeresen hozzáadva az adatbázishoz!';
        this.reload();
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
    return JSON.parse(JSON.stringify(game)).price;
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
      localStorage.setItem('gameMessage', JSON.parse(JSON.stringify(game)).title + ' című játék sikeresen törölve az adatbázisból!');
      //this.responseMessage = 'A játék sikeresen törölve az adatbázisból!';
      this.reload();
    }, error => {
      console.log(error);
      this.responseMessage = error.error.message;
    });
  }

  ngOnInit(): void {
    this.setDetailsButtonTitle();
    this.getGames();
    this.storedGameMessage = localStorage.getItem('gameMessage');
    if (this.storedGameMessage) {
      localStorage.removeItem('gameMessage');
      this.responseMessage = this.storedGameMessage;
    } else {
      this.responseMessage = "";
    }
  }

}
