import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private sanitizer: DomSanitizer) { }

  public calculateCreatedDate(timestamp: any) {
    const date = new Date(timestamp);
    const currentDate = new Date();
    const diff = currentDate.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        if (minutes === 0) {
          return "Just now";
        } else {
          return minutes + " minutes ago";
        }
      } else {
        return hours + " hours ago";
      }
    } else {
      return days + " days ago";
    }
  }

  public roundRating(ratio: any) {
    if (ratio < 1000) {
      return ratio.toString();
    } else if (ratio < 10000) {
      // Display 1 decimal place if likes are in the thousands (e.g., 2.5K)
      return (ratio / 1000).toFixed(1) + 'K';
    }  else if (ratio < 1000000) {
      // Display likes in thousands (e.g., 12.6K)
      return (ratio / 1000).toFixed(0) + 'K';
    } else {
      // Display likes in millions (e.g., 2.5M)
      return (ratio / 1000000).toFixed(1) + 'M';
    }
  }

  getProfilePicture(user: any) {
    let objectURL = 'data:image/jpeg;base64,' + user.image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
