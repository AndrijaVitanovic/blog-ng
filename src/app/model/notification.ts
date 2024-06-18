import {User} from "./user.model";

export interface Notification {
  id: number,
  seenTime: string;
  title: string;
  body: string;
  seen?: boolean,
  user?: User,
  read?: boolean,
  actionUrl?: string
}
