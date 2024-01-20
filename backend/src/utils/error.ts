export const errorHandler = ( message: string) => {
  const error: Error = new Error();
  error.message = message;
  return error;
}