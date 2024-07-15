import { getItem, setItem } from 'lib'
import { NextRequest, NextResponse } from 'next/server'

/*
  POST /api/write/list
  The write/list route is used to write a new value to the database as part of a list
  The request body contains a JSON object with a database name, key and value
*/
export async function POST(req: NextRequest) {
  // fetch body from request
  let body
  try {
    body = await req.json()
  } catch (error) {
    // respond with error
    console.log({ error })
    return NextResponse.json({ error: 'Internal error: body' }, { status: 400 })
  }

  console.log({ body })

  // body exists
  // check if val, key and name exist
  if (!body.val) {
    return NextResponse.json({ error: 'Value is required' }, { status: 400 })
  }
  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!body.key) {
    return NextResponse.json({ error: 'Key is required' }, { status: 400 })
  }

  // get list from db
  let list
  const { name, val, key } = body
  try {
    const listFromDb = await getItem({ name, key })
    console.log({ listFromDb })
    
    if (listFromDb === undefined) {
      return NextResponse.json({ error: 'Internal error: get list error 1' }, { status: 500 })
    } else if (listFromDb === null) { // set list to empty array
      list = []
    } else {
      list = listFromDb
    }
  } catch (e) {
    return NextResponse.json({ error: 'Internal error: get list error 2' }, { status: 500 })
  }

  console.log({ list })

  // update list
  try {
    list.push(val)
    console.log({ list })
    const res = await setItem({ name, key, payload: JSON.stringify(list) })
    if (!res) {
      return NextResponse.json({ error: 'Internal error: update list error' }, { status: 500 })
    }
  } catch (e) {
    return NextResponse.json({ error: 'Internal error: update list error' }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}