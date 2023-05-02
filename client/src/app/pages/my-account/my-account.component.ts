import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit{

  username: string;
  password: string;
  email: string;
  responseMessage: string;
  id: string | null;
  userId: string;
  accessLevel: number;

  constructor (private userService: UserService) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.responseMessage = '';
    this.id = '';
    this.userId = '';
    this.accessLevel = 0;
  }

  save() {
    if (this.email.includes('@') && this.email.includes('.')) {
      this.userService.patchUser(this.userId, this.username, this.password, this.email, this.accessLevel).subscribe(msg => {
        console.log(msg);
        this.responseMessage = 'A felhasználói adatok sikeresen frissítve!';
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
        if (this.responseMessage.includes('username')) {
          this.responseMessage = 'A felhasználónévnek egyedinek kell lennie!';
        } else if (this.responseMessage.includes('email')) {
          this.responseMessage = 'Az e-mail címnek egyedinek kell lennie!';
        }
      });
    } else {
      this.responseMessage = "Érvénytelen e-mail cím formátum!";
    }
  }

  ngOnInit(): void {
      this.id = localStorage.getItem('id');
      if (this.id) {
        this.userId = this.id;
        this.userService.getUserData(this.userId).subscribe(user => {
          console.log(user);
          this.username = JSON.parse(JSON.stringify(user)).username;
          this.email = JSON.parse(JSON.stringify(user)).email;
          this.accessLevel = JSON.parse(JSON.stringify(user)).accessLevel;
        }, error => {
          this.responseMessage = error.error;
        });
      } else {
        this.responseMessage = 'Nem azonosítható felhasználó!';
      }
  }


}
