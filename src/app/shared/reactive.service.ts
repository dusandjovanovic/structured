import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {GraphService} from './graph.service';
import {GraphModel} from '../models/GraphModel';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ReactiveService {

  dataChanged = new Subject<GraphModel>();

  constructor(private http: HttpClient, private graphService: GraphService) {}

  storeData() {

    let prenos = [JSON.stringify(this.graphService.getModel().nodes),
    JSON.stringify(this.graphService.getModel().edges),
    (this.graphService.getModel().lastIndex)];

    return this.http.post('http://localhost:3000/graphs', prenos);
  }

  fetchData() {
    this.http.get('http://localhost:3000/graphs', {
      observe: 'body',
      responseType: 'json',
    }).subscribe(
      (response: GraphModel) => {
        console.log('Response data..');
        console.log(response);

        const newModel = new GraphModel();

        for (let i = 0; i <= response.lastIndex; i++) {
          newModel.addNode();
        }
        for (const edge of response.edges){
          const src = edge.source;
          const dst = edge.target;

          newModel.addEdge(src.id, dst.id);
        }

        newModel.lastIndex = response.lastIndex;
        this.graphService.lastIndex = newModel.lastIndex;
        this.graphService.updateModel(newModel);
        this.graphService.graphChanged.next(newModel);
      }
    );
  }
}
