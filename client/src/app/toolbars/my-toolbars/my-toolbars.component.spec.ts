import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyToolbarsComponent } from './my-toolbars.component';

describe('MyToolbarsComponent', () => {
  let component: MyToolbarsComponent;
  let fixture: ComponentFixture<MyToolbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyToolbarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyToolbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
