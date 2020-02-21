export class Post {

  _id: string;
  userId: string;
  title: string;
  url: string;
  startDate: string;
  startTime: string;
  endTime: string;
  description: string;

  constructor(id: string, userId: string, title: string, url: string, startDate: string, startTime: string, endTime: string,
              description: string) {
    this._id = id;
    this.userId = userId;
    this.title = title;
    this.url = url;
    this.startDate = startDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
  }
}
