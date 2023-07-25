type PageProps<P = {}, S = {}> = {
  params: P;
  searchParams: S;
};

export default PageProps;

export type SearchParams = {
  category?: string;
  status?: string;
  batch?: string;
  tag?: string;
  days?: string;
  startDay?: string;
  endDay?: string;
  problemCategory?: string;
};

export type NextError = { error: Error; reset: () => void };
