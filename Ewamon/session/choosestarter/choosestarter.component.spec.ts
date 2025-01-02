import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ChoosestarterComponent } from './choosestarter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../../app-routing.module";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

describe('ChoosestarterComponent', () => {
  let component: ChoosestarterComponent;
  let fixture: ComponentFixture<ChoosestarterComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoosestarterComponent],
      imports: [ReactiveFormsModule, HttpClientModule, AppRoutingModule, RouterTestingModule]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create the app chooseStarter', () => {
    const fixture = TestBed.createComponent(ChoosestarterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosestarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should choose starter', () => {
    spyOn(component, 'addstarter'); // Spies on the component and a chosen method
    let btn = fixture.debugElement.query(By.css('button')); // A variable for all buttons on the component
    btn.triggerEventHandler('click', null); // Clicks on the buttons
    fixture.detectChanges();
    expect(component.addstarter).toHaveBeenCalled(); // Expects the button to be successfully called
  });
});
