import { UserRole } from "../enums/admin-role";

export interface IAdmin {
  Id: number | undefined | null
  Username: string | undefined | null
  Name: string | undefined | null
  Role: UserRole | undefined | null
}

export class Admin {
  Id: number | undefined | null;
  Username: string | undefined | null;
  Name: string | undefined | null;
  Role: UserRole | undefined | null;
}