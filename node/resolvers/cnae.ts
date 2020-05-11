import { Apps } from '@vtex/api'
import { GetOrGenerateToken } from '../utils/token'
import { ValidateCnae } from '../utils/cnae'

declare let process: {
  env: {
    VTEX_APP_ID: string
  }
}

const getAppId = (): string => {
  return process.env.VTEX_APP_ID || ''
}

export const queries = {
  getConfig: async (_: any, __: any, ctx: Context) => {
    const {
      clients: { apps },
    } = ctx
    const appId = process.env.VTEX_APP_ID
    const { storeKey, apiUser } = await apps.getAppSettings(appId)
    return {
      storeKey,
      apiUser,
    }
  },
  getSettings: async (_: any, __: any, ctx: Context) => {
    const {
      clients: { apps },
    } = ctx
    return apps.getAppSettings(process.env.VTEX_APP_ID)
  },
  postSettings: async (_: any, args: any, ctx: Context) => {
    const { settings } = args

    try {
      const apps = new Apps(ctx.vtex)
      const app: string = getAppId()
      settings.token = await GetOrGenerateToken(settings.login, settings.password, ctx);
      await apps.saveAppSettings(app, settings)
      return { status: true }
    } catch (error) {
      return { status: false }
    }
  },
  validateCnpj: async (_: any, args: any, ctx: Context) => {
    const { cnpj } = args
    const {
      clients: { serpro, apps },
    } = ctx

    const appId = process.env.VTEX_APP_ID
    let settings = await apps.getAppSettings(appId)
    let response: any = null
    try {
      response = await serpro.getCnae(await GetOrGenerateToken(settings.login, settings.password, ctx), cnpj)
      const { cnae_principal, cnae_secundarias } = response
      return ValidateCnae(cnae_principal, cnae_secundarias, parseInt(settings.startOfAcceptedRange), settings.tradePolicyId)
    }
    catch (error) {
      console.log('Error on validate CNPJ', error)
      return null
    }
  }
}
