import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {
  useGetAllowance,
  useApprove,
  useInsertCoinHere,
  useGetPlayerExists,
  useGetCostMod,
  useAddReferral,
  useCheckReferralStatus,
} from 'hooks/useNovaria'
import { getFleetAddress, getMapAddress, getTreasuryAddress } from 'utils/addressHelpers'
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import { useHistory } from 'react-router-dom'
import { usePriceNovaBusd } from 'state/hooks'
import { usePHXApprove } from 'hooks/usePhoenixBalance'

const Button = styled.button`
  cursor: pointer;
  margin: 10px;
  align-self: center;
  padding: 0.5rem 1.25rem;
  font-family: sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow: -2px 4px 4px #091243, 0 0 10px #00d0ff, inset 1px 1px 1px white;
  color: #1fffff;
  border: 2px solid;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 2px 1px 4px rgba(0, 0, 0, 0.3), 2px 4px 3px rgba(3, 0, 128, 0.3),
    0 0 7px 2px rgba(0, 208, 255, 0.6), inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 2px 1px 4px rgba(0, 0, 0, 0.3),
    inset 2px 4px 3px rgba(3, 0, 128, 0.3), inset 0 0 7px 2px rgba(0, 208, 255, 0.6);

  &:disabled {
    color: gray;
    border-color: gray;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:hover {
    background: #1fffff;
    color: #0c0b15;
  }
`

const Body = styled.div`
  padding: 10px 0;
  font-size: 1.1rem;
`

const StartMenu = () => {
  const { account } = useWallet()
  const accountAddress = account === null ? '' : account
  const [pending, setPendingTx] = useState(false)
  const [pendingApprove, setPendingApproveTx] = useState(false)
  const [name, setName] = useState('')

  const fleetContract = getFleetAddress()
  const mapContract = getMapAddress()
  const allowanceFleet = useGetAllowance(fleetContract)
  const fleetContractApproved = allowanceFleet === null ? null : allowanceFleet > 0

  const treasuryContract = getTreasuryAddress()
  const allowanceTreasury = useGetAllowance(treasuryContract)
  const treasuryContractApproved = allowanceTreasury === null ? null : allowanceTreasury > 0

  const playerExists = useGetPlayerExists(accountAddress)
  const startCost = 800 / useGetCostMod()
  const startCostBUSD = Number(usePriceNovaBusd()) * startCost

  const history = useHistory()
  const refAddress = window.location.search.slice(5, 47)
  const refStatus = useCheckReferralStatus(account)

  const { onClick } = useApprove()
  const { onPHXApprove } = usePHXApprove()
  const { onCoin } = useInsertCoinHere()
  const { onAdd } = useAddReferral(account, refAddress)

  useEffect(() => {
    ReactGA.initialize('UA-206876567-1', { gaOptions: { siteSpeedSampleRate: 100 } })
  }, [])

  const sendInsertCoinTx = async () => {
    ReactGA.event({
      category: 'Legend of Novaria',
      action: 'Purchase Game',
      label: 'button',
    })
    ReactPixel.trackSingle('964799387574791', 'Purchase', { value: 0.0, currency: 'USD' })
    setPendingTx(true)
    if (refAddress.length > 0 && refStatus !== true) {
      try {
        await onAdd()
      } finally {
        setPendingTx(false)
      }
      setPendingTx(true)
    }
    try {
      await onCoin(name)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const sendApproveTx = async (contract) => {
    setPendingApproveTx(true)
    try {
      await onClick(contract)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingApproveTx(false)
    }
  }

  const sendPHXApproveTx = async (contract) => {
    setPendingApproveTx(true)
    try {
      await onPHXApprove(contract)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingApproveTx(false)
    }
  }

  const handleFleetApprove = () => {
    if (pendingApprove) {
      return
    }
    sendApproveTx(fleetContract)
  }

  const handlePHXFleetApprove = () => {
    if (pendingApprove) {
      return
    }
    sendPHXApproveTx(fleetContract)
  }

  const handlePHXMapApprove = () => {
    if (pendingApprove) {
      return
    }
    sendPHXApproveTx(mapContract)
  }

  const handleTreasuryApprove = () => {
    if (pendingApprove) {
      return
    }
    sendApproveTx(treasuryContract)
  }

  const handleStartGameClick = () => {
    ReactGA.event({
      category: 'Legend of Novaria',
      action: 'start game',
      label: 'button',
    })
    ReactPixel.trackSingle('964799387574791', 'Lead')
    history.push('/overview')
  }

  if (fleetContractApproved === null || treasuryContractApproved === null) {
    return null
  }

  return (
    <Body>
      {(fleetContractApproved && treasuryContractApproved) || 'Step 1 - Approve game contracts'}
      <br />
      {fleetContractApproved || (
        <Button onClick={handleFleetApprove}>
          {!pendingApprove ? 'Approve Fleet Contract' : 'pending approval...'}
        </Button>
      )}
      {treasuryContractApproved || (
        <Button onClick={handleTreasuryApprove}>
          {!pendingApprove ? 'Approve Treasury Contract' : 'pending approval...'}
        </Button>
      )}

      {/*  Eventually this needs to have a confirm popup to make sure name set correctly  */}
      {!playerExists ? (
        <div style={{ marginTop: 10 }}>
          Step 2 - Register your player name <br />
          (name cannot be changed after registration)
          <br />
          <input
            type="text"
            required
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: 5 }}
          />
          <Button onClick={sendInsertCoinTx} disabled={!fleetContractApproved || !treasuryContractApproved || pending}>
            {!pending ? 'Set Player Name' : 'pending...'}
          </Button>
          <div>
            Registration: {startCost} NOVA ~${startCostBUSD.toFixed(2)} (includes 250 ship fleet)
          </div>
        </div>
      ) : (
        ''
      )}
      {playerExists ? <Button onClick={handleStartGameClick}>Start Game</Button> : ''}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Approve the Map and Fleet contract to spend PHX to use BOOSTS</div>
        <div style={{ flexDirection: 'row', gap: '4px' }}>
          <Button onClick={handlePHXFleetApprove}>{!pendingApprove ? 'Approve Fleet' : 'pending approval...'}</Button>
          <Button onClick={handlePHXMapApprove}>{!pendingApprove ? 'Approve Map' : 'pending approval...'}</Button>
        </div>
      </div>
    </Body>
  )
}

export default StartMenu
