import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { 
  }

  getGames() {
    return this.http.get(environment.gameUrl);
  }


}
