import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { PostCategoryComponent } from './post-category.component';
import { AdminService } from '../../service/admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PostCategoryComponent', () => {
  let component: PostCategoryComponent;
  let fixture: ComponentFixture<PostCategoryComponent>;
  let adminService: AdminService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCategoryComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AdminService]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCategoryComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCategory method when form is valid', () => {
    const addCategorySpy = spyOn(adminService, 'addCategory').and.returnValue(of({ id: 1 }));
    component.categoryForm.setValue({ name: 'Test Category', description: 'Test Description' });
    component.addCategory();
    expect(addCategorySpy).toHaveBeenCalled();
  });

  // it('should show a success message on successful category creation', () => {
  //   const snackBarSpy = spyOn(component.snackBar, 'open');
  //   const addCategorySpy = spyOn(adminService, 'addCategory').and.returnValue(of({ id: 1 }));
  //   component.categoryForm.setValue({ name: 'Test Category', description: 'Test Description' });
  //   component.addCategory();
  //   expect(snackBarSpy).toHaveBeenCalledWith('Category Posted Successfully!', 'close', { duration: 5000 });
  // });

  // it('should show an error message when adding category fails', () => {
  //   const snackBarSpy = spyOn(component.snackBar, 'open');
  //   const addCategorySpy = spyOn(adminService, 'addCategory').and.returnValue(of({ message: 'Error' }));
  //   component.categoryForm.setValue({ name: 'Test Category', description: 'Test Description' });
  //   component.addCategory();
  //   expect(snackBarSpy).toHaveBeenCalledWith('Error', 'close', { duration: 5000, panelClass: 'error-snackbar' });
  // });
});
