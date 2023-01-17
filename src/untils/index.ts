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