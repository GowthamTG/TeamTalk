import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser: string | null = '';
  inFeedRoute: boolean = false;
  isExpanded: boolean = false;
  userStatus: String ='Available';

  constructor(private router: ActivatedRoute, private service: ApiService, private route: Router) {}

  ngOnInit(): void {
    this.userStatus = String(localStorage.getItem('userStatus'));

    this.currentUser = localStorage.getItem('email');
    console.log(this.router.snapshot.toString());

    this.inFeedRoute = this.router.snapshot.toString().includes('feed');

    console.log(this.currentUser);
  }
  setStatus(status: string) {
    console.log(status);
    this.userStatus = status;
    let email = String(localStorage.getItem('email'));
    this.service.updateUserStatus(email, status).subscribe((res) => {
      console.log(res);
    });
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['/auth', 'login']).then(() => {
      window.location.reload();
    });
    }
}
