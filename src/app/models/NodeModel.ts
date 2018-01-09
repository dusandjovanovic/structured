import APP_CONFIG from '../app.config';

export class NodeModel implements d3.SimulationNodeDatum {

  public id: number;
  public linkCount: number;

  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;

  constructor(id: number) {
    this.id = id;
    this.linkCount = 0;
  }

  public addEdge() {
    this.linkCount++;
  }

  public getId() {
    return this.id;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 10;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    const index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}
