import { ResponseArray } from '@toko-buku/controllers/global';
import { plainToInstance } from 'class-transformer';

export function toArrayResponse<T>(
  model: {
    new (): T;
  },
  response: any
): ResponseArray<T> {
  if(response?.data?.length){
    response = {
      ...response,
      data: plainToInstance(model, response?.data)
    } 

    return response
  }

  response = {
    ...response,
    data: null
  } 

  return response
}