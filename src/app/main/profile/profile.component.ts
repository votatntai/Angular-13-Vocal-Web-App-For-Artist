import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordConfirmedValidator } from 'src/app/validators/validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: AuthService, private form: FormBuilder) { }

  user: User = { id: '', username: '', email: '', phone: '', avatarUrl: '', firstName: '', lastName: '', gender: '', role: '', status: '', token: '' };

  updateProfileForm = this.form.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required]
  });

  updatePasswordForm = this.form.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    rePassword: ['', Validators.required]
  }, {
    validator: PasswordConfirmedValidator('newPassword', 'rePassword')
  });

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    var data = localStorage.getItem('USER');
    this.service.getUser().subscribe(result => {
      this.user = result;
      this.updateProfileForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: this.user.gender,
        phone: this.user.phone
      });
    });
    if (data) {
      var user = JSON.parse(data);
      this.service.updateUser(user);
    }
  }

  updateProfile() {

  }



  updatePassword() {
    var currentPassword = this.updatePasswordForm.value['currentPassword'];
    var newPassword = this.updatePasswordForm.value['newPassword'];
    var rePassword = this.updatePasswordForm.value['rePassword'];
    if (this.updatePasswordForm.valid) {
      if (newPassword != rePassword) {
        Swal.fire(
          'Thử lại!',
          'Mật khẩu mới và mật khẩu xác nhận không giống nhau!',
          'info'
        )
      } else if (currentPassword == newPassword) {
        Swal.fire(
          'Xin lỗi!',
          'Mật khẩu mới không được trùng với mật khẩu cũ!',
          'info'
        )
      } else {
        this.service.changePassword(this.user.email, this.updatePasswordForm.value['newPassword']).subscribe(result => {
          if (result.status == 204) {
            this.updatePasswordForm.reset();
            Swal.fire(
              'Thành công!',
              'Mật khẩu của bạn đã được thay đổi!',
              'success'
            )
          } else {
            Swal.fire(
              'Lỗi!',
              'Đã có lỗi xảy ra, vui lòng liên hệ bộ phận hỗ trợ!',
              'error'
            )
          }
        });
      }
    }
  }

}
