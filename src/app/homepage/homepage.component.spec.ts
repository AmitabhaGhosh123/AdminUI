import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestUsers } from '../model/testing/test-users';
import { HomepageComponent } from './homepage.component';
const USERS = getTestUsers();

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the first letter of Name,Email and Role column names uppercase', () => {
    let nameColumn = Object.keys(USERS[0])[1];
    let emailColumn = Object.keys(USERS[0])[2];
    let roleColumn = Object.keys(USERS[0])[3];
    nameColumn = nameColumn.charAt(0).toUpperCase() + nameColumn.slice(1);
    emailColumn = emailColumn.charAt(0).toUpperCase() + emailColumn.slice(1);
    roleColumn = roleColumn.charAt(0).toUpperCase() + roleColumn.slice(1);
    expect(nameColumn)
      .withContext('nameColumn')
      .toEqual('Name');
    expect(emailColumn)
      .withContext('emailColumn')
      .toEqual('Email');
    expect(roleColumn)
      .withContext('roleColumn')
      .toEqual('Role');
  })

  it('should be able to search user by name,email or role',() => {
    let searchValue = 'Keshav';
    let filteredUsers = USERS.filter((val:any)=> {
      return val['name'].includes(searchValue) || val['email'].includes(searchValue) || val['role'].includes(searchValue);
    })
    expect(filteredUsers.length).toBeGreaterThan(0);
  })

  it('should change state on check or uncheck of selectAll checkbox', () => {
    const element = fixture.debugElement.query(By.css('#selectAll')).nativeElement;
    console.log(element);
    expect(element.checked).toBe(false);
    element.click();
    fixture.detectChanges();
    expect(element.checked).toBe(true);
    element.click();
    fixture.detectChanges();
    expect(element.checked).toBe(false);
  })

});
