import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewProductsComponent } from './user-view-products.component';

describe('UserViewProductsComponent', () => {
  let component: UserViewProductsComponent;
  let fixture: ComponentFixture<UserViewProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
