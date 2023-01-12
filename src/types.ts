export type CompanyType = {
  id: string,
  title: string,
  numberOfPeople: number,
  address: string,
  employees: EmployeeType[],
}

export type NewCompanyType = {
  title: string,
  address: string,
}

export type CompanyStateType = {
  companies: CompanyType[],
}

export type EmployeeType = {
  id: string,
  surname: string,
  name: string,
  position: string,
}