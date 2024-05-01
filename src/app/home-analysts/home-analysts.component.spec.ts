import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AnalystCard } from '../models/AnalystCard';
import { AnalystsServiceService } from '../services/analysts-service.service';
import { PaginationHelper } from '../services/pagination-opt';
import { PaginationService } from '../services/pagination.service';
import { HomeAnalystsComponent } from './home-analysts.component';

describe('HomeAnalystsComponent', () => {
  let component: HomeAnalystsComponent;
  let fixture: ComponentFixture<HomeAnalystsComponent>;
  let paginationServiceSpy: jest.Mocked<PaginationService>;
  let analystsServiceSpy: jest.Mocked<AnalystsServiceService>;
  const mockData: AnalystCard[] = [
    {
      id: '1',
      name: 'Analyst 1',
      profileURL: '',
      sector: 'Sector 1',
      photoURL: 'URL 1',
    },
    {
      id: '2',
      name: 'Analyst 2',
      profileURL: '',
      sector: 'Sector 2',
      photoURL: 'URL 2',
    },
  ];
  beforeEach(async () => {
    paginationServiceSpy = {
      setItems: jest.fn(),
      getPageableItems: jest.fn(),
      nextPage: jest.fn(),
      previousPage: jest.fn(),
      isFirstPage: jest.fn(),
      isLastPage: jest.fn(),
      updatePageSize: jest.fn(),
    } as unknown as jest.Mocked<PaginationService>;

    analystsServiceSpy = {
      getAnalystData: jest.fn(),
    } as unknown as jest.Mocked<AnalystsServiceService>;

    await TestBed.configureTestingModule({
      declarations: [HomeAnalystsComponent],
      providers: [
        { provide: PaginationService, useValue: paginationServiceSpy },
        { provide: AnalystsServiceService, useValue: analystsServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAnalystsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data successfully', async () => {
    analystsServiceSpy.getAnalystData.mockReturnValue(of(mockData));

    await component.loadService();

    expect(paginationServiceSpy.setItems).toHaveBeenCalledWith(
      mockData,
      PaginationHelper.homeAnalysts()
    );
    expect(component.loading).toBeFalsy();
    expect(component.onError).toBeFalsy();
  });

  it('should handle error during data loading', async () => {
    analystsServiceSpy.getAnalystData.mockImplementation(() => {
      throw new Error();
    });
    await component.loadService();

    expect(component.onError).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should call nextPage', () => {
    component.nextPage();
    expect(paginationServiceSpy.nextPage).toHaveBeenCalled();
  });

  it('should call previousPage', () => {
    component.previousPage();
    expect(paginationServiceSpy.previousPage).toHaveBeenCalled();
  });

  it('should call onResize', () => {
    component.onResize(null);
    expect(paginationServiceSpy.updatePageSize).toHaveBeenCalled();
  });

  it('should call pageableItems', () => {
    component.pageableItems();
    expect(paginationServiceSpy.getPageableItems).toHaveBeenCalled();
  });

  it('should call isLastPage', () => {
    paginationServiceSpy = {
      ...paginationServiceSpy,
      isLastPage: true,
    };
    expect(component.isLastPage).toBeTruthy();
  });

  it('should call isFirstPage', () => {
    paginationServiceSpy = {
      ...paginationServiceSpy,
      isLastPage: true,
    };
    expect(component.isFirstPage).toBeTruthy();
  });
});
