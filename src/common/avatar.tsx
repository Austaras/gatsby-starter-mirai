import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { config } from '@/config'

import { img as imgClass } from './avatar.module.scss'

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
  `).images.edges.find((edge: any) => edge.node.filename === config.site.avatar)
  return img ? (
    <GatsbyImage
      class={imgClass}
      image={img.node.childImageSharp.gatsbyImageData}
      alt='Avatar'
      loading='eager'
      itemProp='image'
    />
  ) : null
}
