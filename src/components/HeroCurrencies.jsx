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
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCBUSD")
    setBtcPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHBUSD")
    setEthPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBBUSD")
    setBnbPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=XRPBUSD")
    setXrpPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ADABUSD")
    setAdaPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=DOGEBUSD")
    setDogePrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=MATICBUSD")
    setMaticPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=SOLBUSD")
    setSolPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHBUSD")
    setEthPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=LTCBUSD")
    setLtcPrice(showPrice(response.data.price))
    response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=DOTBUSD")
    setDotPrice(showPrice(response.data.price))
  } 
  useEffect(() => {
    getPrices()
  }, []);

  let coins = [`BTC  $${btcPrice}`, `ETH  $${ethPrice}`, `BNB  $${bnbPrice}`, `XRP  $${xrpPrice}`, `ADA  $${adaPrice}`, `Doge  $${dogePrice}`, `MATIC  $${maticPrice}`, `SOL $${solPrice}`, `Dot $${dotPrice}`, `LTC $${ltcPrice}`, `BTC  $${btcPrice}`, `ETH  $${ethPrice}`, `BNB  $${bnbPrice}`, `XRP  $${xrpPrice}`, `ADA  $${adaPrice}`, `Doge  $${dogePrice}`, `MATIC  $${maticPrice}`, `SOL $${solPrice}`, `Dot $${dotPrice}`, `LTC $${ltcPrice}`,]
  // const cryptoPrices = useCryptoPrices(["btc", "eth", "bnb", "xrp", "ada", "doge", "matic", "sol", "dot", "ltc"]);
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
