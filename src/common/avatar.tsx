import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { img as imgClass } from './avatar.module.scss'

import { CONFIG } from '@/config'

export const Avatar = () => {
  const img = useStaticQuery(graphql`
    query ImgQuery {
      images: allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
        edges {
          node {
            filename: relativePath
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `).images.edges.find((edge: any) => edge.node.filename === CONFIG.site.avatar)
  return img ? (
    <GatsbyImage
      className={imgClass}
      image={img.node.childImageSharp.gatsbyImageData}
      alt="Avatar"
      loading="eager"
      itemProp="image"
    />
  ) : null
}
