import { getItem } from 'lib'
import { User, Session } from 'types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

  // get body
  let body
  try {
    body = await req.json()
  } catch (e) {
    // respond with error
    console.log({ error: e })
    return NextResponse.json({ error: 'Body is required' }, { status: 400 })
  }

  console.log({ body })
  const { data } = body
  console.log({ data })
  const { customer_details, subscription } = data.object
  console.log({ subscription })
  console.log({ customer_details })

  const sessionId = data.object['client_reference_id']
  console.log({ sessionId })

  // get session from db
  let session
  try {
    session = await getItem({ name: 'sessions', id: sessionId }) as Session
  } catch (e) {
    console.log({ error: e })
    return NextResponse.json({ error: 'Internal error: /stripe get session from db' }, { status: 500 })
  }

  if (!session) {
    return NextResponse.json({ error: 'Internal error: Session not found in db' }, { status: 500 })
  }

  console.log({ session })

  // get user from db
  let user
  try {
    user = await getItem({ name: 'users', id: session.userId }) as User
  } catch (e) {
    console.log({ error: e })
    return NextResponse.json({ error: 'Internal error: /stripe get user from db' }, { status: 500 })
  }

  if (!user) {
    return NextResponse.json({ error: 'Internal error: User not found in db' }, { status: 500 })
  }

  // update user in db
  console.log({ user})


  return NextResponse.json({received: true }, { status: 200 })
}