import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


import { NbaApiService } from "../../nba-api.service";

@Component({
    selector: "app-team-schedule",
    templateUrl: "team-schedule.component.html",
    styleUrls: ['team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit {
    
    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    public focus$ = new Subject<string>();
    public click$ = new Subject<string>();
    public schedule: Observable<any>;
    public teams: string[] = ['hawks', 'celtics', 'nets', 'hornets', 'bulls', 'cavaliers', 'mavericks', 'nuggets', 'pistons', 'warriors',
    'rockets', 'pacers', 'clippers', 'lakers', 'grizzlies', 'heat', 'bucks', 'timberwolves', 'pelicans', 'knicks', 'thunder', 'magic', 'sixers',
    'suns', 'blazers', 'kings', 'spurs', 'raptors', 'jazz', 'wizards'];
    public teamsSorted = this.teams.sort();
    public selectedTeam: any;

    constructor(private nbaapiservice: NbaApiService) { }



    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.teamsSorted
                : this.teamsSorted.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 5))
        );
    }

    getGameDate(d : string, time: string){
        let game_date = d.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
        
        var full_date = new Date(game_date).toUTCString();
        full_date = full_date.substring(0, full_date.indexOf(' 00'))

        if (time != "") {
            let game_time = time.replace(/(\d{2})(\d{2})/g, '$1:$2');
            full_date = full_date + " at " + game_time;
        }
        return full_date
    }

    postTeamSchedule(team: string, year: number) {
        this.nbaapiservice.getTeamSchedule(team, year).subscribe(
            (res) => {
                this.schedule = res
                // console.log(res)
            });
    }

    ngOnInit() {
        // this.postTeamSchedule('raptors', 2018);
    }
}

