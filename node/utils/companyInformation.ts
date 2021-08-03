import {CnaeOutput} from './cnae'

export function FormatInformation(response:any)
{
    var mainCnae: CnaeOutput  = {code: response.cnaePrincipal.codigo, description: response.cnaePrincipal.descricao}
    var legalNature: LegalNature = {code: response.naturezaJuridica.codigo, description: response.naturezaJuridica.descricao}
    var address: Address = {
                            street: response.endereco.logradouro,
                            number: response.endereco.numero,
                            complement: response.endereco.complemento,
                            cep: response.endereco.cep,
                            district: response.endereco.bairro,
                            city: response.endereco.municipio.descricao,
                            state: response.endereco.uf
                            }
    var cadastralSituation: CadastralSituation = {
                                                    code: response.situacaoCadastral.codigo,
                                                    date: response.situacaoCadastral.data,
                                                    motive: response.situacaoCadastral.motivo
                                                }

    var phoneNumbers: PhoneNumber[] = [{ddd: response.telefones[0].ddd, number: response.telefones[0].numero}]

    var secondarieCnaes: CnaeOutput[] = []
    
    response.cnaeSecundarias.forEach((secondarieCnae:any) => {
        let currentCnae: CnaeOutput = {code: secondarieCnae.codigo, description: secondarieCnae.descricao}
        secondarieCnaes.push(currentCnae)       
    });

    var information: CompanyInformation = {
                                            ni: response.ni, 
                                            oppeningDate: response.dataAbertura, 
                                            companyName: response.nomeEmpresarial, 
                                            tradeName: response.nomeFantasia, 
                                            mainCnae, 
                                            legalNature,
                                            address,
                                            specialSituation: response.situacaoEspecial,
                                            cadastralSituation,
                                            establishmentType: response.tipoEstabelecimento,
                                            email: response.correioEletronico,
                                            socialCapital: response.capitalSocial,
                                            size: response.porte,
                                            phoneNumbers,
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
    establishmentType: string
    email: string
    socialCapital: string
    size: string
    phoneNumbers: PhoneNumber[]
    secondarieCnaes: CnaeOutput[]
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