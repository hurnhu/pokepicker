import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private pokeURL = "https://pokeapi.co/api/v2/pokemon/"
  private pokeSpecies = "https://pokeapi.co/api/v2/pokemon-species/"
  private pokeTypes = "https://pokeapi.co/api/v2/pokemon-species/"

  constructor(private http: HttpClient) { }

  private prunePokemon(singlePokemon: any): any{
    
    delete singlePokemon.abilities
    delete singlePokemon.game_indices
    delete singlePokemon.moves
    delete singlePokemon.pokedex_numbers
    delete singlePokemon.stats
    delete singlePokemon.genera
    delete singlePokemon.generation
    delete singlePokemon.growth_rate
    delete singlePokemon.habitat
    delete singlePokemon.base_experience
    delete singlePokemon.base_happiness
    delete singlePokemon.capture_rate
    delete singlePokemon.color
    delete singlePokemon.egg_groups
    delete singlePokemon.gender_rate
    delete singlePokemon.hatch_counter
    delete singlePokemon.held_items
    delete singlePokemon.location_area_encounters
    delete singlePokemon.names
    delete singlePokemon.pal_park_encounters
    singlePokemon.flavor_text_entries = singlePokemon.flavor_text_entries.filter((entry: any) =>{
      if(entry.language.name === "en"){
        return entry;
      }
    })
    return singlePokemon
  }

  getSinglePokemon(id: number, callback: (singlePokemon: Pokemon) => void) {
    if (localStorage.getItem("poke-cache") === null) {
      localStorage.setItem('poke-cache', JSON.stringify({}));
    }
    
    let data = JSON.parse(localStorage.getItem("poke-cache")!)
    if(data[id] === undefined){
      const pokemon = this.http.get(this.pokeURL + id);
      const flavorText = this.http.get(this.pokeSpecies + id)
      forkJoin([pokemon, flavorText]).subscribe((results)=>{    
        const combined = Object.assign({}, results[0], results[1])
        data[id] = this.prunePokemon(<Pokemon>combined);
        console.log(data[id])
        localStorage.setItem('poke-cache', JSON.stringify(data))
        callback(<Pokemon>combined)
      });
    } else {
      console.log("poke CACHE!")
      callback(<Pokemon>data[id])
    }
  }

  getPokemonIdsByType(type: number, callback: (singlePokemon: any) => void){
    if (localStorage.getItem("poke-type-cache") === null) {
      localStorage.setItem('poke-type-cache', JSON.stringify({}));
    }
    
    let pokeTypeCache = JSON.parse(localStorage.getItem("poke-type-cache")!)
    if(pokeTypeCache[type] === undefined){
      this.http.get("https://pokeapi.co/api/v2/type/" + type)
      .subscribe((data: any)=>{
        pokeTypeCache[type] = [];
        data.pokemon.forEach((pokemonOfType: any) => {
          let pokeId = pokemonOfType.pokemon.url.split("pokemon/")[1].replace('/','');
          if(pokeId <= 905){
            pokeTypeCache[type].push(pokemonOfType.pokemon.url.split("pokemon/")[1].replace('/',''))
          }
        })
        localStorage.setItem('poke-type-cache', JSON.stringify(pokeTypeCache));
        callback(pokeTypeCache[type])
      })
    } else {
      console.log("type CACHE")
      callback(pokeTypeCache[type])
    }
  }

  getAllPokemon(){    
    if (localStorage.getItem("poke-cache") === null) {
      return new Promise((resolve) => {
        this.http.get("https://pokeapi.co/api/v2/pokemon?limit=1200")
        .subscribe((data: any)=>{    
          localStorage.setItem('poke-cache', JSON.stringify(data.results));
          resolve("done")
        })
      })
    }
    return new Promise((resolve) => {
      resolve("done")
    })
  }

  getPokemonOfType(ids: number[]){
    const toGet: Observable<any>[] = []
    
    ids.forEach((id) => {
      toGet.push(this.http.get(this.pokeTypes + id))
    })

    return forkJoin(toGet)
  }

}
