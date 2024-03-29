import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string;
  password: string;
  responseMessage: string;
  storedRegisterMessage: string | null;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
    this.responseMessage = '';
    this.storedRegisterMessage = '';
  }

  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe(user => {
        console.log(user);
        localStorage.setItem('id', JSON.parse(JSON.stringify(user))._id);
        localStorage.setItem('accessLevel', JSON.parse(JSON.stringify(user)).accessLevel);
        this.router.navigate(['/main']);
      }, error => {
        console.log(error);
        this.responseMessage = error.error;
      });
    } else {
      this.responseMessage = 'A felhasználónév és a jelszó megadása is kötelező a bejelentkezéshez!';
    }
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      localStorage.removeItem('id');
      localStorage.removeItem('accessLevel');
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
      });
    }
    this.storedRegisterMessage = localStorage.getItem('registerMessage');
    if (this.storedRegisterMessage) {
      localStorage.removeItem('registerMessage');
      this.responseMessage = this.storedRegisterMessage;
    } else {
      this.responseMessage = "";
    }
  }

}
