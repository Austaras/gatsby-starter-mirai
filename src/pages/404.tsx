import React from 'react'

import '../styles/404.scss'
import qr from '../../assets/qr.png'

export default () => (
  <div className='container'>
    <div className='emoji'>:(</div>
    <div>
      <div className='content'>你的访问遇到问题，需要重新定位。</div>
      <div className='content'>我不收集任何错误信息，并且不会为你重新导航。</div>
      <div className='nan'>NaN% 完成</div>
      <div className='qr-code'>
        <div>
          <img src={qr} alt='WoW!' />
        </div>
        <div className='text'>
          <p className='begin'>
            有关此问题的详细信息和可能的解决方法，请访问
            <a href='https://shockwave.me'>shockwave.me</a>
          </p>
          <br />
          <p className='begin'>如果致电支持人员，请向他们提供如下信息：</p>
          <p>终止代码：WHY_AM_I_A_DUMB_ASS</p>
          <p>失败的操作：ROUTING</p>
        </div>
      </div>
    </div>
  </div>
)
