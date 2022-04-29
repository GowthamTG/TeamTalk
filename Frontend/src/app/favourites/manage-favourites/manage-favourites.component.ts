import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isThisQuarter } from 'date-fns';
import { DialogComponent } from 'src/app/dialog/dialog.component';
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
  favourites: string[] = [];
  constructor(
    private apiService: ApiService,
    private globalService: GlobalStoreService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userData = this.globalService.getGlobalStore();
    console.log(this.userData);

    this.apiService.findByUsername('').subscribe(
      (res: any) => {
        console.log(res);

        for (let i = 0; i < res.length; i++) {
          if (res[i].email != this.userData.email) {
            this.userDatas.push(res[i]);
          }
        }
        if (this.userData.favourites) {
          this.favourites = this.userData.favourites;
        }

        console.log(this.userDatas);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  isFavourite(email: string) {
    return this.favourites.indexOf(email) !== -1;
  }

  addOrRemoveFavourite(index: number, email: string) {
    const indexOfEmail = this.favourites.indexOf(email);
    console.log(indexOfEmail);

    if (indexOfEmail === -1) {
      this.favourites.push(email);
      this.userData.favourites = this.favourites;

      console.log(this.favourites);
    } else {
      this.favourites.splice(indexOfEmail, 1);
      console.log(this.favourites);
    }
    this.userData.favourites = this.favourites;

    this.cd.detectChanges();
  }

  saveFavourites() {
    this.globalService.saveFavourites(this.favourites);
    this.apiService
      .updateFavourites({
        id: this.userData.id,
        favourites: this.favourites,
      })
      .subscribe((res) => {
        this.dialog.open(DialogComponent, {
          data: {
            heading: `Favourites Updated`,
            message: `Favourites Updated Successfully`,
          },
        });
      });
  }
}
