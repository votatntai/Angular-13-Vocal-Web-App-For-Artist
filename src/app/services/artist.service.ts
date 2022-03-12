import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private baseUrl = environment.baseUrl;

  private artist: Artist = {
    id: '', username: '', firstName: '', lastName: '', avatar: '', email: '', phone: '', bio: '', gender: '',
    studio: false, price: 0, rate: 0, status: '', countries: [], voiceStyles: [], voiceDemos: []
  };

  private artistGlobal = new BehaviorSubject(this.artist);

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = this.getHttpHeaders();
  }

  public getArtistGlobal(): Observable<Artist> {
    return this.artistGlobal.asObservable();
  }

  public setArtistGlobal(artist: Artist): void {
    if (artist.avatar == '') {
      artist.avatar = environment.defaultAvatar
    }
    this.artistGlobal.next(artist);
  }

  private getHttpHeaders(): HttpHeaders {
    var data = localStorage.getItem('USER');
    var headers = new HttpHeaders();
    if (data) {
      var user: User = JSON.parse(data);
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + user.token);
    }
    return headers;
  }

  getArtistInfo(id: string) {
    return this.http.get<Artist>(this.baseUrl + "/api/v1/artists/", { observe: 'response', headers: this.httpHeaders, params: { id: id } })
  }

  updateArtistInfo(info: any) {
    return this.http.post<any>(this.baseUrl + '/api/v1/artists/update/', info, { headers: this.httpHeaders, observe: 'response' })
  }
}
