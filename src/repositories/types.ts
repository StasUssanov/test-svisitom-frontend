export interface IUseRepository<T, M> {
  data: T;
  mutate: (newData: M) => void;
  error: any;
  isLoading: boolean;
}
