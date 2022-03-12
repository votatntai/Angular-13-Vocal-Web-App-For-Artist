import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    username: ['bachnguyen', Validators.required],
    password: ['12345678', [Validators.required, Validators.minLength(6)]]
  });

  signIn() {
    if (this.signInForm.valid) {
      this.service.signIn(this.signInForm.value).subscribe(result => {
        if (result.status == 200) {
          var user = JSON.parse(JSON.stringify(result.body));
          localStorage.setItem('USER', JSON.stringify(user));
          this.router.navigate(['/main/profile']);
        }
      }, error => {
        if (error.status == 401) {
          Swal.fire(
            'Xin lỗi!',
            'Tên đăng nhập hoặc mật khẩu không đúng!',
            'info'
          )
        }
      });
    }
  }

}
