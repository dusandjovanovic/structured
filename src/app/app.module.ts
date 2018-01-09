import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { EdgeVisualComponent } from './edge-visual/edge-visual.component';
import { NodeVisualComponent } from './node-visual/node-visual.component';
import { VisualizeService } from './visualization/visualize.service';
import { ZoomableDirective } from './visualization/directives/zoomable.directive';
import { DraggableDirective } from './visualization/directives/draggable.directive';
import { HeaderComponent } from './header/header.component';
import { GraphService } from './shared/graph.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveService} from './shared/reactive.service';
import {HelperService} from './shared/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    EdgeVisualComponent,
    NodeVisualComponent,
    ZoomableDirective,
    DraggableDirective,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [VisualizeService, GraphService, ReactiveService, HelperService],
  bootstrap: [AppComponent]
})

export class AppModule { }
