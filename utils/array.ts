function* chunk(array: any[], n: number) {
  for (let i = 0; i < array.length; i += n)
    yield array.slice(i, i + n)
}

function groupBySame(array: any[]) {
  return array.reduce((r, v, i, a) => {
    if (v === a[i - 1])
      r[r.length - 1].push(v)

    else
      r.push([v])

    return r
  }, [])
}

function distinct(array: Record<any, any>[]) {
  return [...new Set(array.map(x => JSON.stringify(x)))].map(x => JSON.parse(x))
}

export { chunk, groupBySame, distinct }
