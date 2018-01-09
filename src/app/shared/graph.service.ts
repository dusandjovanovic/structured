import {GraphModel} from '../models/GraphModel';
import {NodeModel} from '../models/NodeModel';
import {EdgeModel} from '../models/EdgeModel';
import {Subject} from 'rxjs/Subject';
import {Injectable, OnInit} from '@angular/core';
import {SocketioService} from './socketio.service';

@Injectable()
export class GraphService {

  public lastIndex = 0;

  private Graph: GraphModel;
  graphChanged = new Subject<GraphModel>();

  constructor(private socketioService: SocketioService) {
    this.Graph = new GraphModel();


  }

  public addNode() {
    this.Graph.addNode();
    this.lastIndex = this.Graph.lastIndex;
    this.socketioService.addNode({
      node: this.lastIndex - 1,
      linkCount: 0
    });
  }

  public addNodeSync() {
    this.Graph.addNode();
    this.lastIndex = this.Graph.lastIndex;
    this.graphChanged.next(this.getModel());
  }

  public addEdge(source: number, target: number) {
    this.Graph.addEdge(source, target);
    this.socketioService.addEdge({
      source: source,
      target: target
    });
  }

  public addEdgeSync(source: number, target: number) {
    this.Graph.addEdge(source, target);
    this.graphChanged.next(this.getModel());
  }

  public getModel(): GraphModel {
    return this.Graph;
  }

  public updateModel(model: GraphModel) {
    this.Graph = model;
    this.graphChanged.next(this.Graph);
  }

  public getNodes(): NodeModel[] {
    return this.Graph.nodes.slice();
  }

  public getEdges(): EdgeModel[] {
    return this.Graph.edges.slice();
  }
}
