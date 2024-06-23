import { Response } from '@toko-buku/controllers/global';
import { plainToInstance } from 'class-transformer';

export function toDataResponse<T>(
  model: {
    new (): T;
  },
  response: any
): Response<T> {
  if(response?.data){
    response = {
      ...response,
      data: plainToInstance(model, response?.data)
    } 
  }

  return response
}