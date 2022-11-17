import { Component, Input, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent implements OnInit {

  @Input() team:any

  pokemon:Pokemon
  constructor(private letGet:PokeapiService) {

    this.pokemon = {
      name: "",
      height: 0,
      id: 0,
      weight: 0,
      sprites: { 
          back_default:"",
          back_female:"",
          back_shiny:"",
          back_shiny_female:"",
          front_default:"",
          front_female:"",
          front_shiny:"",
          front_shiny_female:""
      },
      flavor_text_entries: [],
      types: []
    }
   }

  ngOnInit(): void {
    this.letGet.getSinglePokemon(this.pokemon.id, (singlePokemon) => {
      this.pokemon = <Pokemon>singlePokemon
    })
  }

}
