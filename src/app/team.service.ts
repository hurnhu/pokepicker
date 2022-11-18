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
    this.loadTeams()
  }

  private teams = new Subject<any>;
  
  getTeams(): Observable<any> {
    return this.teams.asObservable();
  }

  getTeamFromStorage():any {
    return JSON.parse(localStorage.getItem("saved-teams")!);
  }

  loadTeams(): any{
    let temp = this.getTeamFromStorage()
    console.log(temp);
    
    this.teams.next(temp)
  }

  storeNewTeam(team:any){
    let savedTeams = this.getTeamFromStorage();
    savedTeams.push(team)
    localStorage.setItem('saved-teams', JSON.stringify(savedTeams));
    
    this.teams.next(savedTeams);
  }
}
