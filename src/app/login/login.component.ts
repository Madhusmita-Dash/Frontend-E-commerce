import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userStorageService: UserStorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe(
      (success: boolean) => {
        if (success) {
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          } else {
            this.router.navigateByUrl('/');
          }
        } else {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 5000,
          });
        }
      },
      (error: any) => {
        console.error(error);
        this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000 });
      }
    );
  }
}
