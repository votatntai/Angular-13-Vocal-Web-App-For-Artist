import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: User = { id: '', username: '', email: '', phone: '', avatarUrl: '', firstName: '', lastName: '', gender: '', role: '', status: '', token: '' };

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
    this.service.getUser().subscribe(result => {
      this.user = result;
    });
    this.getUserInfo();
  }

  getUserInfo() {
    var data = localStorage.getItem('USER');
    if (data) {
      var user = JSON.parse(data);
      this.service.updateUser(user);
    }
  }

  signOut() {
    localStorage.removeItem("USER");
    this.router.navigate(['']);
  }

}
