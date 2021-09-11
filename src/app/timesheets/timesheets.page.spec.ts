import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimesheetsPage } from './timesheets.page';

describe('TimesheetsPage', () => {
  let component: TimesheetsPage;
  let fixture: ComponentFixture<TimesheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimesheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
