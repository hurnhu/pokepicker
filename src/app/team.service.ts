import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  constructor() { 
    if (localStorage.getItem("saved-teams") === null) {
      localStorage.setItem('saved-teams', JSON.stringify([]));
    }
    let localTeams = JSON.parse(localStorage.getItem("saved-teams")!);
    console.log("my teams")
    console.log(localTeams);
    
    this.teams.next(localTeams)
    // let savedTeams = JSON.parse(localStorage.getItem("saved-teams")!)
    // savedTeams.push(this.listOfPokemon)
    // localStorage.setItem('saved-teams', JSON.stringify(savedTeams));
  }

  private teams = new Subject<any>;
  
  getTeams(): Observable<any> {
    return this.teams.asObservable();
  }

  storeNewTeam(team:any){
    let savedTeams = JSON.parse(localStorage.getItem("saved-teams")!)
    savedTeams.push(team)
    localStorage.setItem('saved-teams', JSON.stringify(savedTeams));
    this.teams.next(savedTeams);
  }
}
