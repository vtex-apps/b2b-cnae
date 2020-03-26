import { useQuery, useApolloClient } from 'react-apollo'
import React, { FC, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, Checkbox, Input, Button } from 'vtex.styleguide'

import getSettings from './queries/getSettings.gql'
import postSettings from './queries/postSettings.gql'

import './styles.global.css'

const Configuration: FC = () => {
  const { data } = useQuery(getSettings)
  const client = useApolloClient()

  const [settings, setSettings] = useState<Settings>({
    login: '',
    password: '',
    isMandatoryForCompany: false,
    startOfAcceptedRange: '',
    tradePolicyId: '',
  })

  useEffect(() => {
    if (data) {
      setSettings(data.getSettings)
    }
  }, [data])

  if (!data) {
    return null
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    client
      .query({
        query: postSettings,
        variables: {
          settings,
        },
      })
      .then((result: any) => {
        if (result.data.postSettings) {
          alert('Temp Message: Atualizado com sucesso')
        }
      })
  }
  return (
    <Layout>
      <PageBlock variation="full">
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <h4 className="t-heading-4 mt0">
              <FormattedMessage id="b2b-cnae.layout.configuration-title" />
            </h4>
            <div className="mb5">
              <Input
                label={
                  <FormattedMessage id="b2b-cnae.layout.configuration-login" />
                }
                value={settings.login}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSettings({ ...settings, login: e.target.value })
                }}
              />
            </div>
            <div className="mb5">
              <Input
                label={
                  <FormattedMessage id="b2b-cnae.layout.configuration-password" />
                }
                value={settings.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSettings({ ...settings, password: e.target.value })
                }}
              />
            </div>
            <div className="mb5">
              <Checkbox
                label={
                  <FormattedMessage id="b2b-cnae.layout.configuration-isMandatory" />
                }
                checked={settings.isMandatoryForCompany}
                onChange={() => {
                  setSettings({
                    ...settings,
                    isMandatoryForCompany: !settings.isMandatoryForCompany,
                  })
                }}
                value="false"
                id="isMandatoryForCompany"
              />
            </div>
            <div className="mb5">
              <Input
                label={
                  <FormattedMessage id="b2b-cnae.layout.configuration-beginRange" />
                }
                value={settings.startOfAcceptedRange}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSettings({
                    ...settings,
                    startOfAcceptedRange: e.target.value,
                  })
                }}
              />
            </div>
            <div className="mb5">
              <Input
                label={
                  <FormattedMessage id="b2b-cnae.layout.configuration-tradePolicy" />
                }
                value={settings.tradePolicyId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSettings({ ...settings, tradePolicyId: e.target.value })
                }}
              />
            </div>
            <Button type="submit">
              <FormattedMessage id="b2b-cnae.layout.configuration-submit" />
            </Button>
          </div>
        </form>
      </PageBlock>
    </Layout>
  )
}

export default Configuration

export interface Settings {
  login: string
  password: string
  isMandatoryForCompany: boolean
  startOfAcceptedRange: string
  tradePolicyId: string
}
