export interface Options{
    scope:string|undefined;
  }

export interface IResponse<T=null> {
	data?: T
	message?: string
	success?:boolean
	errors?: {
		[key: string]: Array<string>
	  }
  }