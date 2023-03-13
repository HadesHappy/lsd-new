import React from 'react'
import { useInfo } from '../hooks/useInfo'
import { useState, useEffect } from 'react'
import {
  setApy,
  setLidoApy,
  setRpApy,
  setApyUnit,
  setMinimumDepositAmount,
  setLsdDepositEnabled,
  setLsdIsLock,
  setLsdMultiplier,
  setLsdMultiplierUnit,
} from '../contracts/setting'

const DappSettingsWindow = ({ setIsModalVisible }) => {
  const { apr, setApr, rpApr, setRpApr, lidoApr, setLidoApr, aprUnit, setAprUnit, minimum, setMinimum, enabled, setEnabled, multiplier, setMultiplier, multiplierUnit, setMultiplierUnit, owner, isLock, setIsLock } = useInfo()
 
  return (
    <div className="modal-window__wrapper modal-window__wrapper--settings">
      <header className="modal-window__header">
        <h2>Settings</h2>
        <button className="modal-window__close" onClick={() => setIsModalVisible(false)}></button>
      </header>
      <form className="dapp-section__settings-form">
        <p className="dapp-section__settings-row dapp-section__settings-row--multiplier">
          <span>Multiplier</span>
          <input type="checkbox" name="multiplier-checkbox" id="multiplier-checkbox" />
          <label htmlFor="multiplier-checkbox"></label>
        </p>
        <div className="dapp-section__settings-double">
          <div className="dapp-section__settings-double__half">
            <label htmlFor="multiplier">Multiplier</label>
            <p className="input-wrapper">
              <input type="number" name="multiplier" id="multiplier" placeholder="0" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} />
              <button type="button" className="input-wrapper__help" onClick={() => setLsdMultiplier(multiplier)}></button>
            </p>
          </div>
          <div className="dapp-section__settings-double__half">
            <label htmlFor="multiplier-unit">Multiplier unit</label>
            <p className="input-wrapper">
              <input type="number" name="multiplier-unit" id="multiplier-unit" placeholder="0" value={multiplierUnit} onChange={(e) => setMultiplierUnit(e.target.value)} />
              <button type="button" className="input-wrapper__help" onClick={() => setLsdMultiplierUnit(multiplierUnit)}></button>
            </p>
          </div>
        </div>
        <p className="dapp-section__settings-row dapp-section__settings-row--apr">
          <span>APR %</span>
          <input type="checkbox" name="apr-checkbox" id="apr-checkbox" />
          <label htmlFor="apr-checkbox"></label>
        </p>
        <div className="dapp-section__settings-double">
          <div className="dapp-section__settings-double__half">
            <label htmlFor="apr">Apr</label>
            <p className="input-wrapper">
              <input type="number" name="apr" id="apr" placeholder="0" value={apr} onChange={(e) => setApr(e.target.value)} />
              <button type="button" className="input-wrapper__help" onClick={() => setApy(apr)}></button>
            </p>
          </div>
          <div className="dapp-section__settings-double__half">
            <label htmlFor="apr-unit">Apr unit</label>
            <p className="input-wrapper">
              <input type="number" name="apr-unit" id="apr-unit" placeholder="0" value={aprUnit} onChange={(e) => setAprUnit(e.target.value)} />
              <button type="button" className="input-wrapper__help" onClick={() => setApyUnit(aprUnit)}></button>
            </p>
          </div>
        </div>
        <p className="dapp-section__settings-row dapp-section__settings-row--slippage">
          <span>Set Minimum Deposit Amount</span>
          <input type="checkbox" name="slippage-checkbox" id="slippage-checkbox" />
          <label htmlFor="slippage-checkbox"></label>
        </p>
        <div className="dapp-section__settings-slippage">
          <p className="input-wrapper">
            <label htmlFor="enter-slippage">Minimum deposit amount</label>
            <input type="number" name="enter-slippage" id="enter-slippage" placeholder="0" value={minimum} onChange={(e) => setMinimum(e.target.value)} />
          </p>
          <button type="button" className="dapp-section__settings-slippage-auto" onClick={() => setMinimumDepositAmount(minimum)}>Set</button>
        </div>
        <p className="dapp-section__settings-row dapp-section__settings-row--manual-apr">
          <span>Manual apr</span>
          <input type="checkbox" name="manual-apr-checkbox" id="manual-apr-checkbox" />
          <label htmlFor="manual-apr-checkbox"></label>
        </p>
        <div className="dapp-section__settings-double">
          <div className="dapp-section__settings-double__half">
            <label htmlFor="lido">Lido</label>
            <p className="input-wrapper">
              <input type="number" name="lido" id="lido" placeholder="0" value={lidoApr} onChange={(e) => setLidoApr(e.target.value)} />
              <button type="button" className="input-wrapper__help" onClick={() => setLidoApy(lidoApr)}></button>
            </p>
          </div>
          <div className="dapp-section__settings-double__half">
            <label htmlFor="rpl">Rpl</label>
            <p className="input-wrapper">
              <input type="number" name="rpl" id="rpl" placeholder="0" value={rpApr} onChange={(e) => setRpApr(e.target.value)} />
              <button type="button" className="input-wrapper__help" onClick={() => setRpApy(rpApr)}></button>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DappSettingsWindow;
