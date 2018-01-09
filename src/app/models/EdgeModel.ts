import {NodeModel} from './NodeModel';

export class EdgeModel implements d3.SimulationLinkDatum<NodeModel> {

  public source: NodeModel;
  public target: NodeModel;

  constructor(source: NodeModel, target: NodeModel) {
    this.source = source;
    this.target = target;
  }

}
