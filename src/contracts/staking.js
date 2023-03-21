import { ethers } from 'ethers'
import stakingPool from './abis/stakingPool.json'
import lsd from './abis/tokenLsd.json'

const getSigner = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  return signer
}

const addLiquidity = async (amount1, amount2, address) => {
  try {
    const signer = getSigner()
    const lsdContract = new ethers.Contract(lsd.address, lsd.abi, signer)

    const allowance = Number(await lsdContract.allowance(address, stakingPool.address))
    console.log("allowance: ", allowance);

    const stakingContract = new ethers.Contract(stakingPool.address, stakingPool.abi, signer)
    const tx2 = await stakingContract.addLiquidity({
      value: ethers.utils.parseEther(amount1.toString())
    }, ethers.utils.parseUnits(amount2.toString()));

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

export { addLiquidity }