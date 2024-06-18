import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable()
export class SnackbarHandler {

  constructor(private snackbar: MatSnackBar) {
  }

  public showErrorSnackbar = (msg: string, action: string = "Close", duration: number = 5000) => {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = "top";
    config.panelClass = ["snackbar", "error"];
    this.snackbar.open(msg, action, config);
  }

  public showSuccessSnackbar = (msg: string, action: string = "Close", duration: number = 8000) => {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = "top";
    config.panelClass = ["snackbar"];
    this.snackbar.open(msg, action, config);
  }
}
