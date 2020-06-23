import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { NbaApiService } from "../../nba-api.service";
import { Player } from '../../player';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})
export class PlayerSearchComponent implements OnInit {

  public players$: Observable<Player[]>;
  public headShot: String;
  public defaultHeadshot = '../../../assets/img/default-avatar.png';
  private searchTerms = new Subject<string>();
  private headShotBaseUrl = 'https://nba-players.herokuapp.com/players';

  constructor(private nbaapiservice: NbaApiService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  postHeadshot(p: Player): string {
    let results = this.headShotBaseUrl + '/' + p.last_name + '/' + p.first_name;
    return results
  }
  

  ngOnInit(): void {
    this.players$ = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term
    debounceTime(300),

    // ignore new term if same as previous term
    distinctUntilChanged(),

    // switch to new search observable each time the term changes
    switchMap((term: string) => this.nbaapiservice.searchPlayers(term)),
    );
      
  }
  
}
