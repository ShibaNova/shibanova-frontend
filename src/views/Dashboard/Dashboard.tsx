import React from 'react'
import Page from 'components/layout/Page'
import HowToPlay from './components/HowToPlay'
import NovaEcosystem from './components/NovaEcosystem'
import NovariaCard from './components/NovariaCard'

const Dashboard: React.FC = () => {
  return (
    <Page>
      <NovariaCard title="Novaria" />
      <NovaEcosystem />
      {/* <HowToPlay /> */}
    </Page>
  )
}

export default Dashboard
