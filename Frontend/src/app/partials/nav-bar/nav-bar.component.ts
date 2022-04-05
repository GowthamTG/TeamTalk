import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser: string | null = '';
  inFeedRoute: boolean = false;
  isExpanded: boolean = false;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username');
    console.log(this.router.snapshot.toString());

    this.inFeedRoute = this.router.snapshot.toString().includes('feed');

    console.log(this.currentUser);
  }
}
