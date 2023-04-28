import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  constructor(private userService: UserService, private gameService: GameService) {
  }
  
  

  getGames() {
    this.gameService.getGames().subscribe(msg => {
      console.log("Játékok betöltve.");
      console.log(msg);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
      this.getGames();
  }

}
