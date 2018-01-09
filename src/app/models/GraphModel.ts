import {NodeModel} from './NodeModel';
import {EdgeModel} from './EdgeModel';


export class GraphModel {

  public _id: number;
  public __v: number;

  public nodes: NodeModel[];
  public edges: EdgeModel[];
  public lastIndex;

  constructor() {
    this.nodes = new Array();
    this.edges = new Array();
    this.lastIndex = -1;
  }

  public addNode() {
    this.nodes.push(new NodeModel(this.lastIndex + 1));
    this.lastIndex = this.lastIndex + 1;
  }

  public addEdge(source: number, target: number) {
    console.log(source, target);
    if (this.getNode(source) === null || this.getNode(target) === null) {
      return;
    }
    else {
      this.edges.push(new EdgeModel(this.getNode(source), this.getNode(target)));
      this.getNode(source).addEdge();
      this.getNode(target).addEdge();
    }
  }

  private getNode (id: number): NodeModel {
    for ( let i = 0; i < this.nodes.length; i++ ) {
      if (this.nodes[i].getId() === id) {
        return this.nodes[i];
      }
    }
    return null;
  }
}
