import apiClient from '@/core/api/client'
import type { EventLog } from '../types/eventLog.types'

export async function fetchEventLogsApi(): Promise<EventLog[]> {
  const response = await apiClient.get<EventLog[]>('/event-logs')
  return response.data
}
