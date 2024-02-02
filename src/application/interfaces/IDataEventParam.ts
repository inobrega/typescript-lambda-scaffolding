interface IQueryStringParams {
  [name: string]: string | undefined;
}
export interface IDataEventParam {
  body?: string;
  query?: IQueryStringParams;
}
