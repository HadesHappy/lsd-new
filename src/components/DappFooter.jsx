import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useLsdBalance } from '../hooks/useLsdBalance'
import { useInfo } from '../hooks/useInfo'
import { showEth, showRate } from '../utils/common'

import "swiper/css";

const DappFooter = () => {
  const { stakedETH, lsEthSupply, veLsdSupply } = useLsdBalance()
  const { multiplier, multiplierUnit } = useInfo()

  return (
    <footer className="dapp-footer">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={12}
        freeMode={true}
        className="dapp-footer__info"
      >
        <SwiperSlide>
          <span>{showEth(stakedETH)}</span> ETH staking
        </SwiperSlide>
        <SwiperSlide>
          <span>{showEth(lsEthSupply)}</span> LS-ETH Token Supply
        </SwiperSlide>
        <SwiperSlide>
          <span>{showEth(veLsdSupply)}</span> VE-LSD Token Supply
        </SwiperSlide>
        <SwiperSlide>
          multiplier rate at <span>{showRate(multiplier / (10 ** (multiplierUnit - 2)))} %</span>
        </SwiperSlide>
      </Swiper>

      {
        /*
           <ul className="dapp-footer__info">
            <li>
              <span>414,750</span> ETH staking across
            </li>
            <li>
              <span>2,146</span> node operations in
            </li>
            <li>
              <span>114</span> regions with node
            </li>
            <li>
              commission rate at <span>15.00%</span>
            </li>
          </ul>
        */
      }
    </footer>
  )
}

export default DappFooter;
