import { NextRequest, NextResponse } from 'next/server'

interface ContactForm {
  name: string
  phone: string
  message: string
}

async function sendDiscordNotification(contact: ContactForm) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('Discord webhook URL not configured')
  }

  const embed = {
    title: '📞 새로운 상담 문의가 접수되었습니다!',
    color: 0x3b82f6,
    fields: [
      {
        name: '👤 이름',
        value: contact.name,
        inline: true,
      },
      {
        name: '📱 연락처',
        value: contact.phone,
        inline: true,
      },
      {
        name: '💬 상담 문의',
        value: contact.message || '(내용 없음)',
        inline: false,
      },
      {
        name: '🕐 접수 시간',
        value: new Date().toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
        inline: false,
      },
    ],
    footer: {
      text: '멀티고 상담 시스템',
    },
    timestamp: new Date().toISOString(),
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  })

  if (!response.ok) {
    throw new Error(`Discord webhook failed: ${response.status}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, message } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수 항목입니다.' },
        { status: 400 }
      )
    }

    const contact: ContactForm = {
      name,
      phone,
      message: message || '',
    }

    // Discord 알림 직접 전송
    await sendDiscordNotification(contact)

    return NextResponse.json({ success: true, message: '문의가 접수되었습니다.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

