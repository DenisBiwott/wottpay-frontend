// People type definitions

export interface Person {
  id: string
  email: string
  role: string
  isTotpEnabled: boolean
}

export interface PeopleResponse {
  data: Person[]
  total: number
  page: number
  limit: number
}
