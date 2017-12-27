import {Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { VisualizeService } from '../visualization/visualize.service';
import { DirectedGraph } from '../visualization/directed-graph';
import {GraphService} from '../shared/graph.service';
import {GraphModel} from '../models/GraphModel';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of edges"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
            [draggableNode]="node" [draggableInGraph]="graph"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('nodes') nodes;
  @Input('edges') edges;
  graph: DirectedGraph;
  public _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }


  constructor(private d3Service: VisualizeService, private ref: ChangeDetectorRef, private graphService: GraphService) {}

  ngOnInit() {
    this.graph = this.d3Service.getDirectedGraph(this.nodes, this.edges, this.options);

    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });

    this.graphService.graphChanged.subscribe((graph: GraphModel) => {
      console.log('graph changed..');
      this.graph = this.d3Service.getDirectedGraph(graph.nodes.slice(), graph.edges.slice(), this.options);
      this.graph.initSimulation(this.options);
      this.graph.ticker.subscribe((d) => {
        this.ref.markForCheck();
      });
    });
  }

  ngOnDestroy() {
    this.graphService.graphChanged.unsubscribe();
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
