import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.css']
})
export class PokecardComponent implements OnInit {

  pokemon!:Pokemon
  constructor(private letGet:PokeapiService) {
  }

  ngOnInit(): void {
    this.letGet.getSinglePokemon().subscribe((data)=>{
      console.log("this is my data")
      console.log(data)
      this.pokemon = <Pokemon>data
    })
  }

}
