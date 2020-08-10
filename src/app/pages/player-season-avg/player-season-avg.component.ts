import { Component, OnChanges, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { NbaApiService } from "../../nba-api.service";
import { SeasonAvg } from '../../season-average';

@Component({
  selector: 'app-player-season-avg',
  templateUrl: './player-season-avg.component.html',
  styleUrls: ['./player-season-avg.component.scss']
})
export class PlayerSeasonAvgComponent implements OnChanges {
  public playerAvg: SeasonAvg[];
  public season: number = (new Date().getFullYear()) - 1;
  public currPlayer = this.data.CurrPlayer; 
  public headShot = this.data.headShot;
  public seasonAvgForm = this.fb.group({
    season: [],
  });

  constructor(
    private nbaapiservice: NbaApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  addSeason() {
    let newSeason = this.seasonAvgForm.controls['season'].value;
    this.postSeasonAvg(this.currPlayer.id, newSeason);

    this.seasonAvgForm.reset();
  }

  postSeasonAvg(player_id: number, season: number) {
    this.nbaapiservice.getSeasonAverage(player_id,season)
      .subscribe(
        (res) => {
        this.playerAvg = res
        });
  }
  
  ngOnChanges(){
    
    this.postSeasonAvg(this.currPlayer.id, this.season);
    
  }
  
}