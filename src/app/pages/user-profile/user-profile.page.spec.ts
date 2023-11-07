import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserProfilePage } from './user-profile.page';

describe('UserProfilePage', () => {
  let component: UserProfilePage;
  let fixture: ComponentFixture<UserProfilePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(UserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
