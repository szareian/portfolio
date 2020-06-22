import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from './player';

@Injectable( {
    providedIn: 'root'
})

export class NbaApiService {
    constructor(private http: HttpClient) {}

    API_KEY = '';

    private playersUrl: string = 'https://www.balldontlie.io/api/v1/players';

    public getAllPlayers(): Observable<Player[]>{ 
        return this.http.get<Player[]>(this.playersUrl)
            .pipe(map((res: any) => res.data),
                // catchError(error => { return throwError('Its a Trap!') })
            );
    };

    public searchPlayers(term: string): Observable<Player[]>{
        if (!term.trim()) {
            // if not search term, return empty Player array.
            return of([]);
        }
        term = term.trim();

        // Add safe, URL encoded search parameter if there is a search term
        const options = term ?
            { params: new HttpParams().set('search', term) } : {};

        return this.http.get<Player[]>(this.playersUrl, options)
            .pipe(map((res: any) => res.data));
    };

    
}

