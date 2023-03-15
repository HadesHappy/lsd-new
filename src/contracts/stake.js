import { ethers } from 'ethers'
import depositPool from './abis/depositPool.json'
import lsEth from './abis/tokenLsETH.json'
import veLsd from './abis/tokenVELSD.json'
import lsd from './abis/tokenLsd.json'
import { lsdDecimal } from '../utils/constants'

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const deposit = async (amount) => {
  try {
    const signer = getSigner()
    const contract = new ethers.Contract(depositPool.address, depositPool.abi, signer)

    const tx = await contract.deposit({ value: ethers.utils.parseEther(amount.toString()) })
    const receipt = await tx.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }

  } catch (error) {
    console.log('error: ', error.code)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

const withdraw = async (amount) => {
  try {
    const signer = getSigner()
    const contract = new ethers.Contract(lsEth.address, lsEth.abi, signer)
    const tx = await contract.burn(ethers.utils.parseEther(amount.toString()))
    const receipt = await tx.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: ''
      }
  } catch (error) {
    console.log(error)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

const stake = async (amount, address) => {
  try {
    const signer = getSigner()
    const lsdContract = new ethers.Contract(lsd.address, lsd.abi, signer)

    const allowance = Number(await lsdContract.allowance(address, veLsd.address))

    if (allowance < amount * Math.pow(10, lsdDecimal)) {
      const tx1 = await lsdContract.approve(veLsd.address, ethers.utils.parseEther(amount.toString()))
      await tx1.wait()
    }

    const veLsdContract = new ethers.Contract(veLsd.address, veLsd.abi, signer)
    const tx2 = await veLsdContract.mint(ethers.utils.parseUnits(amount.toString(), 9))
    const receipt = await tx2.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }
  }
  catch (error) {
    console.log(error)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

const unstake = async (amount) => {
  try {
    const signer = getSigner()
    const veLsdContract = new ethers.Contract(veLsd.address, veLsd.abi, signer)
    
    const tx = await veLsdContract.burn(ethers.utils.parseUnits(amount.toString(), 9))
    const receipt = await tx.wait()

    if (receipt?.status === 1)
      return {
        status: 'Success',
        error: ''
      }
    else
      return {
        status: 'Failed',
        error: receipt
      }

  } catch (error) {
    console.log(error)
    return {
      status: 'Error',
      error: error.code
    }
  }
}

export { deposit, withdraw, stake, unstake }