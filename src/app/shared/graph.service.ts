import {GraphModel} from '../models/GraphModel';
import {NodeModel} from '../models/NodeModel';
import {EdgeModel} from '../models/EdgeModel';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class GraphService {

  public lastIndex = 0;

  private Graph: GraphModel;
  graphChanged = new Subject<GraphModel>();

  constructor() {
    this.Graph = new GraphModel();

    /*for (let i = 0; i < 10; i++) {
      this.Graph.addNode();
    }

    this.Graph.addEdge(0, 1);
    this.Graph.addEdge(0, 2);
    this.Graph.addEdge(0, 3);
    this.Graph.addEdge(0, 4);
    this.Graph.addEdge(1, 5);
    this.Graph.addEdge(1, 6);
    this.Graph.addEdge(1, 3);
    this.Graph.addEdge(2, 3);
    this.Graph.addEdge(2, 4);
    this.Graph.addEdge(2, 9);
    this.Graph.addEdge(3, 5);
    this.Graph.addEdge(7, 3);
    this.Graph.addEdge(8, 4);

    console.log(this.Graph);

    this.lastIndex = this.Graph.lastIndex;*/
  }

  public addNode() {
    this.Graph.addNode();
    this.lastIndex = this.Graph.lastIndex;
  }

  public addEdge(source: number, target: number) {
    this.Graph.addEdge(source, target);
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
