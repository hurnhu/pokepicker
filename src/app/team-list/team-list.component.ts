import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from '../team.service';

@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teamList: Observable<any>

  constructor(private teamService:TeamService) {
    this.teamList = teamService.getTeams()
  }

  ngOnInit(): void {

    console.log("abc")
    console.log(this.teamList)

  }

}
