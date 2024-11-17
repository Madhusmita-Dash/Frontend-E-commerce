import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  searchProductForm: FormGroup;
  private snackBar: any;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllProducts(): void {
    this.products = [];
    this.adminService.getAllProducts().subscribe(
      (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
//checking
  submitForm(): void {
    if (this.searchProductForm.valid) {
      this.products = [];
      const title = this.searchProductForm.get('title')!.value;
      this.adminService.getAllProductsByName(title).subscribe(
        (res) => {
          res.forEach((element: any) => {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
            this.products.push(element);
          });
        },
        (error) => {
          console.error('Error fetching products by name:', error);
        }
      );
    } else {
      console.warn('Search form is invalid');
    }
  }

  deleteProduct(productId: any): void {
    this.adminService.deleteProduct(productId).subscribe(
      (res) => {
        if (res.body === null) {
          this.snackBar.open('Product Deleted Successfully!', 'Close', {
            duration: 5000
          });
          this.getAllProducts();
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      },
      (error) => {
        this.snackBar.open('Error deleting product', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    );
  }
}
