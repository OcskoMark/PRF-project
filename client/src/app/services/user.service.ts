import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string) {
    return this.http.post(environment.userUrl + 'register', {username: username, password: password, email: email});
  }

  getUserData(id: string) {
    return this.http.get(environment.userUrl + id);
  }

  patchUser(id: string, username: string, password: string, email: string, accessLevel: string) {
    return this.http.patch(environment.userUrl + id, {username: username, password: password, email: email, accessLevel: accessLevel}, {responseType: "json"});
  }

  getRole() {
    if (localStorage.getItem('accessLevel') == '1') {
      return 'user';
    } else if (localStorage.getItem('accessLevel') == '3') {
      return 'admin';
    }

    return '';
  }
}
