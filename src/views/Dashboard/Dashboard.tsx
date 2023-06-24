import React from 'react'
import Page from 'components/layout/Page'
import HowToPlay from './components/HowToPlay'
import SubHero from './components/SubHero'
import NovaEcosystem from './components/NovaEcosystem'

const Dashboard: React.FC = () => {
  return (
    <Page>
      <SubHero />
      <NovaEcosystem />
      <HowToPlay />
    </Page>
  )
}

export default Dashboard
