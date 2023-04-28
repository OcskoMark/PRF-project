import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  id: string | null;
  gameId: string;
  title: string;
  genre: string;
  sum: string;
  price: number;
  releaseDate: Date;
  responseMessage: string;

  constructor (private gameService: GameService, private userService: UserService) {
    this.id = '';
    this.title = '';
    this.genre = '';
    this.sum = '';
    this.price = 0;
    this.releaseDate = new Date();
    this.gameId = '';
    this.responseMessage = '';
  }

  getGame() {
    this.id = localStorage.getItem('gameId');
    localStorage.removeItem('gameId');
    if (this.id) {
      this.gameId = this.id;
      this.gameService.getGameData(this.gameId).subscribe(game => {
        console.log(game);
        this.title = JSON.parse(JSON.stringify(game)).title;
        this.genre = JSON.parse(JSON.stringify(game)).genre;
        this.sum = JSON.parse(JSON.stringify(game)).sum;
        this.price = JSON.parse(JSON.stringify(game)).price;
        this.releaseDate = JSON.parse(JSON.stringify(game)).releaseDate;
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    } else {
      this.responseMessage = 'Nem azonosítható játék!';
    }
  }

  update() {
    if (this.getRole() != 'admin') {
      this.responseMessage = 'Nincs jogosultsága a funkció használatához!';
    } else {
      this.gameService.patchGame(this.gameId, this.title, this.genre, this.price, this.sum, this.releaseDate).subscribe(patchGame => {
        console.log(patchGame);
        this.responseMessage = 'A játék adatai sikeresen frissítésre kerültek az adatbázisban!';
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    }
  }

  getRole() {
    return this.userService.getRole();
  }

  ngOnInit(): void {
      this.getGame();
  }

}
