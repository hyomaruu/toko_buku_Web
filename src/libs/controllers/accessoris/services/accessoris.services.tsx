import { toArrayResponse, toDataResponse,  } from "@toko-buku/libs/transformers";
import { errorResponse  } from "@toko-buku/controllers/global";
import { Accessoris } from "../models/accessoris";

async function getAccessories(params: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/aksesoris`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch accessories");
    }

    const response = await res.json()

    return toArrayResponse(Accessoris, response);
  } catch (error) {
    return toArrayResponse(Accessoris, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function getAccessoris(id: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/aksesoris/${id}`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch accessoris");
    }
    
    const response = await res.json()

    return toDataResponse(Accessoris, response);
  } catch (error) {
    return toDataResponse(Accessoris, { 
      ...errorResponse,
      message: error
    }) 
  }
}


async function addAccessoris(body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/aksesoris`, 
      {
        method: "POST",
        body,
      }
    );

    if (!res.ok) {
      throw new Error("Failed add accessoris");
    }

    const response = await res.json()

    return toDataResponse(Accessoris, response);
  } catch (error) {
    return toDataResponse(Accessoris, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function updateAccessoris(accessoris: string, body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/aksesoris/${accessoris}`, 
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed update accessoris");
    }

    const response = await res.json()

    return toDataResponse(Accessoris, response);
  } catch (error) {
    return toDataResponse(Accessoris, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function updateAccessorisStock(accessoris: string, body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/aksesoris/${accessoris}`, 
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed update accessoris stock");
    }

    const response = await res.json()

    return toDataResponse(Accessoris, response);
  } catch (error) {
    return toDataResponse(Accessoris, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function deleteAccessoris(accessoris: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/aksesoris/${accessoris}`, 
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed delete accessoris");
    }

    const response = await res.json()

    return toDataResponse(Accessoris, response);
  } catch (error) {
    return toDataResponse(Accessoris, { 
      ...errorResponse,
      message: error
    }) 
  }
}

export {getAccessories, getAccessoris, addAccessoris, updateAccessoris, updateAccessorisStock, deleteAccessoris}

