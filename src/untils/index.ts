const parserKey = {
  id: 'id',
  name: 'name',
  desc: 'desc',
  createdAt: 'createAt',
  updatedAt: 'updateAt',
}

interface RawMangaResponse {
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
}

export const parserMangaToTable = (data: Array<RawMangaResponse>): Array<any> => {
  return data.map(item => Object.keys(parserKey).reduce((vals, key) => key in item ? { ...vals, [parserKey[key as keyof typeof parserKey]]: item[key as keyof typeof item] } : { ...vals, [parserKey[key as keyof typeof parserKey]]: 'dữ liệu trống' }, {}))
}

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

