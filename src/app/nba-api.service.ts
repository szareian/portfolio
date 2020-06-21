import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from './player';

@Injectable( {
    providedIn: 'root'
})

export class NbaApiService {
    constructor(private http: HttpClient) {}

    API_KEY = '';

    private playersUrl: string = 'https://www.balldontlie.io/api/v1/players';
    // private all_players_url: string = 'https://www.balldontlie.io/api/v1/players?search=anthony+davis';

    public getAllPlayers(): Observable<Player[]>{ 
        return this.http.get<Player[]>(this.playersUrl)
            .pipe(map((res: any) => res.data),
                // catchError(error => { return throwError('Its a Trap!') })
            );
    };

    public searchPlayers(term: string): Observable<Player[]>{
        term = term.trim();

        // Add safe, URL encoded search parameter if there is a search term
        const options = term ?
            { params: new HttpParams().set('search', term) } : {};

        if (!term){ // quick fix for when the search box is clear
            return
        }
        return this.http.get<Player[]>(this.playersUrl, options)
            .pipe(map((res: any) => res.data));
    };

    
}

