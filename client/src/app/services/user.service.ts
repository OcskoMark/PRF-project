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
}
