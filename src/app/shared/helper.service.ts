import {GraphService} from './graph.service';
import {ReactiveService} from './reactive.service';
import {GraphModel} from '../models/GraphModel';
import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {

  constructor(private reactiveService: ReactiveService, private graphService: GraphService) {

    this.reactiveService.dataChanged.subscribe((graph: GraphModel) => {
      this.graphService.updateModel(graph);
    });

  }

  public callFetch() {
    this.reactiveService.fetchData();
  }
}
