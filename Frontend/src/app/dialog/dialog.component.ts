import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { ErrorComponent } from '../error/error/error.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { heading: string; message: string }
  ) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeErrorBox() {
    this.dialogRef.close();
  }
}
