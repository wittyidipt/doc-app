import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCardsComponent } from './gallery-cards.component';

describe('GalleryCardsComponent', () => {
  let component: GalleryCardsComponent;
  let fixture: ComponentFixture<GalleryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
