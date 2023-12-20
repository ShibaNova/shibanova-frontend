import React from 'react'
import styled from 'styled-components'
import { Text, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceNovaBusd, usePricePhxNova } from 'state/hooks'
import { useGetPlayerBattleStatus, useGetPlayerExists } from 'hooks/useNovaria'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getNovaAddress, getPHXAddress } from '../../../utils/addressHelpers'
import { getBalanceNumber } from '../../../utils/formatBalance'
import smallLogo from '../assets/novariaSmallLogo.png'
import tokenLogo from '../assets/NOVA32.png'
import phxLogo from '../assets/phoenix2.png'

export interface HeaderProps {
  battleStatus: boolean
}

const Hero = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 0px;
  padding-top: 10px;
  background: ${(props: HeaderProps) =>
    props.battleStatus === false
      ? 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
      : 'linear-gradient(180deg, rgba(255,0,0,1) 16%, rgba(255,0,0,0) 100%)'};
`

const InfoBlock = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`

const Logo = styled.img`
  object-position: left;
  margin-top: 10px;
`

const ConnectButton = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  color: #5affff;
  background: transparent;
  padding: 5px 10px;
  text-overflow: ellipsis;
  width: 125px;
`

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #5affff;
  color: #5affff;
  background: transparent;
  padding: 5px 10px;
  text-overflow: ellipsis;
  &:hover {
    background: #5affff;
    color: black;
  }
`

const GameHeader = ({ location, playerMineral, playerMineralCapacity, exp, playerName }) => {
  const { account, connect, reset, status } = useWallet()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(connect, reset, account)
  const novaBalance = getBalanceNumber(useTokenBalance(getNovaAddress()))
  const phxBalance = getBalanceNumber(useTokenBalance(getPHXAddress()))
  const novaPriceRaw = usePriceNovaBusd()
  const novaPrice = Number(novaPriceRaw).toFixed(3)
  const phxPrice = (usePricePhxNova().toNumber() * novaPriceRaw.toNumber()).toFixed(3)
  const playerExists = useGetPlayerExists(account)

  const inBattle = useGetPlayerBattleStatus(account)
  const connected = status === 'connected'
  // eslint-disable-next-line prefer-template
  const accountAddress = connected ? account.toString().slice(0, 5) + '...' + account.toString().slice(38, 42) : ''

  return (
    <Hero battleStatus={inBattle}>
      <a href="/legend-of-novaria">
        <Logo src={smallLogo} alt="Novaria Logo" />
      </a>
      <InfoBlock>
        <Text glowing>
          {playerExists ? (
            <span style={{ color: 'gold' }}>{playerName}</span>
          ) : (
            <Button>
              <a href="/legend-of-novaria">Register Here</a>
            </Button>
          )}
        </Text>
        <Text glowing>
          LOCATION: ({location.X}, {location.Y})
        </Text>
        <Text glowing>
          MINERAL:{' '}
          <span style={{ color: 'gold' }}>
            {(playerMineral / 10 ** 18).toFixed(2)} (
            {playerMineralCapacity > 0 ? ((playerMineral / playerMineralCapacity) * 100).toFixed(1) : '0.0'}%)
          </span>
        </Text>
        <Text glowing>
          {playerExists && (
            <span>
              EXP: <span style={{ color: 'gold' }}>{exp}</span>
            </span>
          )}
        </Text>
        <Text glowing>
          <a
            href="https://swap.novadex.finance/#/swap?outputCurrency=0x56E344bE9A7a7A1d27C854628483Efd67c11214F"
            target="_blank"
            rel="noreferrer noopener"
          >
            NOVA: <span style={{ color: 'gold' }}>{novaBalance.toFixed(2)} </span> (+)
          </a>
        </Text>
        <Text glowing>
          <a
            href="https://swap.novadex.finance/#/swap?outputCurrency=0x0F925153230C836761F294eA0d81Cef58E271Fb7"
            target="_blank"
            rel="noreferrer noopener"
          >
            PHX: <span style={{ color: 'gold' }}>{phxBalance.toFixed(2)} </span> (+)
          </a>
        </Text>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <a
            href="https://poocoin.app/tokens/0x56e344be9a7a7a1d27c854628483efd67c11214f"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={tokenLogo} alt="nova logo" style={{ height: 30, margin: 5 }} />
          </a>
          <a
            href="https://coinbrain.com/coins/0x56e344be9a7a7a1d27c854628483efd67c11214f"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text glowing>{novaPrice}</Text>
          </a>
        </div>
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <img src={phxLogo} alt="phx logo" style={{ height: 30, margin: 5 }} />
          <a
            href="https://coinbrain.com/coins/bnb-0x0f925153230c836761f294ea0d81cef58e271fb7"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Text glowing>{phxPrice}</Text>
          </a>
        </div>
        {!connected && <ConnectButton onClick={onPresentConnectModal}>Connect Wallet</ConnectButton>}
        {connected && <ConnectButton onClick={onPresentAccountModal}>{accountAddress}</ConnectButton>}
      </InfoBlock>
    </Hero>
  )
}
export default GameHeader
