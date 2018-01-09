import {NodeModel} from './NodeModel';

export class EdgeModel implements d3.SimulationLinkDatum<NodeModel> {

  public source: number;
  public target: number;

  constructor(source: number, target: number) {
    this.source = source;
    this.target = target;
  }

}
