import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistanceToNowStrict } from 'date-fns/esm';
import { UserI } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/apis/api.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit {
  userData!: UserI;
  constructor(
    private apiService: ApiService,
    private globalService: GlobalStoreService,
    private route: Router
  ) {}

  meetsData: any = [];
  userDatas!: any[];
  options: string[] = [];
  ngOnInit(): void {
    this.userData = this.globalService.getGlobalStore();
    console.log(this.userData.ownedMeets);
    if (this.userData.ownedMeets?.toString() === [''].toString()) {
      console.log('Empty');
    }
    console.log(this.userData);
    this.apiService.findByUsername('').subscribe(
      (res: any) => {
        this.userDatas = [...res];
        for (let i = 0; i < this.userDatas.length; i++) {
          if (this.userDatas[i].email != this.userData.email) {
            this.options.push(this.userDatas[i].email.toLowerCase());
          }
        }

        // res.forEach((user: any) => {
        //   if (user.email != this.userData.email) {
        //     this.options.push(user.email.toLowerCase());
        //   }
        // });

        console.log(this.userDatas);

        console.log(this.options);
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.apiService.getAllRooms(this.userData.id).subscribe((res: any) => {
      console.log(res);

      this.meetsData = res.response;
    });
  }
  chatUser(user:string){
    this.route.navigateByUrl(`/chats/personal-chat/${user}`)
  }
}
