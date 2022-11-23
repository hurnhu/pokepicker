import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { Pokemon } from '../pokemon';
import { Species } from '../species';

@Component({
  selector: 'pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.css']
})
export class PokecardComponent implements OnInit {

  @Input() pokeid:number
  @Input()
  selected: boolean = false;
  @Input() mini: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  pokemon:Pokemon
  isChecked:boolean
  constructor(private letGet:PokeapiService) {
    this.pokeid = 0;
    this.isChecked = false;
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
    this.letGet.getSinglePokemon(this.pokeid, (singlePokemon) => {
      this.pokemon = <Pokemon>singlePokemon
    })
  }

  emitLocked(): void{
    this.selected = !this.selected
    this.selectedChange.emit(this.selected)
  }
}
