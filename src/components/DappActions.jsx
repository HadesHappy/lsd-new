import React, { useState, useEffect } from 'react'
import DappSectionHeader from './DappSectionHeader'
import DappSectionReceive from './DappSectionReceive'
import DappSectionWithdraw from './DappSectionWithdraw'
import { stake, unstake, deposit, withdraw } from '../contracts/stake'
import { useSelector } from 'react-redux'
import { useAddress } from '@thirdweb-dev/react'
import { toast } from 'react-hot-toast'

const DappActions = ({ setIsModalVisible, isModalVisible }) => {
  const stakeType = useSelector(state => state.inputReducer.stakeType)
  const inputToken = useSelector(state => state.inputReducer.inputToken)
  const inputValue = useSelector(state => state.inputReducer.inputValue)

  const address = useAddress()

  const [text, setText] = useState('Stake now')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {

    if (address) {
      if (inputValue === 0) {
        toast.error(`Enter an amount to ${stakeType}`)
      }
      else {
        if (stakeType === 'STAKE') {
          if (inputToken === 'ETH') {
            setLoading(true)
            const response = await deposit(inputValue)
            if (response.status === 'success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: Insufficient ${inputToken} balance.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
          else {
            setLoading(true)
            const response = await stake(inputValue, address)
            if (response.status === 'success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: Insufficient ${inputToken} balance.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
        }
        else {
          if (inputToken === 'LS-ETH') {
            setLoading(true)
            const response = await withdraw(inputValue)
            if (response.status === 'success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: Insufficient ${inputToken} balance.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
          else {
            setLoading(true)
            const response = await unstake(inputValue)
            if (response.status === 'success') {
              toast.success('Succeed.')
            } else {
              if (response.status === 'Error')
                toast.error(`${response.status}: Insufficient ${inputToken} balance.`)
              else
                toast.error('Transaction failed by unknown reason.')
            }
            setLoading(false)
          }
        }
      }
    } else {
      toast.error('Wallet is not connected')
    }
  }
  useEffect(() => {
    if (stakeType === 'STAKE')
      setText('Stake now')
    else
      setText('Unstake now')
  }, [stakeType])

  return (
    <div className='dapp-section__actions'>
      <div className="dapp-section__actions-wrapper">
        <DappSectionHeader />
        <DappSectionWithdraw setIsModalVisible={setIsModalVisible} />
        <DappSectionReceive setIsModalVisible={setIsModalVisible} />
      </div>
      <button type="button" className="dapp-section__submit" onClick={handleClick}>{text}</button>
    </div>
  )
}

export default DappActions;
