import {RoleType} from "../shared/side-navigation-bar/role-type.enum";

export interface Employee{
  id: number
  name: string
  managerId: number
  roleType: RoleType
  availableCredits: number
  usedCredits: number
}
