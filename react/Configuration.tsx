import React, { FC, useState, useEffect } from 'react'
import { useQuery, useApolloClient } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import {
  Layout,
  PageHeader,
  PageBlock,
  Checkbox,
  Input,
  InputPassword,
  Button,
  ToastConsumer,
  ToastProvider,
} from 'vtex.styleguide'

import getSettings from './queries/getSettings.gql'
import postSettings from './queries/postSettings.gql'

import './styles.global.css'

const Configuration: FC = () => {
  const { data } = useQuery(getSettings)
  console.log(data);
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
    return client
      .query({
        query: postSettings,
        variables: {
          settings,
        },
      })
      .then((result: any) => {
        if (result.data.postSettings.status) {
          return {
            message: (
              <FormattedMessage id="admin/b2b-cnae.layout.configuration-success" />
            ),
          }
        }
        return {
          message: (
            <FormattedMessage id="admin/b2b-cnae.layout.configuration-failure" />
          ),
        }
      })
  }
  return (
    <ToastProvider>
      <Layout>
        <PageHeader
          title={<FormattedMessage id="admin/b2b-cnae.layout.title" />}
          subtitle={
            <FormattedMessage id="admin/b2b-cnae.layout.configuration-title" />
          }
        />
        <PageBlock variation="full">
          <ToastConsumer>
            {({ showToast }: { showToast: any }) => (
              <form
                onSubmit={e =>
                  handleSubmit(e).then(result => showToast(result))
                }
              >
                <div>
                  <div className="mb5">
                    <Input
                      label={
                        <FormattedMessage id="admin/b2b-cnae.layout.configuration-login" />
                      }
                      value={settings.login}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSettings({ ...settings, login: e.target.value })
                      }}
                    />
                  </div>
                  <div className="mb5">
                    <InputPassword
                      label={
                        <FormattedMessage id="admin/b2b-cnae.layout.configuration-password" />
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
                        <FormattedMessage id="admin/b2b-cnae.layout.configuration-isMandatory" />
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
                        <FormattedMessage id="admin/b2b-cnae.layout.configuration-beginRange" />
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
                        <FormattedMessage id="admin/b2b-cnae.layout.configuration-tradePolicy" />
                      }
                      value={settings.tradePolicyId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSettings({
                          ...settings,
                          tradePolicyId: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <Button type="submit">
                    <FormattedMessage id="admin/b2b-cnae.layout.configuration-submit" />
                  </Button>
                </div>
              </form>
            )}
          </ToastConsumer>
        </PageBlock>
      </Layout>
    </ToastProvider>
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
