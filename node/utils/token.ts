export async function GetOrGenerateToken(login: string, password: string, ctx: Context) {
    const {
        clients: { serpro },
    } = ctx

    let response: any = null

    try {
        response = await serpro.getToken(login, password)
        if (response.access_token) {
            return response.access_token
        }
        else
            return ''
    } catch (error) {
        console.log('Error generating new token', error)
        return '';
    }
}