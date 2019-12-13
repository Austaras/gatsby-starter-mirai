exports.shouldUpdateScroll = ({
  routerProps: { hash },
  getSavedScrollPosition
}) => {
  console.log(hash)
  return hash
}
