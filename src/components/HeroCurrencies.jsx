import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/autoplay";
import axios from 'axios';
import { showPrice } from '../utils/common';

const HeroCurrencies = () => {
  const [btcPrice, setBtcPrice] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [bnbPrice, setBnbPrice] = useState();
  const [xrpPrice, setXrpPrice] = useState();
  const [adaPrice, setAdaPrice] = useState();
  const [dogePrice, setDogePrice] = useState();
  const [maticPrice, setMaticPrice] = useState();
  const [solPrice, setSolPrice] = useState();
  const [ltcPrice, setLtcPrice] = useState();
  const [dotPrice, setDotPrice] = useState();

  const getPrices = async () => {
    let response
    response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Cbinance-peg-xrp%2Cbinance-peg-cardano%2Cbinance-peg-dogecoin%2Cmatic-network%2Csol-wormhole%2Cbinance-peg-litecoin%2Cbinance-peg-polkadot&vs_currencies=usd")

    /**
     * 
     * {
  "binancecoin": {
    "usd": 308.86
  },
  "binance-peg-cardano": {
    "usd": 0.336351
  },
  "binance-peg-dogecoin": {
    "usd": 0.073502
  },
  "binance-peg-litecoin": {
    "usd": 82.25
  },
  "binance-peg-polkadot": {
    "usd": 6.21
  },
  "binance-peg-xrp": {
    "usd": 0.368938
  },
  "bitcoin": {
    "usd": 24893
  },
  "ethereum": {
    "usd": 1679.74
  },
  "matic-network": {
    "usd": 1.18
  },
  "sol-wormhole": {
    "usd": 20.65
  }
}
     */
    setBtcPrice(showPrice(response.data.bitcoin.usd))
    setEthPrice(showPrice(response.data.ethereum.usd))
    setBnbPrice(showPrice(response.data.binancecoin.usd))
    setXrpPrice(showPrice(response.data["binance-peg-cardano"].usd))
    setAdaPrice(showPrice(response.data["binance-peg-xrp"].usd))
    setDogePrice(showPrice(response.data["binance-peg-dogecoin"].usd))
    setMaticPrice(showPrice(response.data["matic-network"].usd))
    setSolPrice(showPrice(response.data["sol-wormhole"].usd))
    setLtcPrice(showPrice(response.data["binance-peg-litecoin"].usd))
    setDotPrice(showPrice(response.data["binance-peg-polkadot"].usd))
  }
  useEffect(() => {
    getPrices()
  }, []);

  let coins = [`BTC  $${btcPrice}`, `ETH  $${ethPrice}`, `BNB  $${bnbPrice}`, `XRP  $${xrpPrice}`, `ADA  $${adaPrice}`, `Doge  $${dogePrice}`, `MATIC  $${maticPrice}`, `SOL $${solPrice}`, `Dot $${dotPrice}`, `LTC $${ltcPrice}`, `BTC  $${btcPrice}`, `ETH  $${ethPrice}`, `BNB  $${bnbPrice}`, `XRP  $${xrpPrice}`, `ADA  $${adaPrice}`, `Doge  $${dogePrice}`, `MATIC  $${maticPrice}`, `SOL $${solPrice}`, `Dot $${dotPrice}`, `LTC $${ltcPrice}`]
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={0}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      speed={5000}
      loop={true}
      freeMode={true}
      slideToClickedSlide={true}
      preventClicksPropagation={false}
      preventClicks={false}
      allowTouchMove={false}
      modules={[Autoplay]}
      className="currencies-swiper"
    >
      {
        coins.map((coin, index) => <SwiperSlide className='hero__currencies-item' key={index}>{coin}</SwiperSlide>)
      }
    </Swiper>
  )
}

export default HeroCurrencies;
