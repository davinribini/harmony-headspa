import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingPayload {
  orderId:   string
  timestamp: string
  customer:  { name: string; email: string; phone: string }
  booking: {
    service:  { title: string; price: number; priceFormatted: string; duration: string }
    dateTime: { date: string; time: string; label: string }
  }
  payment: { method: string; status: string; currency: string; amount: number }
  meta:    { source: string; isGiftCard: boolean; isEpassi: boolean }
}

// ─── Email HTML builder ───────────────────────────────────────────────────────

function buildEmailHtml(p: BookingPayload): string {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <title>Ny bokning — ${p.orderId}</title>
</head>
<body style="margin:0;padding:0;background:#FDFCF9;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDFCF9;">
    <tr><td align="center" style="padding:48px 24px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1A1209;border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:40px 48px 32px;border-bottom:1px solid rgba(201,169,110,0.2);">
            <p style="margin:0 0 6px;color:#C9A96E;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;">Ny bokning</p>
            <h1 style="margin:0;color:#FDFCF9;font-size:28px;font-weight:400;letter-spacing:0.06em;">Harmony Headspa</h1>
          </td>
        </tr>

        <!-- Order ID -->
        <tr>
          <td style="padding:28px 48px 0;">
            <p style="margin:0 0 4px;color:rgba(253,252,249,0.45);font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;">Order</p>
            <p style="margin:0;color:#C9A96E;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;letter-spacing:0.1em;">${p.orderId}</p>
          </td>
        </tr>

        <!-- Booking details -->
        <tr>
          <td style="padding:24px 48px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ['Behandling',     p.booking.service.title],
                ['Tid',            p.booking.dateTime.label || 'Presentkort'],
                ['Varaktighet',    p.booking.service.duration],
                ['Pris',           p.booking.service.priceFormatted],
                ['Betalningsmetod',p.payment.method.toUpperCase()],
              ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(201,169,110,0.1);">
                  <span style="color:rgba(253,252,249,0.45);font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;">${label}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(201,169,110,0.1);text-align:right;">
                  <span style="color:#FDFCF9;font-family:Arial,sans-serif;font-size:14px;">${value}</span>
                </td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>

        <!-- Customer -->
        <tr>
          <td style="padding:0 48px 28px;">
            <p style="margin:0 0 12px;color:rgba(253,252,249,0.45);font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;">Kund</p>
            <p style="margin:0 0 4px;color:#FDFCF9;font-family:Arial,sans-serif;font-size:15px;">${p.customer.name}</p>
            <p style="margin:0 0 4px;color:rgba(253,252,249,0.6);font-family:Arial,sans-serif;font-size:13px;">${p.customer.email}</p>
            <p style="margin:0;color:rgba(253,252,249,0.6);font-family:Arial,sans-serif;font-size:13px;">${p.customer.phone}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 48px;border-top:1px solid rgba(201,169,110,0.15);">
            <p style="margin:0;color:rgba(253,252,249,0.22);font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">
              ${p.timestamp} · ${p.meta.source}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let payload: BookingPayload

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.SALON_EMAIL ?? 'harmonyspa.stockholm@gmail.com'

  // If no Resend key is configured, log and return success (dev mode)
  if (!apiKey) {
    console.warn('[booking/route] RESEND_API_KEY not set — skipping email dispatch')
    return NextResponse.json({ ok: true, orderId: payload.orderId, mode: 'dev' })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from:    'Harmony Headspa <bokningar@harmonyheadspa.se>',
        to:      [toEmail],
        subject: `Ny bokning ${payload.orderId} — ${payload.booking.service.title}`,
        html:    buildEmailHtml(payload),
        reply_to: payload.customer.email,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[booking/route] Resend error:', res.status, body)
      // Still return 200 — a failed email must not block the booking success UX
      return NextResponse.json({ ok: true, orderId: payload.orderId, emailError: body })
    }

    const data = await res.json()
    return NextResponse.json({ ok: true, orderId: payload.orderId, emailId: data.id })
  } catch (err) {
    console.error('[booking/route] Unexpected error:', err)
    return NextResponse.json({ ok: true, orderId: payload.orderId, emailError: String(err) })
  }
}
