import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { UserI } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/apis/api.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  @ViewChild('picker') picker: any;
  @ViewChild('picker') picker1: any;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: Date;
  public maxDate!: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;

  public dateControl = new FormControl(null);

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
  createEventForm: FormGroup = this.fb.group({
    createdBy: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    users: this.fb.array([]),
    priority: ['medium', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
  });

  public selected: string = 'medium';

  userData!: UserI;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  priority: string[] = ['high', 'medium', 'low'];

  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private apiService: ApiService,
    private globalService: GlobalStoreService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  userDatas!: any[];

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
    console.log(this.createEventForm.value);
    let formData = this.createEventForm.value;
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
        formData.members.push(user._id);
      }
    });
    delete formData.membersMail;
    delete formData.users;
    formData.createdBy = this.userData.id;
    // formData.title = formData.meetName;
    // delete formData.meetName;
    console.log(formData);
    this.apiService.createEvent(formData).subscribe(
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
    return this.createEventForm.get('users') as FormArray;
  }
  onNoClick(): void {
    this.dialogRef.close(this.userData.id);
  }
}
