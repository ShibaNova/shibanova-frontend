import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import showCountdown from 'utils/countdownTimer'
import { useBoostProduction, useClaimShips, useGetSpaceDock } from 'hooks/useNovaria'
import { ConnectedAccountContext } from 'App'

const SpaceDockMenu = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 1px solid #8c8c8c;
  margin: 10px;
  padding: 10px;
  background-color: #00000080;

  overflow-x: auto;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`

const QueueRow = styled.div`
  display: grid;
  grid-auto-flow: column;
`

const ShipCard = styled.div<{ shipclass: string }>`
  background: ${(props) => props.shipclass === '0' && 'url(/images/novaria/viperQueue.png)'};
  background: ${(props) => props.shipclass === '1' && 'url(/images/novaria/moleQueue.png)'};
  background: ${(props) => props.shipclass === '2' && 'url(/images/novaria/fireflyQueue.png)'};
  background: ${(props) => props.shipclass === '3' && 'url(/images/novaria/viperSwarmQueue.png)'};
  background: ${(props) => props.shipclass === '4' && 'url(/images/novaria/lancerQueue.png)'};
  background: ${(props) => props.shipclass === '5' && 'url(/images/novaria/gorianQueue.png)'};
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 265px;
  width: 195px;
  margin: 10px;
`

const ShipCardStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.75rem;
  gap: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
`

const ClaimControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`

const ClaimInput = styled.input`
  width: 3em;
  padding: 2px;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
`

const ClaimButton = styled.button`
  cursor: pointer;
  margin: 5px 2.5px;
  align-self: center;
  padding: 0.25rem 0.25rem;
  font-family: sans-serif;
  font-size: 0.75rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
  border: none;
  border-radius: 0px 0 10px 0;
  background-color: #5affff;
`

const ClaimMaxButton = styled(ClaimButton)`
  margin: 0;
  margin-bottom: -2px;
  margin-right: 5px;
  padding: 3px;
  font-size: 13px;
`

const CountdownButton = styled.button`
  align-self: center;
  font-family: sans-serif;
  font-size: 0.75rem;
  width: 131px;
  text-decoration: none;
  color: #8c8c8c;
  border: 1px solid #8c8c8c;
  border-radius: 0px;
  background-color: transparent;
`

const WrongLocationButton = styled.button`
  margin: 5px;
  align-self: center;
  padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 0.75rem;

  text-decoration: none;
  color: #5affff;
  border: 1px solid #5affff;
  border-radius: 0px;
  background-color: transparent;
`

const Header = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  width: 100%;
`

const OuterDivFiftyOff = styled.div`
  display: flex;
  flex-direction: column;
`

const Item = styled.div``

const BuildQueue = ({ fleetLocation }) => {
  const account = useContext(ConnectedAccountContext)
  const spaceDocks = useGetSpaceDock(account)
  const { onClaim } = useClaimShips(account)
  const { onBoostProduction } = useBoostProduction(account)

  const [pending, setPendingTx] = useState(false)
  const [claimAmount, setClaimAmount] = useState(null)

  const handleClaim = async (claimId) => {
    setPendingTx(true)
    try {
      await onClaim(claimId, claimAmount)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleBoost = async (dockId) => {
    setPendingTx(true)
    try {
      await onBoostProduction(dockId)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  const handleClaimMax = async (claimId, amount) => {
    setPendingTx(true)
    try {
      await onClaim(claimId, amount)
    } catch (error) {
      console.log('error: ', error)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <SpaceDockMenu>
      <Header>
        BUILD QUEUE <span style={{ fontSize: '.75rem' }}>(Must be at shipyard location to claim ships)</span>
      </Header>
      <QueueRow>
        {spaceDocks.map((dock) => {
          return (
            <ShipCard shipclass={dock.shipClassId}>
              <ShipCardStats>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Item>LOCATION &nbsp;</Item>
                  <Item style={{ zIndex: 1 }}>
                    ({dock.coordX}, {dock.coordY})
                  </Item>
                </Row>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Item>AMOUNT</Item>
                  <Item style={{ zIndex: 1 }}>{dock.amount}</Item>
                </Row>
              </ShipCardStats>

              <ClaimControls>
                {/* eslint-disable-next-line no-nested-ternary */}
                {fleetLocation.X === dock.coordX && fleetLocation.Y === dock.coordY ? (
                  +new Date(dock.completionTime * 1000) - +new Date() < 0 && (
                    <div>
                      <Row>
                        <ClaimMaxButton onClick={() => handleClaimMax(spaceDocks.indexOf(dock), dock.amount)}>
                          {!pending ? 'CLAIM MAX' : 'pending...'}
                        </ClaimMaxButton>
                      </Row>
                      <Item>
                        <ClaimInput
                          type="number"
                          min="0"
                          placeholder="0"
                          value={claimAmount}
                          onChange={(e) => setClaimAmount(parseFloat(e.target.value))}
                        />
                        <ClaimButton onClick={() => handleClaim(spaceDocks.indexOf(dock))}>
                          {!pending ? 'CLAIM' : 'pending...'}
                        </ClaimButton>
                      </Item>
                    </div>
                  )
                ) : (
                  <WrongLocationButton>Not at Shipyard</WrongLocationButton>
                )}
                {dock.completionTime * 1000 > Number(new Date()) && (
                  <OuterDivFiftyOff>
                    <CountdownButton>{showCountdown(new Date(dock.completionTime * 1000))}</CountdownButton>
                    <ClaimButton
                      style={{ width: '131px', margin: '5px 0px', padding: '0.25rem 0rem' }}
                      onClick={() => handleBoost(spaceDocks.indexOf(dock))}
                    >
                      {!pending ? `50% Boost - ${(dock.amount * 0.05).toFixed(2)} PHX` : `pending...`}
                    </ClaimButton>
                  </OuterDivFiftyOff>
                )}
              </ClaimControls>
            </ShipCard>
          )
        })}
      </QueueRow>
    </SpaceDockMenu>
  )
}
export default BuildQueue
