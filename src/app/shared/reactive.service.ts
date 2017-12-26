import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GraphService} from './graph.service';
import {GraphModel} from '../models/GraphModel';
import {Subject} from 'rxjs/Subject';
import {NodeModel} from '../models/NodeModel';

@Injectable()
export class ReactiveService {

  dataChanged = new Subject<GraphModel>();

  constructor(private http: HttpClient, private graphService: GraphService) {}

  storeData() {

    return this.http.put('https://structured-34291.firebaseio.com/graph.json', this.graphService.getModel(), {
      observe: 'body',
    });
  }

  fetchData() {
    this.http.get<GraphModel>('https://structured-34291.firebaseio.com/graph.json', {
      observe: 'body',
      responseType: 'json',
    }).subscribe(
      (response: GraphModel) => {
        console.log(response);

        console.log('Logger data..');

        const newModel = new GraphModel();
        for (let i = 0; i <= response.lastIndex; i++) {
          newModel.addNode();
        }
        for (const edge of response.edges){
          let src: NodeModel;
          let dst: NodeModel;
          src = edge.source;
          dst = edge.target;
          newModel.addEdge(src.id, dst.id);
        }

        newModel.lastIndex = response.lastIndex;
        this.graphService.lastIndex = newModel.lastIndex;
        this.graphService.updateModel(newModel);
        this.graphService.graphChanged.next(response);
      }
    );
  }
}
