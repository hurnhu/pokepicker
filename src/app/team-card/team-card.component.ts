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

  constructor() {

   }

  ngOnInit(): void {  
  }

}
