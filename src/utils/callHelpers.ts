import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
}

export const novaApprove = async (novaContract, novariaContract, account) => {
  return novaContract.methods
    .approve(novariaContract, ethers.constants.MaxUint256)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvestRewards = async (moneyPotContract, address, account) => {
  let sNovaHolder
  if (address === null || address === undefined || address === '') {
    sNovaHolder = '0x0000000000000000000000000000000000000000'
  } else {
    sNovaHolder = address
  }

  return moneyPotContract.methods
    .harvestRewards(sNovaHolder)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const swapToNova = async (sNovaContract, amount, account) => {
  return sNovaContract.methods
    .swapToNova(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// fleet functions

export const insertCoinHere = async (fleetContract, name, account) => {
  return fleetContract.methods
    .insertCoinHere(name)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const buildShips = async (fleetContract, x, y, classId, amount, buildCost, account) => {
  return fleetContract.methods
    .buildShips(x, y, classId, amount, buildCost)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const boostProduction = async (fleetContract, spaceDockId, account) => {
  return fleetContract.methods
    .boostBuildTime(spaceDockId)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claimShips = async (fleetContract, dockId, amount, account) => {
  return fleetContract.methods
    .claimShips(dockId, amount)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const recall = async (fleetContract, haven, account) => {
  return fleetContract.methods
    .recall(haven)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const enterBattle = async (fleetContract, target, mission, account) => {
  return fleetContract.methods
    .enterBattle(target, mission)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const goBattle = async (fleetContract, battleId, account) => {
  return fleetContract.methods
    .goBattle(battleId)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// Map Functions

export const mine = async (mapContract, account) => {
  return mapContract.methods
    .mine()
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const refine = async (mapContract, account) => {
  return mapContract.methods
    .refine()
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const collect = async (mapContract, account) => {
  return mapContract.methods
    .collect()
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const travel = async (mapContract, x, y, account) => {
  return mapContract.methods
    .travel(x, y)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const boostTravel = async (mapContract, account) => {
  return mapContract.methods
    .boostTravelTime()
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const explore = async (mapContract, x, y, account) => {
  return mapContract.methods
    .explore(x, y)
    .send({ from: account, gasLimit: 1100000 })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const initiateShipyardTakeover = async (fleetContract, x, y, account) => {
  return fleetContract.methods
    .initiateShipyardTakeover(x, y)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const completeShipyardTakeover = async (fleetContract, x, y, account) => {
  return fleetContract.methods
    .completeShipyardTakeover(x, y)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const changeName = async (mapContract, x, y, name, account) => {
  return mapContract.methods
    .changeName(x, y, name)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const setShipyardName = async (fleetContract, x, y, name, account) => {
  return fleetContract.methods
    .setShipyardName(x, y, name)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const setShipyardFeePercent = async (fleetContract, x, y, amount, account) => {
  return fleetContract.methods
    .setShipyardFeePercent(x, y, amount)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const tunnel = async (mapContract, x, y, account) => {
  return mapContract.methods
    .tunnel(x, y)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const addReferral = async (referralsContract, referrer, account) => {
  return referralsContract.methods
    .addReferral(referrer)
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const getReferralBonus = async (referralsContract, account) => {
  return referralsContract.methods
    .getReferralBonus()
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const setRecall = async (mapContract, account) => {
  return mapContract.methods
    .setRecall()
    .send({ from: account, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const buyDirect = async (phoenixContract, payable, amount, account) => {
  return phoenixContract.methods
    .buy(amount)
    .send({ from: account, value: payable, maxPriorityFeePerGas: null, maxFeePerGas: null })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// NOTE: Not sure if these sous functions are being called

export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
