import { ServiceContext } from '@vtex/api'

export interface Context extends ServiceContext {
  Clients: Clients
}
