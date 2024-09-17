export interface Service<I, O> {
  execute(input?: I): Promise<O>
}
