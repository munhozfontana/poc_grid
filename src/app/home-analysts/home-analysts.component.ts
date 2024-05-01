import { Component, HostListener, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AnalystCard } from '../models/AnalystCard';
import { AnalystsServiceService } from '../services/analysts-service.service';
import { PaginationHelper } from '../services/pagination-opt';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-home-analysts',
  templateUrl: './home-analysts.component.html',
  styleUrl: './home-analysts.component.scss',
})
export class HomeAnalystsComponent implements OnInit {
  loading = true;
  onError = false;

  constructor(
    private paginationService: PaginationService,
    private analystsServiceService: AnalystsServiceService
  ) {}

  ngOnInit() {
    this.loadService();
  }

  async loadService() {
    try {
      this.loading = true;
      this.onError = false;

      const result = await firstValueFrom(
        this.analystsServiceService.getAnalystData()
      );

      this.paginationService.setItems(result, PaginationHelper.homeAnalysts());
    } catch (error) {
      console.error(error);
      this.onError = true;
    } finally {
      this.loading = false;
    }
  }

  pageableItems() {
    return this.paginationService.getPageableItems<AnalystCard>();
  }

  nextPage(): void {
    this.paginationService.nextPage();
  }

  previousPage(): void {
    this.paginationService.previousPage();
  }

  get isFirstPage(): boolean {
    return this.paginationService.isFirstPage;
  }

  get isLastPage(): boolean {
    return this.paginationService.isLastPage;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: any) {
    this.paginationService.updatePageSize();
  }
}
