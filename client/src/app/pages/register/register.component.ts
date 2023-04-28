import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string;
  password: string;
  email: string;
  responseMessage: string;

  constructor (private router: Router, private userService: UserService) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.responseMessage = '';
  }

  register() {
    if (this.username != '' && this.password != '' && this.email != '') {
      this.userService.register(this.username, this.password, this.email).subscribe(msg => {
        console.log(msg);
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
        this.responseMessage = error.error.message;
      });
    } else {
      this.responseMessage = 'Az összes mező kitöltése kötelező!';
    }
  }
  
  toLogin() {
    this.router.navigate(['/login']);
  }

}
