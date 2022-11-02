import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teamList: any

  constructor() {
    this.teamList = JSON.parse(localStorage.getItem("saved-teams")!)
  }

  ngOnInit(): void {

    console.log("abc")
    console.log(this.teamList)

  }

}
