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

export { chunk, groupBySame }
