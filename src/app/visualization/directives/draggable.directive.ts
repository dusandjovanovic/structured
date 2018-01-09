import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { DirectedGraph } from '../directed-graph';
import { VisualizeService } from '../visualize.service';
import { NodeModel } from '../../models/NodeModel';

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode') draggableNode: NodeModel;
  @Input('draggableInGraph') draggableInGraph: DirectedGraph;

  constructor(private d3Service: VisualizeService, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
  }
}
