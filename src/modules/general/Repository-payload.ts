export interface RepositoryPayload<B, P> {
  body: B | undefined | null; // the structure of the data
  params: P | undefined | null; // params to be passed in
}
