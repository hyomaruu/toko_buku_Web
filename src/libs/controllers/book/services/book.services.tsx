import { toArrayResponse, toDataResponse,  } from "@toko-buku/libs/transformers";
import { errorResponse  } from "@toko-buku/controllers/global";
import { Book } from "../models/book";

async function getBooks(params: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/buku`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch books");
    }

    const response = await res.json()

    return toArrayResponse(Book, response);
  } catch (error) {
    return toArrayResponse(Book, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function getBook(id: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/buku/${id}`, {cache:"no-store"}
    );

    if (!res.ok) {
      throw new Error("Failed fetch book");
    }
    
    const response = await res.json()

    return toDataResponse(Book, response);
  } catch (error) {
    return toDataResponse(Book, { 
      ...errorResponse,
      message: error
    }) 
  }
}


async function addBook(body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/buku`, 
      {
        method: "POST",
        // headers: {
        //   "Content-Type":"multipart/form-data"
        // },
        body,
      }
    );

    if (!res.ok) {
      throw new Error("Failed add book");
    }

    const response = await res.json()

    return toDataResponse(Book, response);
  } catch (error) {
    return toDataResponse(Book, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function updateBook(book: string, body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/buku/${book}`, 
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed update book");
    }

    const response = await res.json()

    return toDataResponse(Book, response);
  } catch (error) {
    return toDataResponse(Book, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function updateBookStock(book: string, body: any) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/buku/${book}`, 
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed update book stock");
    }

    const response = await res.json()

    return toDataResponse(Book, response);
  } catch (error) {
    return toDataResponse(Book, { 
      ...errorResponse,
      message: error
    }) 
  }
}

async function deleteBook(book: string) {
  try {
    const res = await fetch(
      `${process.env.apiRest}/buku/${book}`, 
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed delete book");
    }

    const response = await res.json()

    return toDataResponse(Book, response);
  } catch (error) {
    return toDataResponse(Book, { 
      ...errorResponse,
      message: error
    }) 
  }
}

export {getBooks, getBook, addBook, updateBook, updateBookStock, deleteBook}

