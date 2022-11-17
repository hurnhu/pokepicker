import { Component } from '@angular/core';
import { PokeapiService } from './pokeapi.service';
import { List } from './list';
import { TeamService } from './team.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';
  types = [
    {
      name: "normal",
      id: 1,
      checked: false
    },
    {
      name: "fighting",
      id: 2,
      checked: false
    },
    {
      name: "flying",
      id: 3,
      checked: false
    },
    {
      name: "poison",
      id: 4,
      checked: false
    },
    {
      name: "ground",
      id: 5,
      checked: false
    },
    {
      name: "rock",
      id: 6,
      checked: false
    },
    {
      name: "bug",
      id: 7,
      checked: false
    },
    {
      name: "ghost",
      id: 8,
      checked: false
    },
    {
      name: "steel",
      id: 9,
      checked: false
    },
    {
      name: "fire",
      id: 10,
      checked: false
    },
    {
      name: "water",
      id: 11,
      checked: false
    },
    {
      name: "grass",
      id: 12,
      checked: false
    },
    {
      name: "electric",
      id: 13,
      checked: false
    },
    {
      name: "psychic",
      id: 14,
      checked: false
    },
    {
      name: "ice",
      id: 15,
      checked: false
    },
    {
      name: "dragon",
      id: 16,
      checked: false
    },
    {
      name: "dark",
      id: 17,
      checked: false
    },
    {
      name: "fairy",
      id: 18,
      checked: false
    },
    {
      name: "unknown",
      id: 10001,
      checked: false
    },
    {
      name: "shadow",
      id: 10002,
      checked: false
    }
  ]
  selectedType: any
  listOfPokemon:List[] = []
  savedTeams: Observable<any>


  constructor(private pokeService:PokeapiService, private teamService:TeamService) {
    this.savedTeams = this.teamService.getTeams();
  }

  ngOnInit(): void {
    this.generateRandomTeam()
  }

  updateChecked(id: any) {
    this.types.forEach((type) => {
      if(id == type.id){
        type.checked = !type.checked
        if(!type.checked) {
          this.selectedType = undefined
        }
      } else {
        type.checked = false
      }
    })
  }

  hasAnyLocked(list: List[]): boolean {
    return list.some((item) => {
      return item.selected;
    })
  }

  saveTeam():void {
    this.teamService.storeNewTeam(this.listOfPokemon);  
  }

  log(e: any) {
    console.log(e)
  }

  generateRandomTeam() {
    if(this.hasAnyLocked(this.listOfPokemon)){
      this.listOfPokemon = this.listOfPokemon.filter((item) => {
        return item.selected
      })
    } else {
      this.listOfPokemon = []
    }

    let len = this.listOfPokemon.length
    if(this.selectedType !== undefined && len < 6){
      this.pokeService.getPokemonIdsByType(this.selectedType.id, (listOfIds) => {        
        for (let index = 0; index < (6 - len); index++) {
          this.listOfPokemon.push({id: listOfIds[this.randomIntFromInterval(0, listOfIds.length - 1)], selected: false})
        }
      })
    } else if(len < 6) {
      for (let index = 0; index < (6 - len); index++) {
        this.listOfPokemon.push({id: this.randomIntFromInterval(1,905), selected: false})
      }
    }
  }

  randomIntFromInterval(min:number, max:number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
