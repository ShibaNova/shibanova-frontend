import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useGetAllowance, useApprove } from 'hooks/useNovaria'
import { getTreasuryAddress } from 'utils/addressHelpers'
import NovariaTurboContext from 'contexts/NovariaTurboContext'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  background: #11427399;
  border-top: 1px solid #5affff;
  border-bottom: 1px solid #5affff;
  max-height: 50vw;
  text-align: center;
  padding-top: 15px;
`

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
`

const UpdateBanner = () => {
  const [pendingApprove, setPendingApproveTx] = useState(false)

  const turbo = useContext(NovariaTurboContext)
  const treasuryContract = getTreasuryAddress(turbo)
  const allowanceTreasury = useGetAllowance(treasuryContract)
  const treasuryContractApproved = allowanceTreasury === null ? null : allowanceTreasury > 0

  const { onClick } = useApprove()

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

  const handleTreasuryApprove = () => {
    if (pendingApprove) {
      return
    }
    sendApproveTx(treasuryContract)
  }

  if (treasuryContractApproved === null || treasuryContractApproved === true) {
    return null
  }

  return (
    <Wrapper>
      We have made updates to the treasury contract. It requires a new approval before you can continue to the game.
      <Button onClick={handleTreasuryApprove}>
        {!pendingApprove ? 'Approve Treasury Contract' : 'pending approval...'}
      </Button>
    </Wrapper>
  )
}

export default UpdateBanner
