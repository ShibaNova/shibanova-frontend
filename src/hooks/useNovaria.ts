import { useEffect, useState, useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {
  buildShips,
  claimShips,
  insertCoinHere,
  mine,
  refine,
  collect,
  travel,
  novaApprove,
  goBattle,
  enterBattle,
  explore,
  recall,
  initiateShipyardTakeover,
  completeShipyardTakeover,
  setShipyardName,
  changeName,
  setShipyardFeePercent,
  tunnel,
  addReferral,
  getReferralBonus,
  setRecall,
} from 'utils/callHelpers'
import BigNumber from 'bignumber.js'
import { useFleet, useMap, useNova, useReferrals, useTreasury } from './useContract'
import useRefresh from './useRefresh'

// ~~~Fleet contract functions~~~
// player setup and current ships, building ships, combat

// Active functions

export const useInsertCoinHere = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleInsertCoinHere = useCallback(
    async (name: string) => {
      const txHash = await insertCoinHere(useFleetContract, name, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onCoin: handleInsertCoinHere }
}

export const useBuildShips = (player: string) => {
  const useFleetContract = useFleet()

  const handleBuildShips = useCallback(
    async (x: string, y: string, classId: string, amount: number, buildCost) => {
      const txHash = await buildShips(
        useFleetContract,
        x,
        y,
        classId,
        amount,
        new BigNumber(buildCost * 10 ** 18).toString(),
        player,
      )

      console.info(txHash)
    },
    [player, useFleetContract],
  )
  return { onBuild: handleBuildShips }
}

export const useClaimShips = (player: string) => {
  const useFleetContract = useFleet()

  const handleClaimShips = useCallback(
    async (dockId: string, amount: string) => {
      const txHash = await claimShips(useFleetContract, dockId, amount, player)
      console.info(txHash)
    },
    [player, useFleetContract],
  )
  return { onClaim: handleClaimShips }
}

export const useShipyardTakeover = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleClaimShips = useCallback(
    async (x: number, y: number) => {
      const txHash = await initiateShipyardTakeover(useFleetContract, x, y, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onTakeover: handleClaimShips }
}

export const useCompleteShipyardTakeover = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleClaimShips = useCallback(
    async (x: number, y: number) => {
      const txHash = await completeShipyardTakeover(useFleetContract, x, y, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onCompleteTakeover: handleClaimShips }
}

// mission options: ATTACK (1), DEFEND (2). target is address
export const useEnterBattle = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleEnterBattle = useCallback(
    async (target: string, mission: number) => {
      const txHash = await enterBattle(useFleetContract, target, mission, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onEnterBattle: handleEnterBattle }
}

// function to initiate a battle after time expires
export const useGoBattle = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleGoBattle = useCallback(
    async (battleId: number) => {
      const txHash = await goBattle(useFleetContract, battleId, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onBattle: handleGoBattle }
}

export const useSetShipyardName = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleSetShipyardName = useCallback(
    async (x: number, y: number, name: string) => {
      const txHash = await setShipyardName(useFleetContract, x, y, name, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onShipyardChange: handleSetShipyardName }
}

export const useSetShipyardFee = () => {
  const { account } = useWallet()
  const useFleetContract = useFleet()

  const handleSetShipyardFee = useCallback(
    async (x: number, y: number, amount: number) => {
      const txHash = await setShipyardFeePercent(useFleetContract, x, y, amount, account)
      console.info(txHash)
    },
    [account, useFleetContract],
  )
  return { onShipyardFeeChange: handleSetShipyardFee }
}

// ***View functions***

export const useGetShipClasses = () => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [shipClasses, setShipClasses] = useState([])

  useEffect(() => {
    async function fetchshipClasses() {
      const data = await fleetContract.methods.getShipClasses().call()
      setShipClasses(data)
    }

    fetchshipClasses()
  }, [fleetContract, fastRefresh])
  return shipClasses
}

export const useGetBuildTime = (shipId: number, amount: number) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [BuildTime, setBuildTime] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getBuildTime(shipId, amount).call()
      setBuildTime(data)
    }
    fetch()
  }, [shipId, amount, fleetContract, fastRefresh])
  return BuildTime
}

export const useGetShipyards = () => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [shipyards, setShipyards] = useState([])

  useEffect(() => {
    async function fetchShipyards() {
      const data = await fleetContract.methods.getShipyards().call()
      setShipyards(data)
    }
    fetchShipyards()
  }, [fleetContract, fastRefresh])
  return shipyards
}

export const useGetSpaceDock = (player: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [spaceDock, setSpaceDock] = useState([])

  useEffect(() => {
    async function fetchSpaceDock() {
      const data = await fleetContract.methods.getPlayerSpaceDocks(player).call()
      setSpaceDock(data)
    }
    fetchSpaceDock()
  }, [player, fleetContract, fastRefresh])
  return spaceDock
}

export const useGetShips = (fleet: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [ships, setShips] = useState([])

  useEffect(() => {
    async function fetchShips() {
      const data = await fleetContract.methods.getShips(fleet).call()
      setShips(data)
    }
    fetchShips()
  }, [fleet, fleetContract, fastRefresh])
  return ships
}

export const useGetFleetSize = (fleet: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [fleetSize, setFleetSize] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getFleetSize(fleet).call()
      setFleetSize(data)
    }
    fetch()
  }, [fleet, fleetContract, fastRefresh])
  return fleetSize
}

export const useGetMaxFleetSize = (fleet: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [maxFleetSize, setMAxFleetSize] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMaxFleetSize(fleet).call()
      setMAxFleetSize(data)
    }
    fetch()
  }, [fleet, fleetContract, fastRefresh])
  return maxFleetSize
}

export const useGetFleetMineral = (fleet: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [fleetMineral, setFleetMineral] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMineral(fleet).call()
      setFleetMineral(data)
    }
    fetch()
  }, [fleet, fleetContract, fastRefresh])
  return fleetMineral
}

export const useGetMaxMineralCapacity = (fleet: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [maxMineralCapacity, setMaxMineralCapacity] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMineralCapacity(fleet).call()
      setMaxMineralCapacity(data)
    }
    fetch()
  }, [fleet, fleetContract, fastRefresh])
  return maxMineralCapacity
}

export const useGetMiningCapacity = (fleet: string) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [miningCapacity, setMiningCapacity] = useState('')

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getMiningCapacity(fleet).call()
      setMiningCapacity(data)
    }
    fetch()
  }, [fleet, fleetContract, fastRefresh])
  return miningCapacity
}

// returns list of battle IDs at a location
export const useGetBattlesAtLocation = (x: any, y: any, startTime: number, endTime: number) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [battlesAtLocation, setBattlesAtLocation] = useState([])

  useEffect(() => {
    async function fetch() {
      if (x !== null) {
        const data = await fleetContract.methods.getBattlesAtLocation(x, y, startTime, endTime).call()
        setBattlesAtLocation(data)
      }
    }
    fetch()
  }, [x, y, startTime, endTime, fleetContract, fastRefresh])
  return battlesAtLocation
}

// returns battle info
export const useGetBattle = (Id: number) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [battle, setBattle] = useState({
    attackTeam: [],
    defendTeam: [],
    deadline: 0,
    coordX: 0,
    coordY: 0,
    resolvedTime: 0,
    attackers: [],
    defenders: [],
  })

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.battles(Id).call()
      setBattle({
        attackTeam: data[4],
        defendTeam: data[5],
        deadline: data[1],
        coordX: data[2],
        coordY: data[3],
        resolvedTime: data[0],
        attackers: data[4][0],
        defenders: data[5][0],
      })
    }
    fetch()
  }, [Id, fleetContract, fastRefresh])
  return battle
}

// returns battle info of player
export const useGetPlayerBattle = (player) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [PlayerBattle, setPlayerBattle] = useState({ battleStatus: 0, battleId: null })

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getPlayerBattleInfo(player).call()
      setPlayerBattle({
        battleStatus: data[0],
        battleId: data[1],
      })
    }
    fetch()
  }, [player, fleetContract, fastRefresh])
  return PlayerBattle
}

export const useGetPlayerBattleStatus = (player) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [PlayerBattleStatus, setPlayerBattleStatus] = useState(false)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.isInBattle(player).call()
      setPlayerBattleStatus(data)
    }
    fetch()
  }, [player, fleetContract, fastRefresh])
  return PlayerBattleStatus
}

export const useGetAttackPower = (fleet) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [attackPower, setAttackPower] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getAttackPower(fleet).call()
      setAttackPower(data)
    }
    fetch()
  }, [fleet, fleetContract, fastRefresh])
  return attackPower
}

export const useGetPlayer = (player) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [Player, setPlayer] = useState({
    name: '',
    address: '',
    experience: 0,
    battleId: null,
    mineral: 0,
    battleStatus: 0,
  })

  useEffect(() => {
    async function fetch() {
      if (player !== null) {
        const playerId = await fleetContract.methods.addressToPlayer(player).call()
        const data = await fleetContract.methods.players(playerId).call()
        setPlayer({
          name: data[0],
          address: data[1],
          experience: data[2],
          battleId: data[3],
          mineral: data[4],
          battleStatus: data[5],
        })
      }
    }
    fetch()
  }, [player, fleetContract, fastRefresh])
  return Player
}

export const useGetNameByAddress = (player) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetch() {
      if (player === '0x0000000000000000000000000000000000000000') {
        setName(' ')
      } else if (player === null) {
        setName(' ')
      } else if (player === '') {
        setName(' ')
      } else {
        const id = await fleetContract.methods.addressToPlayer(player).call()
        const data = await fleetContract.methods.players(id).call()
        setName(data[0])
      }
    }
    fetch()
  }, [player, fleetContract, fastRefresh])
  return name
}

export const useGetPlayerExists = (player) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [PlayerExists, setPlayerExists] = useState(false)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.playerExists(player).call()
      setPlayerExists(data)
    }
    fetch()
  }, [player, fleetContract, fastRefresh])
  return PlayerExists
}

export const useGetDockCost = (shipClassId: number, amount: number) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [DockCost, setDockCost] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.playerExists(shipClassId, amount).call()
      setDockCost(data)
    }
    fetch()
  }, [shipClassId, amount, fleetContract, fastRefresh])
  return DockCost
}

export const useGetPlayerInBattle = (account) => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [playerInBattle, setPlayerInBattle] = useState(false)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.isInBattle(account).call()
      setPlayerInBattle(data)
    }
    fetch()
  }, [account, fleetContract, fastRefresh])
  return playerInBattle
}

// ~~~Map contract functions~~~
// Movement, mining, refining, tracks mineral
// Active Functions

export const useSetRecall = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleSetRecall = useCallback(
    async () => {
      const txHash = await setRecall(useMapContract, account)
      console.info(txHash)
    }, [account, useMapContract]
  )
  return { onSetRecall: handleSetRecall }
}

export const useTunnel = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleTunnel = useCallback(
    async (x: number, y: number) => {
      const txHash = await tunnel(useMapContract, x, y, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onTunnel: handleTunnel }
}

export const useMine = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleMine = useCallback(async () => {
    const txHash = await mine(useMapContract, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onMine: handleMine }
}

export const useRefine = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleRefine = useCallback(async () => {
    const txHash = await refine(useMapContract, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onRefine: handleRefine }
}

export const useCollect = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleCollect = useCallback(async () => {
    const txHash = await collect(useMapContract, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onCollect: handleCollect }
}

export const useTravel = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleTravel = useCallback(
    async (x: number, y: number) => {
      const txHash = await travel(useMapContract, x, y, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onTravel: handleTravel }
}

export const useExplore = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleExplore = useCallback(
    async (x: number, y: number) => {
      const txHash = await explore(useMapContract, x, y, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onExplore: handleExplore }
}

export const useChangeName = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleChangeName = useCallback(
    async (x: number, y: number, name: string) => {
      const txHash = await changeName(useMapContract, x, y, name, account)
      console.info(txHash)
    },
    [account, useMapContract],
  )
  return { onChange: handleChangeName }
}

export const useRecall = () => {
  const { account } = useWallet()
  const useMapContract = useMap()

  const handleRecall = useCallback(async (haven: boolean) => {
    const txHash = await recall(useMapContract, haven, account)
    console.info(txHash)
  }, [account, useMapContract])
  return { onRecall: handleRecall }
}

// ***View Functions***

export const useGetSavedSpawnPlace = (account) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [savedPlace, setSavedPlace] = useState({x: 0, y: 0})

  useEffect(() => {
    async function fetch() {
      const placeId = await mapContract.methods.fleetLastShipyardPlace(account).call()
      const place = await mapContract.methods.places(placeId).call()
      setSavedPlace({x: place.coordX, y: place.coordY})
    } fetch()
  }, [account, mapContract, fastRefresh])
  return savedPlace
}

export const useGetPlayerCount = () => {
  const fleetContract = useFleet()
  const { fastRefresh } = useRefresh()
  const [playerCount, setPlayerCount] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await fleetContract.methods.getPlayerCount().call()
      setPlayerCount(data)
    }
    fetch()
  }, [fleetContract, fastRefresh])
  return playerCount
}

export const useGetFleetMineralRefined = (account) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [mineralRefined, setmineralRefined] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.fleetMineralRefined(account).call()
      setmineralRefined(data)
    }
    fetch()
  }, [account, mapContract, fastRefresh])
  return mineralRefined
}

export const useGetFleetLocation = (fleet) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [fleetLocation, setFleetLocation] = useState({ X: 0, Y: 0 })

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetLocation(fleet).call()
      setFleetLocation({ X: data.x, Y: data.y })
    }
    fetch()
  }, [fleet, mapContract, fastRefresh])
  return fleetLocation
}

export const useGetExploreCost = (x, y, account) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [ExploreCost, setExploreCost] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getExploreCost(x, y, account).call()
      setExploreCost(data)
    }
    fetch()
  }, [x, y, account, mapContract, fastRefresh])
  return ExploreCost
}

export const useGetPlaceInfo = (x1: any, y1: any) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [placeInfo, setPlaceInfo] = useState({
    name: '',
    type: '',
    scrap: 0,
    shipyard: false,
    refinery: false,
    mineral: 0,
    fleetCount: 0,
    canTravel: false,
    luminosity: 0,
    isMining: false,
    discoverer: '',
  })

  useEffect(() => {
    async function fetch() {
      if (x1 !== null) {
        const data = await mapContract.methods.getPlaceInfo(x1, y1).call()
        setPlaceInfo({
          name: data[0],
          type: data[1],
          scrap: data[2],
          fleetCount: data[3],
          shipyard: data[5],
          refinery: data[4],
          mineral: data[6],
          canTravel: data[7],
          luminosity: data[8],
          isMining: data[9],
          discoverer: data[10],
        })
      }
    }
    fetch()
  }, [x1, y1, mapContract, fastRefresh])
  return placeInfo
}

export const useGetFleetsAtLocation = (x: any, y: any) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [fleetsAtLocation, setFleetsAtLocation] = useState([])

  useEffect(() => {
    async function fetch() {
      if (x !== null) {
        const data = await mapContract.methods.getFleetsAtLocation(x, y).call()
        setFleetsAtLocation(data)
      }
    }
    fetch()
  }, [x, y, mapContract, fastRefresh])
  return fleetsAtLocation
}

export const useGetDistanceFromFleet = (fleet: string, x: number, y: number) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [DistanceFromFleet, setDistanceFromFleet] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getDistanceFromFleet(fleet, x, y).call()
      setDistanceFromFleet(data)
    }
    fetch()
  }, [fleet, x, y, mapContract, fastRefresh])
  return DistanceFromFleet
}

export const useGetFleetTravelCost = (fleet: string, x: number, y: number) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [FleetTravelCost, setFleetTravelCost] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetTravelCost(fleet, x, y).call()
      setFleetTravelCost(data)
    }
    fetch()
  }, [fleet, x, y, mapContract, fastRefresh])
  return FleetTravelCost
}

export const useGetTravelCooldown = (fleet: string, x: number, y: number) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [TravelCooldown, setTravelCooldown] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.getFleetTravelCooldown(fleet, x, y).call()
      setTravelCooldown(data)
    }
    fetch()
  }, [fleet, x, y, mapContract, fastRefresh])
  return TravelCooldown
}

export const useGetCurrentTravelCooldown = (fleet: string) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [CurrentCooldown, setCurrentCooldown] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.fleetTravelCooldown(fleet).call()
      setCurrentCooldown(data)
    }
    fetch()
  }, [fleet, mapContract, fastRefresh])
  return CurrentCooldown
}

export const useGetCurrentMiningCooldown = (fleet: string) => {
  const mapContract = useMap()
  const { fastRefresh } = useRefresh()
  const [currentCooldown, setCurrentCooldown] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await mapContract.methods.fleetMiningCooldown(fleet).call()
      setCurrentCooldown(data)
    }
    fetch()
  }, [fleet, mapContract, fastRefresh])
  return currentCooldown
}

export const useGetTimeModifier = () => {
  const { fastRefresh } = useRefresh()
  const [TimeModifier, setTimeModifier] = useState(0)

  useEffect(() => {
    async function fetch() {
      // const data = await mapContract.methods.getTimeModifier().call()
      setTimeModifier(1)
    }
    fetch()
  }, [fastRefresh])
  return TimeModifier
}

// *** Nova token contract ***
// used for approvals

export const useApprove = () => {
  const { account } = useWallet()
  const useNovaContract = useNova()

  const handleApprove = useCallback(
    async (contract) => {
      const txHash = await novaApprove(useNovaContract, contract, account)
      console.info(txHash)
    },
    [account, useNovaContract],
  )
  return { onClick: handleApprove }
}

export const useGetAllowance = (contract) => {
  const { account } = useWallet()
  const novaContract = useNova()
  const { fastRefresh } = useRefresh()
  const [allowance, setAllowance] = useState(null)

  useEffect(() => {
    async function fetch() {
      const data = await novaContract.methods.allowance(account, contract).call()
      setAllowance(data)
    }
    fetch()
  }, [contract, account, novaContract, fastRefresh])
  return allowance
}

export const useGetNovaBalance = (account) => {
  const novaContract = useNova()
  const { fastRefresh } = useRefresh()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await novaContract.methods.balanceOf(account).call()
      setBalance(data)
    }
    fetch()
  }, [account, novaContract, fastRefresh])
  return balance
}
// *** Treasury Contract ***

export const useGetCostMod = () => {
  const treasuryContract = useTreasury()
  const { fastRefresh } = useRefresh()
  const [CostMod, setCostMod] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await treasuryContract.methods.getCostMod().call()
      setCostMod(data)
    }
    fetch()
  }, [treasuryContract, fastRefresh])
  return CostMod
}


// *** Referrals Contract ***

export const useAddReferral = (player: string, referrer: string) => {
  const useReferralsContract = useReferrals()

  const handleAddReferral = useCallback(
    async () => {
      const txHash = await addReferral(useReferralsContract, referrer, player)
      console.info(txHash)
    },
    [player, referrer, useReferralsContract],
  )
  return { onAdd: handleAddReferral }
}

export const useGetReferralBonus = (player: string) => {
  const useReferralsContract = useReferrals()

  const handleGetReferralBonus = useCallback(
    async () => {
      const txHash = await getReferralBonus(useReferralsContract, player)
      console.info(txHash)
    },
    [player, useReferralsContract],
  )
  return { onGet: handleGetReferralBonus }
}

export const useCheckReferrals = (player: string) => {
  const referralsContract = useReferrals()
  const { slowRefresh } = useRefresh()
  const [totalReferrals, settotalReferrals] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await referralsContract.methods.checkReferrals(player).call()
      settotalReferrals(data)
    }
    fetch()
  }, [player, referralsContract, slowRefresh])
  return totalReferrals
}

export const useCheckReferralStatus = (player: string) => {
  const referralsContract = useReferrals()
  const { slowRefresh } = useRefresh()
  const [referralStatus, setReferralStatus] = useState(false)

  useEffect(() => {
    async function fetch() {
      const data = await referralsContract.methods.addressReferred(player).call()
      setReferralStatus(data)
    }
    fetch()
  }, [player, referralsContract, slowRefresh])
  return referralStatus
}

export const useGetTotalReferrals = (player: string) => {
  const referralsContract = useReferrals()
  const {slowRefresh} = useRefresh()
  const [totalReferrals, settotalReferrals] = useState(0)

  useEffect(() => {
    async function fetch() {
      const data = await referralsContract.methods.totalReferralsByAddress(player).call()
      settotalReferrals(data)
    }
    fetch()
  }, [player, referralsContract, slowRefresh])
  return totalReferrals
}