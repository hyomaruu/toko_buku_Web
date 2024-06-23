export interface Response<T> {
  data: T | undefined | null;
  code: number | undefined | null;
  message: string | undefined | null;
  status: string | null;
}

export interface ResponseArray<T> {
  data: T[] | undefined | null;
  code: number | undefined | null;
  message: string | undefined | null;
  status: string | null;
}

export let errorResponse = {
  data: null,
  status: null,
  message: null,
  code: null
}