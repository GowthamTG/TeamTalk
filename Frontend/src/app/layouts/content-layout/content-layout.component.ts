import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  currentUser: string | null = '';
  inFeedRoute: boolean = false;
  isExpanded: boolean = false;
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('email');
    console.log(this.router.snapshot.toString());

    this.inFeedRoute = this.router.snapshot.toString().includes('feed');

    console.log(this.currentUser);
  }
}
