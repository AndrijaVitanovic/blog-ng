import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
