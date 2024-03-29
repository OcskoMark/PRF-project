import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  storedId: string | null;
  id: string;
  
  constructor(private http: HttpClient) { 
    this.storedId = '';
    this.id = '';
  }

  register(username: string, password: string, email: string) {
    return this.http.post(environment.userUrl + 'register', {username: username, password: password, email: email});
  }

  getUserData(id: string) {
    return this.http.get(environment.userUrl + id);
  }

  patchUser(id: string, username: string, password: string, email: string, accessLevel: number) {
    return this.http.patch(environment.userUrl + id, {username: username, password: password, email: email, accessLevel: accessLevel}, {responseType: "json"});
  }

  deleteUser(id: string) {
    return this.http.delete(environment.userUrl + id, {responseType: "json"});
  }

  setAdmin(id: string, accessLevel: number) {
    return this.patchUser(id, '', '', '', accessLevel);
  }

  getUsers() {
    return this.http.get(environment.userUrl, {responseType: "json"});
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
