import { Component, OnInit } from '@angular/core';
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
    private globalService: GlobalStoreService
  ) {}

  meetsData: any = [];

  ngOnInit(): void {
    this.userData = this.globalService.getGlobalStore();
    console.log(this.userData.ownedMeets);
    if (this.userData.ownedMeets?.toString() === [''].toString()) {
      console.log('Empty');

      // this.apiService
      //   .getAllRooms(this.userData.ownedMeets)
      //   .subscribe((res: any[]) => {
      //     this.meetsData = res;
      //   });
    }
    console.log(this.userData);

    this.apiService.getAllRooms(this.userData.id).subscribe((res: any) => {
      console.log(res);

      this.meetsData = res.response;
    });
  }
}
