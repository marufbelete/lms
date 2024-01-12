export interface IError extends Error {
  status: number;
}

const handleError = (msg:string, status:number) => {
  const error = new Error(msg) as IError;
  error.status = status;
  throw error;
};

export{
  handleError,
};
