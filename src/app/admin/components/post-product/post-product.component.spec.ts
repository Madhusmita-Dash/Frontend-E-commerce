import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { PostProductComponent } from './post-product.component';
import { AdminService } from '../../service/admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostProductComponent', () => {
  let component: PostProductComponent;
  let fixture: ComponentFixture<PostProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostProductComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AdminService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addProduct when form is submitted', () => {
    spyOn(component, 'addProduct');
    component.productForm.setValue({
      categoryId: 1,
      name: 'Product Name',
      price: 100,
      description: 'Product Description'
    });
    fixture.nativeElement.querySelector('button').click();
    expect(component.addProduct).toHaveBeenCalled();
  });
});
