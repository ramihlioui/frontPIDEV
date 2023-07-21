import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReclamationsComponent } from './list-reclamations.component';

describe('ListReclamationsComponent', () => {
  let component: ListReclamationsComponent;
  let fixture: ComponentFixture<ListReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReclamationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
