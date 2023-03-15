import React from 'react'
import HeroCurrencies from './HeroCurrencies'
import { Link, useNavigate } from 'react-router-dom'

const HomeHero = () => {
  const navigate = useNavigate()
  
  return (
    <article className="hero">
      <section className="hero__section">
        <img src="img/hero-img.png" className="hero__img" alt="hero_img" />
        <h1 className="hero__title">
          Stake with ease,
          <span>earn with peace</span>
        </h1>
        <p className="hero__about">Staking with LSD keeps your assets liquid while you earn  passive income.</p>
        <footer className="hero__footer">
          <Link to={'/dapp'}>Get started</Link>
          <a href="https://liquid-staking-derivatives.gitbook.io/whitepaper" target="_blank"></a>
        </footer>
      </section>
      <HeroCurrencies />
    </article>
  )
}

export default HomeHero
