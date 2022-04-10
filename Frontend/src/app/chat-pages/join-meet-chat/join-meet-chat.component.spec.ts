import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMeetChatComponent } from './join-meet-chat.component';

describe('JoinMeetChatComponent', () => {
  let component: JoinMeetChatComponent;
  let fixture: ComponentFixture<JoinMeetChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinMeetChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinMeetChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
