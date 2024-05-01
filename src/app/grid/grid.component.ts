import { Component, Input } from '@angular/core';
import { AnalystCard } from '../models/AnalystCard';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input()
  items: AnalystCard[] = [];

  @Input()
  isLoading = true;
}
