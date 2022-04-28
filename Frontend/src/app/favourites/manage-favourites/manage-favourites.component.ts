import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/apis/api.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-manage-favourites',
  templateUrl: './manage-favourites.component.html',
  styleUrls: ['./manage-favourites.component.scss'],
})
export class ManageFavouritesComponent implements OnInit {
  userDatas: any[] = [];
  userData!: UserI;
  constructor(
    private apiService: ApiService,
    private globalService: GlobalStoreService
  ) {}

  ngOnInit(): void {
    this.userData = this.globalService.getGlobalStore();
    this.apiService.findByUsername('').subscribe(
      (res: any) => {
        console.log(res);

        for (let i = 0; i < res.length; i++) {
          if (res[i].email != this.userData.email) {
            this.userDatas.push(res[i]);
          }
        }

        // res.forEach((user: any) => {
        //   if (user.email != this.userData.email) {
        //     this.options.push(user.email.toLowerCase());
        //   }
        // });

        console.log(this.userDatas);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
