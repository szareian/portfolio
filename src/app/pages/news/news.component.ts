import { Component, OnInit } from "@angular/core";
import { TwitterApiService } from '../../twitter-api.service';

@Component({
  selector: "app-news",
  templateUrl: "news.component.html",
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  myTimeline: any;

  constructor(private api: TwitterApiService) { }

  ngOnInit() {
    this.getTwitterTimeline();
  }

  getTwitterTimeline(): void {
    this.api.getTimeline()
      .subscribe(
        myTimeline => {
          this.myTimeline = myTimeline;
        }
      )
  }
}
