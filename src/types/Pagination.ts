export type Pagination<T> = {
  res: T[];
  total: number;
  limit: number;
  page: number;
  maxPage: number;
};
