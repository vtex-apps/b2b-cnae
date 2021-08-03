import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export class Serpro extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://gateway.apiserpro.serpro.gov.br/', context, options)
  }

  public getToken = (appKey: string, appToken: string) =>
    this.http.post('token', `grant_type=client_credentials`, {
      headers: {
        'Proxy-Authorization': this.context.authToken,
        'X-Vtex-Use-Https': true,
        Authorization: `Basic ${Buffer.from(`${appKey}:${appToken}`).toString(
          'base64'
        )}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
    })

  public getCnae = (bearerToken: string, cnpj: string) =>
    this.http.get(`consulta-cnpj/v1/cnpj/${cnpj}`, {
      headers: {
        'Proxy-Authorization': this.context.authToken,
        'X-Vtex-Use-Https': true,
        Authorization: `Bearer ${bearerToken}`,
        'content-type': 'application/json',
      },
    })
}
