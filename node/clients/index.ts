import { IOClients } from '@vtex/api'

import { Serpro } from './serpro'

export class Clients extends IOClients {
  public get serpro(): Serpro {
    return this.getOrSet('serpro', Serpro)
  }
}
