import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
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
  // form: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required]),
  //   description: new FormControl(null),
  //   users: new FormArray([], [Validators.required]),
  // });
  // constructor(
  //   private chatService: ChatService,
  //   private router: Router,
  //   private activatedRoute: ActivatedRoute
  // ) {}
  // create() {
  //   if (this.form.valid) {
  //     this.chatService.createGroup(this.form.getRawValue());
  //     this.router.navigate(['../dashboard'], {
  //       relativeTo: this.activatedRoute,
  //     });
  //   }
  // }
  // initUser(user: UserI) {
  //   return new FormControl({
  //     id: user.id,
  //     username: user.username,
  //     email: user.email,
  //   });
  // }
  // addUser(userFormControl: FormControl) {
  //   this.users.push(userFormControl);
  // }
  // removeUser(userId: string) {
  //   this.users.removeAt(
  //     this.users.value.findIndex((user: UserI) => user.id === userId)
  //   );
  // }
  // get name(): FormControl {
  //   return this.form.get('name') as FormControl;
  // }
  // get description(): FormControl {
  //   return this.form.get('description') as FormControl;
  // }
  // get users(): FormArray {
  //   return this.form.get('users') as FormArray;
  // }  myControl = new FormControl();

  createGroupForm: FormGroup = this.fb.group({
    groupName: ['', Validators.required],
    users: this.fb.array([]),
  });
  userData!: UserI;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  constructor(
    private apiService: ApiService,
    private globalService: GlobalStoreService,
    private fb: FormBuilder
  ) {}

  userDatas!: any[];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
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
      (err) => {
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
        console.log(res);
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
