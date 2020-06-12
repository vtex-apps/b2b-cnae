# VTEX B2B-CNAE VALIDATION

Allows integration with the SERPRO service, making it possible so the store can inform an CNPJ and receive the CNAE information about it. In addition to that, is possible to configure an allowed CNAE range and the api will inform you if at least one of the CNAES for the CNPJ is allowed.

## Configuration

1. Install this app to your store with:
```sh
vtex install vtex.b2b-adapter@0.x
```
2. Navigate to the configuration portion of the app in `/admin/cnae` and set the SEPRO credentials (**IMPORTANT**:**This is a paid service, contracting and mantaining is the client's responsibility**), start of the allowed CNAE range and the trade policy Id you wish to be returned along with the CNAE information in the API

3. Once configured, the api can be accessed via Graphql with an query like the following
```json
validateCnpj(cnpj:$cnpj){
    allowed
    tradePolicyId
    acceptedCnae{
      code
      description      
    }
}
```

4. The information can also be accessed via http request in the following url
``
https://{{acountName}}.{{environment}}.com/v1/validateCnae/{{cnpj}}
``


