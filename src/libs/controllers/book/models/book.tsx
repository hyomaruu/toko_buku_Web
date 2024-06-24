export interface IBook {
  Id: string | undefined | null,
  Name: string | undefined | null,
  Penerbit: string | undefined | null,
  Image: string | undefined | null,
  Pengarang: string | undefined | null,
  Genre: string | undefined | null,
  Rilis: string | undefined | null,
  Deskripsi: string | undefined | null,
  Harga: number | undefined | null,
  Stok: number | undefined | null
}

export class Book {
  Id: string | undefined | null
  Name: string | undefined | null
  Penerbit: string | undefined | null
  Image: string | undefined | null
  Pengarang: string | undefined | null
  Genre: string | undefined | null
  Rilis: string | undefined | null
  Deskripsi: string | undefined | null
  Harga: number | undefined | null
  Stok: number | undefined | null
}