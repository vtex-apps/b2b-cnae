import { GetOrGenerateToken } from '../utils/token'
import { ValidateCnae } from '../utils/cnae'

declare let process: {
    env: {
        VTEX_APP_ID: string
    }
}

export async function validate(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
        clients: { serpro, apps },
    } = ctx

    const { cnpj } = params

    if (cnpj) {
        const appId = process.env.VTEX_APP_ID
        let settings = await apps.getAppSettings(appId)
        let response: any = null
        try {
            ctx.status = 200
            response = await serpro.getCnae(await GetOrGenerateToken(settings.login, settings.password, ctx), cnpj?.toString())
            const { cnae_principal, cnae_secundarias } = response
            ctx.body = ValidateCnae(cnae_principal, cnae_secundarias, parseInt(settings.startOfAcceptedRange), settings.tradePolicyId)
        }
        catch (error) {
            ctx.status = 500
            ctx.body = error
        }
    }
    await next()
}