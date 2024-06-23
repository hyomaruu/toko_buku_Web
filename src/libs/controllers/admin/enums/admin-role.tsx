export enum UserRole {
  OWNER = "OWNER",
  CASHIER = "CASHIER",
  STAFF = "STAFF",
}

const UserRoleData = [ 
  {
    id: UserRole.OWNER,
    text: "Pemilik"
  },
  {
    id: UserRole.CASHIER,
    text: "Kasir"
  },
  {
    id: UserRole.STAFF,
    text: "Staf"
  },
]

export function findUserRole(role: UserRole){
  return UserRoleData.find((val) => val.id === role)
}
