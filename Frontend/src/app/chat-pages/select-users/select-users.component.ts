import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UserI } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.scss'],
})
export class SelectUsersComponent implements OnInit {
  // @Input() users: UserI[] = [];
  // @Output() addUser: EventEmitter<UserI> = new EventEmitter<UserI>();
  // @Output() removeuser: EventEmitter<UserI> = new EventEmitter<UserI>();
  // searchUsername = new FormControl();
  // filteredUsers: UserI[] = [];
  // selectedUser: UserI | null = null;
  // constructor(private apiService: ApiService) {}
  // ngOnInit(): void {
  //   this.searchUsername.valueChanges
  //     .pipe(
  //       debounceTime(500),
  //       distinctUntilChanged(),
  //       switchMap((username: string) =>
  //         this.apiService
  //           .findByUsername(username)
  //           .pipe(tap((users: UserI[]) => (this.filteredUsers = users)))
  //       )
  //     )
  //     .subscribe();
  // }
  // addUserToForm() {
  //   this.addUser.emit(this.selectedUser!);
  //   this.filteredUsers = [];
  //   this.selectedUser = null;
  //   this.searchUsername.setValue(null);
  // }
  // removeUserFromForm(user: UserI) {
  //   this.removeuser.emit(user);
  // }
  // setSelectedUser(user: UserI) {
  //   this.selectedUser = user;
  // }
  // displayFn(user: UserI): string {
  //   if (user) {
  //     return user.username!;
  //   } else {
  //     return '';
  //   }
  // }

  ngOnInit(): void {}
}
