export default interface ISQLError {
  code: string;
  constraint: string;
  message: string;
  table: string;
}
