import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  notification: any;

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.notification = data;
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }
}
