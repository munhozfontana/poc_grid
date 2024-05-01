export interface PaginationOpt {
  breakpointPixels: number;
  resultPoint: number;
}

export class PaginationHelper {
  static homeAnalysts(): PaginationOpt[] {
    return [
      { breakpointPixels: 1200, resultPoint: 6 },
      { breakpointPixels: 768, resultPoint: 4 },
      { breakpointPixels: 0, resultPoint: 3 },
    ];
  }
}
