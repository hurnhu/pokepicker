import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private pokeURL = "https://pokeapi.co/api/v2/pokemon/35"

  constructor(private http: HttpClient) { }

  getSinglePokemon(){
    return this.http.get(this.pokeURL);
  }

}
