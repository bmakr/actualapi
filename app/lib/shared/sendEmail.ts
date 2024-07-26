'use server'

import { LoopsClient } from 'loops'

type Options = {
  transactionalId: string;
  email: string;
  dataVariables?: {
    [key: string]: string | number;
  }

}

export async function sendEmail({
  dataVariables,
  transactionalId,
  to,
}: {
  to: string;
  transactionalId: string;
  dataVariables?: {
    [key: string]: string | number;
  }
  }) {
  // initialize loops client
  const LOOPS_API_KEY = process.env.LOOPS_API_KEY as string
  console.log({ 'LOOPS_API_KEY': LOOPS_API_KEY })
  const loops = new LoopsClient(LOOPS_API_KEY)

  const options: Options = {
    transactionalId,
    email: to,
  }

  if (dataVariables) {
    options.dataVariables = dataVariables
  }

  // send email
  // on error return response
  let response
  try {
    response = await loops.sendTransactionalEmail(options)
  } catch (e) {
    console.error(e)
    return response
  }

  // on successful connection return response
  // for processing in the calling function
  return response
}
