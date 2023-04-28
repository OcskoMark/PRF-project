import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-toolbars',
  templateUrl: './my-toolbars.component.html',
  styleUrls: ['./my-toolbars.component.css']
})
export class MyToolbarsComponent implements OnInit{

  role: string;

  constructor (private userService: UserService) {
    this.role = '';
  }

  ngOnInit(): void {
    /*
    if (localStorage.getItem('accessLevel') == '1') {
      this.role = 'user';
    } else if (localStorage.getItem('accessLevel') == '3') {
      this.role = 'admin';
    }
    */
    this.role = this.userService.getRole();
    
  }

}
