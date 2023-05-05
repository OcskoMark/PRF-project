import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: JSON[];
  responseMessage: string;
  
  constructor(private userService: UserService, private router: Router) {
    this.users = [];
    this.responseMessage = '';
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = JSON.parse(JSON.stringify(users));
    }, error => {
      console.log(error);
      this.responseMessage = error.error.message;
    });
  }

  setAdmin(user: JSON) {
    if (JSON.parse(JSON.stringify(user)).accessLevel == 3) {
      if (localStorage.getItem('id') == JSON.parse(JSON.stringify(user))._id) {
        this.responseMessage = "Saját felhasználói fióktól nem vonható meg az admin jogosultság, kérje egy másik admin segítségét!";
      } else {
        this.userService.setAdmin(JSON.parse(JSON.stringify(user))._id, 1).subscribe(msg => {
          console.log(msg);
          this.ngOnInit();
          this.responseMessage = JSON.parse(JSON.stringify(user)).username + " felhasználó most már nem rendelkezik admin jogosultságokkal!";
        }, error => {
          console.log(error);
          this.responseMessage = error.error.message;
        });
      }
    } else {
      this.userService.setAdmin(JSON.parse(JSON.stringify(user))._id, 3).subscribe(msg => {
        console.log(msg);
        this.ngOnInit();
        this.responseMessage = JSON.parse(JSON.stringify(user)).username + " felhasználó most már admin jogosultságokkal rendelkezik!";
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    }
  }

  deleteUser(user: JSON) {
    if (localStorage.getItem('id') == JSON.parse(JSON.stringify(user))._id) {
      this.responseMessage = "Saját felhasználói fiók nem törölhető, kérje egy másik admin segítségét!";
    } else {
      this.userService.deleteUser(JSON.parse(JSON.stringify(user))._id).subscribe(msg => {
        console.log(msg);
        this.ngOnInit();
        this.responseMessage = JSON.parse(JSON.stringify(user)).username + " felhasználó sikeresen töröve az adatbázisból!";
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    }
  }

  getRole(user: JSON) {
    if (JSON.parse(JSON.stringify(user)).accessLevel == 3) {
      return "admin";
    } else {
      return "user";
    }
  }

  getUsername(user: JSON) {
    return JSON.parse(JSON.stringify(user)).username;
  }

  getEmail(user: JSON) {
    return JSON.parse(JSON.stringify(user)).email;
  }

  setSetAdminButtonTitle(user: JSON) {
    if (this.getRole(user) == "admin") {
      return "Admin jog megvonása";
    } else {
      return "Admin jog adása";
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
