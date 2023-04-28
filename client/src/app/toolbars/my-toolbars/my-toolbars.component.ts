import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-toolbars',
  templateUrl: './my-toolbars.component.html',
  styleUrls: ['./my-toolbars.component.css']
})
export class MyToolbarsComponent {

  constructor (private userService: UserService) {
  }

  getRole() {
    return this.userService.getRole();
  }

}
