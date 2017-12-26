import { Component, Input } from '@angular/core';
import { EdgeModel } from '../models/EdgeModel';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line
        class="link"
        [attr.x1]="edge.source.x"
        [attr.y1]="edge.source.y"
        [attr.x2]="edge.target.x"
        [attr.y2]="edge.target.y"
    ></svg:line>
  `,
  styleUrls: ['./edge-visual.component.css']
})
export class EdgeVisualComponent  {
  @Input('linkVisual') edge: EdgeModel;
}
