export interface IUseRepository<T> {
  data: T;
  error: any;
  isLoading: boolean;
}
