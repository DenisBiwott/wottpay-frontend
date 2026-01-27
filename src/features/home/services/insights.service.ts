// Insights API service
import apiClient from '@/core/api/client'
import type { Insights } from '../types/insights.types'

export async function fetchInsightsApi(): Promise<Insights> {
  const response = await apiClient.get<Insights>('/insights')
  return response.data
}
