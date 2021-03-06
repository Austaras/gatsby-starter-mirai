import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { config } from '@/config'

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
    <GatsbyImage image={img.node.childImageSharp.gatsbyImageData} alt='Avatar' itemProp='image' />
  ) : null
}
