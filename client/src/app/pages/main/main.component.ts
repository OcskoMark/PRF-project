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
  index: number;
  //role: string;
  newGameTitle: string;
  newGameGenre: string;
  newGamePrice: number;
  newGameSum: string;
  newGameReleaseDate: Date | null;
  responseMessage: string;
  gameId: string;
  
  constructor(private userService: UserService, private gameService: GameService, private router: Router) {
    this.games = [];
    this.index = 0;
    //this.role = '';
    this.newGameTitle = '';
    this.newGameGenre = '';
    this.newGamePrice = 0;
    this.newGameSum = '';
    this.newGameReleaseDate = null;
    this.responseMessage = '';
    this.gameId = '';
  }
  
  

  getGames() {
    this.gameService.getGames().subscribe(games => {
      console.log(games);
      this.games = JSON.parse(JSON.stringify(games));
    }, error => {
      console.log(error);
    });
  }

  save() {
    if (this.getRole() != 'admin') {
      this.responseMessage = 'Nincs jogosultsága a funkció használatához!';
    } else if (this.newGameTitle != '' && this.newGameGenre != '' && this.newGamePrice != 0 && this.newGameSum != '' && this.newGameReleaseDate != null) {
      this.gameService.create(this.newGameTitle, this.newGameGenre, this.newGamePrice, this.newGameSum, this.newGameReleaseDate).subscribe(newGame => {
        console.log(newGame);
        this.responseMessage = 'Az új játék sikeresen hozzáadva az adatbázishoz!';
        window.location.reload();
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    } else {
      this.responseMessage = 'Minden mező megadása kötelező!';
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

  ngOnInit(): void {
      this.getGames();
  }

}
