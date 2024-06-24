export interface IAccessoris {
  Id: string | undefined | null,
  Name: string | undefined | null,
  Image: string | undefined | null,
  Deskripsi: string | undefined | null,
  Harga: number | undefined | null,
  Stok: number | undefined | null
}

export class Accessoris {
  Id: string | undefined | null;
  Name: string | undefined | null;
  Image: string | undefined | null;
  Deskripsi: string | undefined | null;
  Harga: number | undefined | null;
  Stok: number | undefined | null;
}