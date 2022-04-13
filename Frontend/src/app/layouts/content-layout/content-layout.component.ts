import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  currentUser: string | null = '';
  inFeedRoute: boolean = false;
  isExpanded: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('email');
    console.log(this.router.snapshot.toString());

    this.inFeedRoute = this.router.snapshot.toString().includes('feed');
  }

  logout() {
    console.log(this.authService.clearAuthData());
  }
}
