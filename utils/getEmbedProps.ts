export function getSrc(htmlString: string): string {
  const srcRegex = /<iframe.*?src="(.*?)".*?><\/iframe>/
  const match = htmlString.match(srcRegex)

  let src = ''
  if (match && match[1]) {
    src = match[1]
  }

  return src
}

export function getHeight(htmlString: string): string {
  const heightRegex = /<iframe.*?height="(\d+)".*?><\/iframe>/
  const match = htmlString.match(heightRegex)

  let height = ''
  if (match && match[1]) {
    height = match[1]
  }

  return height
}