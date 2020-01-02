import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { VgAPI, VgUtils } from "videogular2/compiled/core";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  preload: string;
  api: VgAPI;
  dashBitrates: any[];
  currentStream =
    "https://res.cloudinary.com/hansel/video/upload/v1577830074/demo-video-hd.mp4";

  subscriptions: Subscription[] = [];

  constructor() {
    this.preload = "auto";
  }

  ngOnInit(): void {
    // identificar si es un dispositivo movil
    console.log(VgUtils.isMobileDevice());
    console.log(VgUtils.isiOSDevice());
    console.log(VgUtils.isCordova());
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    // colocar el video en un tiempo especifico
    this.api.seekTime(+sessionStorage.getItem("timeSave"));

    // evento que indica cuando el video esta el full screen
    this.api.fsAPI.onChangeFullscreen.subscribe(event => {});

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      // Set the video to the beginning
      this.api.getDefaultMedia().currentTime = 2.0318;
      this.api.getDefaultMedia().play();
    });

    // Evento que indica cuando el video puede ser reproducido y tenga un buffer
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.api.getDefaultMedia().play();
    });

    // Nos subcribimos al evento de pause
    this.api.getDefaultMedia().subscriptions.pause.subscribe(() => {
      sessionStorage.setItem(
        "timeSave",
        this.api.getDefaultMedia().currentTime.toString()
      );
      console.log(this.api.getDefaultMedia().currentTime);
    });
  }

  onGetBitrates($event) {
    // Manipalute $event and add your labels
    this.dashBitrates = $event;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
