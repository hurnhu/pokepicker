import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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

  private teams = new BehaviorSubject({});
  
  getTeams(): Observable<any> {
    return this.teams.asObservable();
  }

  getTeamFromStorage():Array<object> {
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

  deleteTeamByIndex(index: number){
    let teamsFromStorage = this.getTeamFromStorage()
    teamsFromStorage.splice(index, 1)
    localStorage.setItem('saved-teams', JSON.stringify(teamsFromStorage));
    this.teams.next(teamsFromStorage);
  }

}
