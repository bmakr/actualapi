'use server'

import { getClient } from './getClient'

export async function getItem({
  name,
  key,
  id
}: {
  name: string;
  key?: string;
  id?: string;
}) {
  // set client connection to redis
  let conn: any
  try {
    const conn = await getClient({ name })
    if (!conn) return
  } catch (e) {
    return
  }

  // get item from redis
  let json
  try {
    // key and id are optional
    const fullKey = key && id ? `${name}:${key}:${id}`
      : id ? `${name}:${id}`
        : `${name}:${key}`
    json = await conn.get(fullKey) as string
  } catch (e) {
    console.log(e)
    return
  }

  // parse json
  let item
  try {
    item = JSON.parse(json)
    console.log({ item })

  } catch (e) {
    console.error(e)
    return 
  }

  return item
}