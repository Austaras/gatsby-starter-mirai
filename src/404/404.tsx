import React from 'react'

import style from './404.module.scss'
import qr from '../../assets/qr.svg'

import { config } from '@/config'

export default () => (
  <div className={style.container}>
    <div className={style.emoji}>:(</div>
    <div className={style.content}>
      <div>
        Your browsing ran into a problem and needs to renavigate. I'm not colletcing any error info, and
        then I'll not renavigate for you.
      </div>
      <div className={style.space}></div>
      <div>NaN% complete</div>
      <div className={style.space}></div>
      <div className={style.qr}>
        <div className={style.img}>
          <img src={qr} alt='WoW!' />
        </div>
        <div className={style.text}>
          <p className={style.begin}>
            For more information about this issue and possible fixes, visit{' '}
            <a href={config.site.root}>{config.site.url}</a>
          </p>
          <p className={style.end}>
            If you call a support person give them this info:
            <br />
            Stop Code: WHY AM I A DUMB ASS
          </p>
        </div>
      </div>
    </div>
  </div>
)
