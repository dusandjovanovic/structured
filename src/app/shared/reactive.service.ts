import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GraphService} from './graph.service';
import {GraphModel} from '../models/GraphModel';
import {Subject} from 'rxjs/Subject';
import {NodeModel} from '../models/NodeModel';
import {EdgeModel} from '../models/EdgeModel';
import {JGraph} from '../json-graph/JGraph';

@Injectable()
export class ReactiveService {

  dataChanged = new Subject<GraphModel>();

  constructor(private http: HttpClient, private graphService: GraphService) {}

  private ID: number;

  storeData() {

    const graphSchema = new JGraph();

    for (const i of this.graphService.getModel().nodes) {
      graphSchema.addNode(i.id, i.linkCount);
    }

    for (const i of this.graphService.getModel().edges) {
      graphSchema.addEdge(i.source, i.target);
    }

    console.log('Schema');
    console.log(graphSchema);

    let prenos = [JSON.stringify(this.graphService.getModel().nodes),
    JSON.stringify(this.graphService.getModel().edges),
    (this.graphService.getModel().lastIndex];

    console.log(prenos);

    return this.http.post('http://localhost:3000/graphs', prenos);
  }

  fetchData() {
    this.http.get('http://localhost:3000/graphs', {
     //this.http.get<GraphModel>('https://structured-34291.firebaseio.com/graph.json', {
      observe: 'body',
      responseType: 'json',
    }).subscribe(
      (response: GraphModel) => {
        console.log('Logger data..');
        console.log(response);

        const newModel = new GraphModel();

        //for (const i of response.nodes) {
        //  newModel.addNode();
        //}

        //for (const i of response.edges) {
        //  newModel.addEdge(i[0], i[1]);
        //}

        for (let i = 0; i <= response.lastIndex; i++) {
          newModel.addNode();
        }
        for (const edge of response.edges){
          let src: number;
          let dst: number;
          src = edge.source.id;
          dst = edge.target.id;

          newModel.addEdge(src, dst);
        }

        //console.log(newModel);
        newModel.lastIndex = response.lastIndex;
        this.graphService.lastIndex = newModel.lastIndex;
        this.graphService.updateModel(newModel);
        this.graphService.graphChanged.next(newModel);
      }
    );
  }
}
