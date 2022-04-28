import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserI } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/apis/api.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent {
  createGroupForm: FormGroup = this.fb.group({
    groupName: ['', Validators.required],
    users: this.fb.array([]),
  });
  userData!: UserI;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  userDatas!: any[];
  constructor(
    private apiService: ApiService,
    private globalService: GlobalStoreService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
    this.apiService.findByUsername(this.myControl.value).subscribe(
      (res: any) => {
        console.log(res);
        this.userDatas = [...res];
        res.forEach((user: any) => {
          this.options.push(user.email.toLowerCase());
        });

        console.log(this.userDatas);

        console.log(this.options);
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.userData = this.globalService.getGlobalStore();
    console.log(this.userData);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  addUser() {
    this.users.push(
      this.fb.group({
        user: ['', [Validators.required, Validators.email]],
      })
    );
    console.log(this.users.length);
  }

  deleteUser(index: number) {
    this.users.removeAt(index);
  }

  onSubmit() {
    console.log(this.createGroupForm.value);
    let formData = this.createGroupForm.value;
    formData.membersMail = [];
    formData.members = [];
    for (let memberMail of formData.users) {
      formData.membersMail.push(memberMail.user);
    }

    delete formData.userEmails;

    this.userDatas.forEach((user) => {
      console.log(user.email);
      console.log(formData.membersMail);

      if (formData.membersMail.includes(user.email)) {
        console.log(user._id);

        formData.members.push(user._id);
      }
    });
    delete formData.membersMail;
    delete formData.users;
    formData.owner = this.userData.id;
    formData.name = formData.groupName;
    delete formData.groupName;
    console.log(formData);
    this.apiService.createMeet(formData).subscribe(
      (res: any) => {
        this.dialog.open(DialogComponent, {
          data: {
            heading: `Room Created`,
            message: `Room Created Successfully`,
          },
        });
        this.router.navigate(['/groups']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  get users() {
    return this.createGroupForm.get('users') as FormArray;
  }
}
