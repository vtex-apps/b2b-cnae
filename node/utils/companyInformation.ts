import {CnaeOutput} from './cnae'

export function FormatInformation(response:any)
{
    var mainCnae: CnaeOutput  = {code: response.cnae_principal.codigo, description: response.cnae_principal.descricao}
    var legalNature: LegalNature = {code: response.natureza_juridica.codigo, description: response.natureza_juridica.descricao}
    var address: Address = {
                            street: response.endereco.logradouro,
                            number: response.endereco.numero,
                            complement: response.endereco.complemento,
                            cep: response.endereco.cep,
                            district: response.endereco.bairro,
                            city: response.endereco.municipio,
                            state: response.endereco.uf
                            }
    var cadastralSituation: CadastralSituation = {
                                                    code: response.situacao_cadastral.codigo,
                                                    date: response.situacao_cadastral.data,
                                                    motive: response.situacao_cadastral.motivo
                                                }

    var phoneNumbers: PhoneNumber[] = [{ddd: response.telefones[0].ddd, number: response.telefones[0].numero}]

    var secondarieCnaes: CnaeOutput[] = []
    
    response.cnae_secundarias.forEach((secondarieCnae:any) => {
        let currentCnae: CnaeOutput = {code: secondarieCnae.codigo, description: secondarieCnae.descricao}
        secondarieCnaes.push(currentCnae)    
    });

    var information: CompanyInformation = {
                                            ni: response.ni, 
                                            oppeningDate: response.data_abertura, 
                                            companyName: response.nome_empresarial, 
                                            tradeName: response.nome_fantasia, 
                                            mainCnae, 
                                            legalNature,
                                            address,
                                            specialSituation: response.situacao_especial,
                                            cadastralSituation,
                                            agency: response.orgao,
                                            establishmentType: response.tipo_estabelecimento,
                                            email: response.correio_eletronico,
                                            socialCapital: response.capital_social,
                                            size: response.porte,
                                            phoneNumbers,
                                            agencyName: response.nome_orgao,
                                            federativeEntity: response.ente_federativo,
                                            secondarieCnaes
                                        }
    
    return information
}




export interface CompanyInformation{
    ni: string
    oppeningDate: string
    companyName: string
    tradeName: string
    mainCnae: CnaeOutput
    legalNature: LegalNature
    address: Address
    specialSituation: string
    cadastralSituation: CadastralSituation
    agency: string    
    establishmentType: string
    email: string
    socialCapital: string
    size: string
    phoneNumbers: PhoneNumber[]
    secondarieCnaes: CnaeOutput[]
    agencyName: String
    federativeEntity: String
}

interface LegalNature {
    code: string,
    description: string
}

interface Address{
    street: string
    number: string
    complement: string
    cep: string
    district: string
    city: string
    state: string
}

interface CadastralSituation {
    code: string
    date: string
    motive: string
}
  
interface PhoneNumber {
    ddd: string
    number: string
}