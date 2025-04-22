export interface PaginatedMeta {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
