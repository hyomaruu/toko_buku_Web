import { toArrayResponse, toDataResponse,  } from "@toko-buku/libs/transformers";
import { errorResponse  } from "@toko-buku/controllers/global";
import { Admin } from "../models/admin";

async function getAdmins(params: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/admins`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch admins");
    }

    const response = await res.json()

    return toArrayResponse(Admin, response);
  } catch (error) {
    return toArrayResponse(Admin, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function getAdmin(id: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/admins/${id}`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch admin");
    }
    
    const response = await res.json()

    return toDataResponse(Admin, response);
  } catch (error) {
    return toDataResponse(Admin, { 
      ...errorResponse,
      message: error
    }) 
  }
}


async function addAdmin(body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/admins`, 
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed add admin");
    }

    const response = await res.json()

    return toDataResponse(Admin, response);
  } catch (error) {
    return toDataResponse(Admin, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function updateAdmin(admin: string, body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/admins/${admin}`, 
      {
        method: "PUT",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed update admin");
    }

    const response = await res.json()

    return toDataResponse(Admin, response);
  } catch (error) {
    return toDataResponse(Admin, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function deleteAdmin(admin: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/admins/${admin}`, 
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed delete admin");
    }

    const response = await res.json()

    return toDataResponse(Admin, response);
  } catch (error) {
    return toDataResponse(Admin, { 
      ...errorResponse,
      message: error
    }) 
  }
}

export {getAdmins, getAdmin, addAdmin, updateAdmin, deleteAdmin}

