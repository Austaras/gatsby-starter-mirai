import React, { RefObject, useEffect, useState } from 'react'

import style from './lightbox.module.scss'

interface Props {
  container: RefObject<HTMLDivElement>
}
export const LightBox = ({ container }: Props) => {
  const [show, setShow] = useState(false)
  const [pic, setPic] = useState('')
  useEffect(() => {
    if (container.current === undefined) return
    container.current!.querySelectorAll('img').forEach(pic =>
      pic.addEventListener('click', () => {
        setPic(pic.currentSrc)
        setShow(true)
      })
    )
  }, [container])
  return (
    <div className={`${style.container} ${show ? '' : style.hidden}`} onClick={() => setShow(false)}>
      <img src={pic} onClick={e => e.stopPropagation()} />
    </div>
  )
}
