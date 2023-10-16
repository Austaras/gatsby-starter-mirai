import { FaGithub, FaTwitter, FaRegEnvelope, FaRss } from 'react-icons/fa'

import * as style from './external-link.module.scss'

import { ExternalLink, ExternalLinkType } from '@/config'

const data = {
  github: <FaGithub />,
  twitter: <FaTwitter />,
  email: <FaRegEnvelope />,
  rss: <FaRss />
} as const

interface Props {
  link: ExternalLink
}

export function ExternalLinkComp({ link }: Props) {
  const type = Object.keys(link) as ExternalLinkType[]
  return (
    <nav className={style.container}>
      {type.map(type => (
        <a
          className={style.link}
          rel="noopener external nofollow noreferrer"
          target="_blank"
          title={type}
          href={link[type]}
        >
          {data[type]}
        </a>
      ))}
    </nav>
  )
}
