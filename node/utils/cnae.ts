export function ValidateCnae(mainCnae: CnaeInput, secondarieCnaes: CnaeInput[], startOfAcceptedRange: number, tradePolicyId: string) {
    var cnae: CnaeOutput = { code: '', description: '' }
    var acceptedCnae: AcceptedCnae = { allowed: false, tradePolicyId: null, acceptedCnae: cnae }

    if (parseInt(mainCnae.codigo) >= startOfAcceptedRange) {
        cnae.code = mainCnae.codigo
        cnae.description = mainCnae.descricao
        acceptedCnae.allowed = true;
        acceptedCnae.tradePolicyId = tradePolicyId
    }
    else if (secondarieCnaes.length > 1) {
        let sortedCnaes = secondarieCnaes.sort((a: CnaeInput, b: CnaeInput) => parseInt(a.codigo) - parseInt(b.codigo))
        let firstValidCnae = sortedCnaes.find((secondarieCnae: CnaeInput) => parseInt(secondarieCnae.codigo) >= startOfAcceptedRange)
        cnae.code = firstValidCnae ? firstValidCnae.codigo : ''
        cnae.description = firstValidCnae ? firstValidCnae.descricao : ''
        acceptedCnae.tradePolicyId = tradePolicyId
        acceptedCnae.allowed = firstValidCnae ? true : false;
    }

    return acceptedCnae
}

export interface CnaeInput {
    codigo: string
    descricao: string
}

export interface CnaeOutput {
    code: string
    description: string
}

export interface AcceptedCnae {
    allowed: boolean
    tradePolicyId: string | null
    acceptedCnae: CnaeOutput
}

