import { createDb } from '../../db/index'
import { emailSubscribers } from '../../db/schema'

interface Env {
  HYPERDRIVE: Hyperdrive
  DATABASE_URL?: string
}

interface SubscribePayload {
  name?: string
  email: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<SubscribePayload>()

    if (!body.email?.trim()) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: CORS_HEADERS,
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: CORS_HEADERS,
      })
    }

    const connectionString =
      context.env.HYPERDRIVE?.connectionString ?? context.env.DATABASE_URL

    if (!connectionString) {
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 503,
        headers: CORS_HEADERS,
      })
    }

    const db = createDb(connectionString)

    await db
      .insert(emailSubscribers)
      .values({
        name: body.name?.trim() || null,
        email: body.email.trim().toLowerCase(),
      })
      .onConflictDoNothing({ target: emailSubscribers.email })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: CORS_HEADERS,
    })
  } catch (err) {
    console.error('Subscribe error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: CORS_HEADERS,
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}
