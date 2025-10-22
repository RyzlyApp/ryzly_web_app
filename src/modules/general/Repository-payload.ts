export interface RepositoryPayload<B, P> {
  body: B | any; // the structure of the data
  params: P | any; // params to be passed in
}
