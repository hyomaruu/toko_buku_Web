export interface IMember {
  id_member: number | undefined | null,
  nama_lengkap: string | undefined | null,
  email: string | undefined | null,
  telepon: string | undefined | null,
  alamat: string | undefined | null,
}

export class Member {
  id_member: number | undefined | null
  nama_lengkap: string | undefined | null
  email: string | undefined | null
  telepon: string | undefined | null
  alamat: string | undefined | null
}