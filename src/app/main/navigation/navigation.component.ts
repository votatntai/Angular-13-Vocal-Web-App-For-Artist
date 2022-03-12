import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { User } from 'src/app/models/user.model';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  artist: Artist = {
    id: '', username: '', firstName: '', lastName: '', avatar: '', email: '', phone: '', bio: '', gender: '',
    studio: false, price: 0, rate: 0, status: '', countries: [], voiceStyles: [], voiceDemos: []
  };

  constructor(private router: Router, private artistService: ArtistService) { }

  ngOnInit(): void {
    this.getArtistInfo();
  }

  getArtistInfo() {
    this.artistService.getArtistGlobal().subscribe(result => {
      this.artist = result;
    })
    var data = localStorage.getItem('USER');
    if (data) {
      var user: User = JSON.parse(data);
      this.artistService.getArtistInfo(user.id).subscribe(result => {
        if (result.body !== null) {
          this.artistService.setArtistGlobal(result.body);
        }
      }, error => {
        console.log(error);
      })
    }
  }

  signOut() {
    localStorage.removeItem("USER");
    this.router.navigate(['']);
  }

}
