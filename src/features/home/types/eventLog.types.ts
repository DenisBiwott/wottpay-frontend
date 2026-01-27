export interface EventLog {
  id: string
  action: string
  metadata: { email?: string; [key: string]: unknown }
  createdAt: string
}
