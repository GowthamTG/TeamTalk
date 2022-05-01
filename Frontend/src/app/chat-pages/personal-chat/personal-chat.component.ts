import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';
import {map, Subscription, timer} from 'rxjs';  
@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss']
})
export class PersonalChatComponent implements OnInit,OnChanges {

  constructor(
    private router: ActivatedRoute,
    private service: ApiService,

  ) { }
  timerSubscription!: Subscription;
  isMuted: boolean = false;

  senderId : String = String(localStorage.getItem('email'))
  message:String ='';
  option = 'Standard';

  receiverId : String='';
  receiverDetails: any= {};
  allMessages : any[] = [];

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.receiverId = params['emailId'];
      this.service.getUserDetails(this.receiverId).subscribe(res=>{
        this.receiverDetails = res;
      });
    })
    this.service.getUserPersonalMessages(this.senderId,this.receiverId).subscribe(res=>{
      console.log(res);
      this.allMessages = res;
    })
    this.timerSubscription = timer(0, 1000).pipe( 
      map(() => { 
        if(this.isMuted){
          return;
        }
        if(this.isMuted==false){
          // API call fetch messages every 1 second
          this.service.getUserPersonalMessages(this.senderId,this.receiverId).subscribe(res=>{
            this.allMessages = res;
          })
        }
      }) 
    ).subscribe(); 
  }
  ngOnChanges(){
    this.service.getUserPersonalMessages(this.senderId,this.receiverId).subscribe(res=>{
      this.allMessages = res;
    })
  }
  sendMessage(){
    let messageDetails = {
      conversationId: this.receiverId+"_"+this.senderId,
      sender : this.senderId,
      receiver : this.receiverId,
      message : this.message,
      option: this.option
    }
    this.message = '';
    this.service.sendMessageToUser(messageDetails).subscribe(res=>{
      console.log(res)
    })
    this.allMessages.push(messageDetails)
  }

  changeMessageType(event:any){
    if(event.checked){
      this.option = 'Important';
    }
    else{
      this.option = 'Standard';
    }
  }

  muteChat(event:any){
    if(event.checked){
      this.isMuted = true;
    }
    else{
      this.isMuted = false;
    }
    console.log(this.isMuted)
  }
  
}
