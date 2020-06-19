import { Component, OnInit } from "@angular/core";

import { NbaApiService } from "../../nba-api.service"

import { Player } from '../../player';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  public players: Player[];

  constructor(private nbaapiservice: NbaApiService ) {}

  ngOnInit() {
    
    this.nbaapiservice.getAllPlayers() 
      .subscribe( 
        (res) => {this.players = res,
        console.log(Object.keys(res))
        // console.log(this.players.team)
        });
  }
}
