import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeVisualComponent } from './edge-visual.component';

describe('EdgeVisualComponent', () => {
  let component: EdgeVisualComponent;
  let fixture: ComponentFixture<EdgeVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
