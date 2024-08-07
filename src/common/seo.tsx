import { graphql, useStaticQuery } from 'gatsby'

import { CONFIG } from '@/config'

interface Props {
  article?: boolean
  noindex?: boolean
  path?: string
  description?: string
  keywords?: string[]
  title?: string
}
const { site } = CONFIG
export function SEO({
  article,
  noindex = false,
  path = '',
  title = site.name,
  description = site.description,
  keywords = site.keywords
}: Props) {
  const avatar = useStaticQuery(graphql`
    query ImgMetaQuery {
      images: allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
        edges {
          node {
            filename: relativePath
            publicURL
          }
        }
      }
    }
  `).images.edges.find((edge: any) => edge.node.filename === CONFIG.site.avatar)?.node.publicURL
  return (
    <>
      {description && [
        <meta name="description" content={description} key="normal" />,
        <meta property="og:description" content={description} key="search" />,
        <meta name="twitter:description" content={description} key="twitter" />
      ]}
      {avatar
        ? [
            <meta name="image" content={CONFIG.site.url + avatar} key="img" />,
            <meta property="og:image" content={CONFIG.site.url + avatar} key="twitter_img" />,
            <meta name="twitter:image" content={CONFIG.site.url + avatar} key="og_img" />
          ]
        : null}
      {site.name && <meta property="og:site_name" content={site.name} />}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      {article && <meta property="article:author" content={CONFIG.site.author} />}
      {site.url && <meta property="og:url" content={site.url + path} />}
      {keywords.length !== 0 && <meta name="keywords" content={keywords.join(',')} />}
      <meta property="og:locale" content={CONFIG.language} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />
      {noindex && <meta name="robots" content="noindex" />}
      <title>{title}</title>
      <html lang={CONFIG.language}></html>
      <body itemScope itemType="http://schema.org/WebPage"></body>
    </>
  )
}
