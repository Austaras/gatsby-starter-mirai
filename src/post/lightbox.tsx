import React, { useEffect, useState } from 'react'

import style from './lightbox.module.scss'

interface Props {
  pic?: string
}
export const LightBox = (props: Props) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (props.pic !== undefined) setShow(true)
  }, [props])
  return (
    <div className={`${style.container} ${show ? '' : style.hidden}`} onClick={() => setShow(false)}>
      <img src={props.pic} onClick={e => e.stopPropagation()} />
    </div>
  )
}
