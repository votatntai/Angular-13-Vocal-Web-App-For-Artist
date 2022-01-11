import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private form: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  signInForm = this.form.group({
    username: ['phucle', Validators.required],
    password: ['tantai4899', Validators.required]
  });

  signIn() {
    if (this.signInForm.valid) {
      this.service.signIn(this.signInForm.value.username, this.signInForm.value.password).subscribe(result => {
        var data = JSON.parse(JSON.stringify(result));
        localStorage.setItem('USER', JSON.stringify(data["data"]));
        var user: User = data["data"]
        this.service.updateUser(user);
        this.router.navigate(['/main/profile'])
      });
    }
  }

}
