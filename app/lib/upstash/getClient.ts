'use server'

import Redis from 'ioredis'

const urls: { [key: string]: string; } = {
  users: process.env.UPSTASH_USERS_REDIS_URL as string,
}

export async function getClient({ 
  name 
}: { 
  name: string; 
}) {
  console.log('getClient')
  console.log({ name })
  // set client connection to redis
  try {
    const conn = await new Redis(urls[name])
    console.log('getClient', conn)
    if (!conn) return
    return conn
  } catch(e) {
    console.log({ error: e })
    return
  }
}
