import React, { useState, useEffect } from 'react'
import DappActions from '../../components/DappActions'
import DappFooter from '../../components/DappFooter'
import ModalWindow from '../../components/ModalWindow'
import SelectToken from '../../components/SelectToken'
import { showEth } from '../../utils/common'
import { useLsdBalance } from '../../hooks/useLsdBalance'

import './dapp.css'

export const Dapp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { stakedETH } = useLsdBalance()

  return (
    <>
      <main className='dapp'>
        <section className='dapp-section'>
          <h1 className="dapp-section__title">
            <span>Stake coins</span>
            {showEth(stakedETH)}
          </h1>
          <p className="dapp-section__about">ETH staked</p>
        </section>
        <DappActions setIsModalVisible={setIsModalVisible} />
      </main>
      <DappFooter />
      {
        isModalVisible &&
        <ModalWindow>
          <SelectToken setIsModalVisible={setIsModalVisible} />
        </ModalWindow>
      }
    </>
  )
};
