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

    private all_players_url: string = 'https://www.balldontlie.io/api/v1/players?search=leonard';
    // private all_players_url: string = 'https://www.balldontlie.io/api/v1/players?search=anthony+davis';

    public getAllPlayers(): Observable<Player[]>{ 
        // const params = new HttpParams().set('?search','anthony+davis');
        return this.http.get<Player[]>(this.all_players_url)
            .pipe(map((res: any) => res.data),
                // catchError(error => { return throwError('Its a Trap!') })
            );
    };

    
}

