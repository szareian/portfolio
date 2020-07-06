import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';

import { NbaApiService } from "../../nba-api.service";
import { Player } from '../../player';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
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
  
  public isShown = false;

  toggle() {
    this.isShown = !this.isShown;
  }

  // Extra Information about the player e.g. height,weight,stats,..
  // infoCard(staff: any) {
  //   'use strict';

  //   console.clear();

  //   // DOM elements
  //   var body = document.body;
  //   staff = document.querySelector('.staff li');
  //   // var blur = document.querySelector('.blur');
  //   var card = document.querySelector('.card');
  //   var cardContent = document.querySelector('.card__content');
  //   var exitBtn = document.querySelector('.exit');
  //   var cardExit = document.querySelector('.card__exit');
    
  //   console.log(staff);
    
  //   if(staff){
  //     staff.addEventListener('click', function () {
  //       toggleCard(true);
  //       // add no hover class to prevent hover styles from remaining on screen
  //       this.classList.add('no-hover');        
  //     });
  //   };
    
    
  //   // card exit icon
  //   exitBtn.addEventListener('click', function () { toggleCard(false) });
    
  //   // if user clicks outside of the card, close it  
  //   cardExit.addEventListener('click', function () { toggleCard(false) });
    
    
  //   function toggleCard(toggle) {
  //     card.setAttribute('aria-hidden', (!toggle).toString());
  //     // blur.classList.toggle('blur--active', toggle);
  //     body.classList.toggle('no-scroll', toggle);
      
  //     // scroll card content back to the top
  //     cardContent.scrollTop = 0;
      
  //     // remove no hover class
  //     if (!toggle) {
  //       document.querySelector('.no-hover').classList.remove('no-hover');
  //     }
  //   }
  // }
  
  
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
