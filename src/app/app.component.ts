import { Component } from '@angular/core';
import {GraphModel} from './models/GraphModel';
import {GraphService} from './shared/graph.service';
import {SocketioService} from './shared/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    constructor(public graphService: GraphService) {}

}

