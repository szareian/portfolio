import { Component, OnInit, Input } from '@angular/core';
import { NbaApiService } from "../../nba-api.service";
import { SeasonAvg } from '../../season-average';
import { Player } from '../../player';

@Component({
  selector: 'app-player-season-avg',
  templateUrl: './player-season-avg.component.html',
  styleUrls: ['./player-season-avg.component.scss']
})
export class PlayerSeasonAvgComponent implements OnInit {
  public playerAvg: SeasonAvg[];
  @Input() currPlayer: Player; 

  constructor(private nbaapiservice: NbaApiService) { }


  postSeasonAvg(player_id: number, season: number) {
    this.nbaapiservice.getSeasonAverage(player_id,season)
      .subscribe(
        (res) => {
        this.playerAvg = res
          console.log(this.playerAvg)
        });
  }
  
  ngOnInit(): void {
    
    // console.log(this.postSeasonAvg(this.currPlayer.id, 2018));
    this.postSeasonAvg(this.currPlayer.id,2018);
  }

}
