import { Component, OnInit } from "@angular/core";

import { NbaApiService } from "../../nba-api.service";

import { Observable } from 'rxjs';


@Component({
    selector: "app-team-schedule",
    templateUrl: "team-schedule.component.html",
    styleUrls: ['team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit {
    public schedule: Observable<any>;
    public NBATeams: string[] = ['hawks', 'celtics', 'nets', 'hornets', 'bulls', 'cavaliers', 'mavericks', 'nuggets', 'pistons', 'warriors',
        'rockets', 'pacers', 'clippers', 'lakers', 'grizzlies', 'heat', 'bucks', 'timberwolves', 'pelicans', 'knicks', 'thunder', 'magic', 'sixers',
        'suns', 'blazers', 'kings', 'spurs', 'raptors', 'jazz', 'wizards'];

    constructor(private nbaapiservice: NbaApiService) { }

    postTeamSchedule(team: string, year: number) {
        this.nbaapiservice.getTeamSchedule(team, year).subscribe(
            (res) => {
                this.schedule = res
                // console.log(res)
            });
    }

    ngOnInit() {
        this.postTeamSchedule('raptors', 2018);
    }
}

