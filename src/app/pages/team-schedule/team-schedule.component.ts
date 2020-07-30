import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';


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
    public teamsUnsorted: string[] = ['hawks', 'celtics', 'nets', 'hornets', 'bulls', 'cavaliers', 'mavericks', 'nuggets', 'pistons', 'warriors',
    'rockets', 'pacers', 'clippers', 'lakers', 'grizzlies', 'heat', 'bucks', 'timberwolves', 'pelicans', 'knicks', 'thunder', 'magic', 'sixers',
    'suns', 'blazers', 'kings', 'spurs', 'raptors', 'jazz', 'wizards'];
    public teams = this.teamsUnsorted.sort();
    public selectedTeam: any;
    public profileForm = this.fb.group({
        selectedTeam: ['raptors'],
        season:[2018],
    });

    constructor(
        private nbaapiservice: NbaApiService,
        private fb: FormBuilder) { }
    

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.teams
                : this.teams.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 5))
        );
    }

    onSubmit() {
        // TODO: Use EventEmitter with form value
        // console.warn(this.profileForm.value);
        this.postTeamSchedule(this.profileForm.controls['selectedTeam'].value, this.profileForm.controls['season'].value);
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

    topBtnFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    jumpToTop() {
        var topbutton = document.getElementById("topBtn");
        // When the user scrolls down 1000px from the top of the document, show the button
        window.onscroll = function () {
            if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
                topbutton.style.display = "block";
            } else {
                topbutton.style.display = "none";
            }
        };
    }

    ngOnInit() {
        this.jumpToTop();

        console.log(this.profileForm.controls['selectedTeam'].value);
        
        this.postTeamSchedule(this.profileForm.controls['selectedTeam'].value, this.profileForm.controls['season'].value);
    }
}

