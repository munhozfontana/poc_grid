import { Injectable } from '@angular/core';
import { PaginationOpt } from './pagination-opt';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public currentPage: number = 1;
  public pageSize: number = 0;
  public items: any[] = [];
  public pageSizeOptions: PaginationOpt[] = [];

  /**
   * Define os itens a serem paginados.
   * @param items Os itens a serem paginados.
   * @param pageSizeOptions As opções de tamanho de página.
   */
  setItems(items: any[], pageSizeOptions: PaginationOpt[]): void {
    this.pageSizeOptions = pageSizeOptions;
    this.items = items;
    this.updatePageSize();
  }

  /**
   * Atualiza o tamanho da página com base nas opções fornecidas.
   */
  updatePageSize(): void {
    const screenWidth = window.innerWidth;
    const option = this.pageSizeOptions.find(
      (option) => screenWidth >= option.breakpointPixels
    );
    this.pageSize = option ? option.resultPoint : this.pageSize;
    this.currentPage = 1;
  }

  /**
   * Retorna os itens da página atual.
   * @returns Os itens da página atual.
   */
  getPageableItems<T>(): T[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.items.length);
    return this.items.slice(startIndex, endIndex);
  }

  /**
   * Avança para a próxima página.
   */
  nextPage(): void {
    if (this.currentPage < this.getPageCount()) {
      this.currentPage++;
    }
  }

  /**
   * Retrocede para a página anterior.
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Retorna o número total de páginas.
   * @returns O número total de páginas.
   */
  getPageCount(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  /**
   * Retorna o número da página atual.
   * @returns O número da página atual.
   */
  getCurrentPage(): number {
    return this.currentPage;
  }

  /**
   * Verifica se a página atual é a primeira página.
   * @returns Verdadeiro se a página atual for a primeira, caso contrário, falso.
   */
  get isFirstPage(): boolean {
    return this.getCurrentPage() === 1;
  }

  /**
   * Verifica se a página atual é a última página.
   * @returns Verdadeiro se a página atual for a última, caso contrário, falso.
   */
  get isLastPage(): boolean {
    return this.currentPage === this.getPageCount();
  }
}
