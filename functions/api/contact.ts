interface Env {
  // Add bindings here when wiring real email delivery, e.g.:
  // RESEND_API_KEY: string
}

interface ContactPayload {
  name: string
  email: string
  message: string
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<ContactPayload>()

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
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

    // TODO: Wire real email delivery here. Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'portfolio@yourdomain.com',
    //     to: 'austinoneill55@gmail.com',
    //     subject: `Portfolio contact from ${body.name}`,
    //     text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    //   }),
    // })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: CORS_HEADERS,
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: CORS_HEADERS,
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}
