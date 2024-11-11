import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Ensure you import AuthService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword: boolean = true; // This controls the password visibility

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Initialize the signup form with validations
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // Custom validator to match passwords
  }

  // Password match validation
  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Handle form submission
  onSubmit(): void {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      return;
    }
  
    console.log("Submitting form with values:", this.signupForm.value); // Debugging output
  
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('Signup successful!', 'Close', { duration: 3000 });
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Signup failed. Please try again.', 'Close', { duration: 3000, panelClass: 'error-snacker' });
      }
    );
  }
  

  // Getter methods for easier form control validation checks
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
}
