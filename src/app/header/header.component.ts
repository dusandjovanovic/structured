import { Component, OnInit } from '@angular/core';
import {ReactiveService} from '../shared/reactive.service';
import {Response} from '@angular/http';
import {GraphService} from '../shared/graph.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private reactiveService: ReactiveService, private graphService: GraphService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.reactiveService.storeData().subscribe(
      () => {
        console.log('Stored logger..');
        this.graphService.graphChanged.next(this.graphService.getModel());
      }
    );
  }

  onFetchData() {
    this.reactiveService.fetchData();
  }

  onAddNode() {
    this.graphService.addNode();
    this.graphService.graphChanged.next(this.graphService.getModel());
  }

  onAddEdge() {
    this.graphService.addEdge(this.graphService.lastIndex, this.graphService.lastIndex - 1);
    this.graphService.graphChanged.next(this.graphService.getModel());
  }
}
