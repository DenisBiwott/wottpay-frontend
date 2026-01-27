// People API service
import apiClient from '@/core/api/client'
import type { PeopleResponse } from '../types/people.types'

export async function fetchPeopleApi(): Promise<PeopleResponse> {
  const response = await apiClient.get<PeopleResponse>('/users')
  return response.data
}
