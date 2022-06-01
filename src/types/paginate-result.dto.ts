class PaginateResultDTO<T> {
  constructor(data: Array<T>, page: number, total: number) {
    this.data = data;
    this.page = Math.ceil(page);
    this.total = total;
    this.pageCount = data.length;
  }

  data: Array<T>;
  page: number;
  pages: number;
  total: number;
  pageCount: number;
}

export default PaginateResultDTO;
