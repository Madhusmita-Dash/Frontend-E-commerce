import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
  productForm: FormGroup;
  listofCategories: any[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

    this.getAllCategories();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.previewImage();
    }
  }

  previewImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe(
      (res) => {
        this.listofCategories = res;
      },
      (error) => {
        this.snackBar.open('Failed to load categories', 'Close', {
          duration: 3000
        });
      }
    );
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.adminService.addProduct(formData).subscribe(
        (res) => {
          if (res.id != null) {
            this.snackBar.open('Product posted successfully!', 'Close', {
              duration: 5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.snackBar.open(res.message, 'ERROR', {
              duration: 5000
            });
          }
        },
        (error) => {
          this.snackBar.open('Error while posting product', 'Close', {
            duration: 5000
          });
        }
      );
    } else {
      for (const control in this.productForm.controls) {
        if (this.productForm.controls.hasOwnProperty(control)) {
          this.productForm.controls[control].markAsDirty();
          this.productForm.controls[control].updateValueAndValidity();
        }
      }
    }
  }
}
