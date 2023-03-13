import { ethers } from 'ethers'
import depositPool from './abis/depositPool.json'
import lsEth from './abis/tokenLsETH.json'
import veLsd from './abis/tokenVELSD.json'

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
    console.log(error)
    return {
      status: 'Error',
      error: error
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
        error: receipt
      }
  } catch (error) {
    console.log(error)
    return {
      status: 'Error',
      error: error
    }
  }
}

const stake = async (amount, address) => {
  try {
    const signer = getSigner()
    const lsEthContract = new ethers.Contract(lsEth.address, lsEth.abi, signer)

    const allowance = await lsEthContract.allowance(address, veLsd.address)

    if (allowance < ethers.utils.parseEther(amount.toString())) {
      const tx1 = await lsEthContract.approve(veLsd.address, ethers.utils.parseEther(amount.toString()))
      await tx1.wait()
    }

    const veLsdContract = new ethers.Contract(veLsd.address, veLsd.abi, signer)
    const tx2 = await veLsdContract.mint(ethers.utils.parseEther(amount.toString()))
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
      error: error
    }
  }
}

const unstake = async (amount) => {
  try {
    const signer = getSigner()
    const veLsdContract = new ethers.Contract(veLsd.address, veLsd.abi, signer)
    const tx = await veLsdContract.burn(ethers.utils.parseEther(amount.toString()))
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
      error: error
    }
  }
}

export { deposit, withdraw, stake, unstake }