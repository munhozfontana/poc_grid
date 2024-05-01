import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';
import { PaginationService } from '../services/pagination.service';
import { HomeAnalystsComponent } from './home-analysts.component';

@NgModule({
  declarations: [HomeAnalystsComponent, GridComponent, CardComponent],
  imports: [CommonModule],
  exports: [HomeAnalystsComponent],
  providers: [PaginationService],
})
export class HomeAnalystsModule {}
