import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// videogular
import { VgCoreModule } from "videogular2/compiled/core";
import { VgControlsModule } from "videogular2/compiled/controls";
import { VgOverlayPlayModule } from "videogular2/compiled/overlay-play";
import { VgBufferingModule } from "videogular2/compiled/buffering";
import { VgStreamingModule } from "videogular2/compiled/streaming";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoRightClickDirective } from "./directives/no-right-click.directive";

@NgModule({
  declarations: [AppComponent, NoRightClickDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
