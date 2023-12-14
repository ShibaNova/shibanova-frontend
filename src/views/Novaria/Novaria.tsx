import React, { useState } from 'react'
import NovariaCard from 'views/Dashboard/components/NovariaCard'
import Page from 'components/layout/Page'
import ReactGA from 'react-ga'
import 'react-modal-video/scss/modal-video.scss'

const Novaria: React.FC = () => {
  ReactGA.initialize('UA-206876567-1', { gaOptions: { siteSpeedSampleRate: 100 } })

  return (
    <Page>
      <NovariaCard title="Novaria" />
    </Page>
  )
}

export default Novaria
