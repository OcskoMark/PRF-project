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
    return this.http.get(environment.gameUrl, {responseType: "json"});
  }

  create(title: string, genre: string, price: number, sum: string, releaseDate: Date) {
    return this.http.post(environment.gameUrl, {title: title, genre: genre, price: price, sum: sum, releaseDate: releaseDate});
  }

  getGameData(id: string) {
    return this.http.get(environment.gameUrl + id, {responseType: "json"});
  }

  patchGame(id: string, title: string, genre: string, price: number, sum: string, releaseDate: Date) {
    return this.http.patch(environment.gameUrl + id, {title: title, genre: genre, price: price, sum: sum, releaseDate: releaseDate}, {responseType: "json"});
  }

  deleteGame(id: string) {
    return this.http.delete(environment.gameUrl + id, {responseType: "json"});
  }


}
