import { toArrayResponse, toDataResponse,  } from "@toko-buku/libs/transformers";
import { errorResponse  } from "@toko-buku/controllers/global";
import { Member } from "../models/member";

async function getMembers(params: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/members`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch members");
    }

    const response = await res.json()

    return toArrayResponse(Member, response);
  } catch (error) {
    return toArrayResponse(Member, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function getMember(id: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/members/${id}`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch member");
    }
    
    const response = await res.json()

    return toDataResponse(Member, response);
  } catch (error) {
    return toDataResponse(Member, { 
      ...errorResponse,
      message: error
    }) 
  }
}


async function addMember(body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/members`, 
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed add member");
    }

    const response = await res.json()

    return toDataResponse(Member, response);
  } catch (error) {
    return toDataResponse(Member, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function updateMember(member: string, body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/members/${member}`, 
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed update member");
    }

    const response = await res.json()

    return toDataResponse(Member, response);
  } catch (error) {
    return toDataResponse(Member, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function deleteMember(member: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/members/${member}`, 
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed delete member");
    }

    const response = await res.json()

    return toDataResponse(Member, response);
  } catch (error) {
    return toDataResponse(Member, { 
      ...errorResponse,
      message: error
    }) 
  }
}

export {getMembers, getMember, addMember, updateMember, deleteMember}

