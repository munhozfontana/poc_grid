import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;
  const list = [
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
    { id: '1' },
  ];

  const paginationOptions = [
    { breakpointPixels: 1200, resultPoint: 6 },
    { breakpointPixels: 768, resultPoint: 4 },
    { breakpointPixels: 0, resultPoint: 3 },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationService],
    });
    service = TestBed.inject(PaginationService);
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setItems', () => {
    service.setItems(list, paginationOptions);

    expect(service.items).toHaveLength(14);
    expect(service.pageSizeOptions).toHaveLength(3);
    expect(service.pageSize).toEqual(3);
  });

  it('getPageableItems', () => {
    service.setItems(list, paginationOptions);
    expect(service.getPageableItems()).toHaveLength(3);
  });

  it('getPageableItems', () => {
    service.setItems(list, paginationOptions);
    expect(service.getPageableItems()).toHaveLength(3);
  });

  it('nextPage', () => {
    service.setItems(list, paginationOptions);
    service.nextPage();
    expect(service.currentPage).toEqual(2);
  });

  it('previousPage', () => {
    service.setItems(list, paginationOptions);
    service.nextPage();
    service.previousPage();
    expect(service.currentPage).toEqual(1);
  });

  it('getPageCount', () => {
    service.setItems(list, paginationOptions);
    expect(service.getPageCount()).toEqual(5);
  });

  it('isFirstPage', () => {
    service.setItems(list, paginationOptions);
    expect(service.isFirstPage).toBeTruthy();
  });

  it('isLastPage', () => {
    service.setItems(list, paginationOptions);
    service.nextPage();
    service.nextPage();
    service.nextPage();
    service.nextPage();
    expect(service.isLastPage).toBeTruthy();
  });
});
