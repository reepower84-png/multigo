import { NextRequest, NextResponse } from 'next/server'
import { supabase, Contact } from '@/lib/supabase'

async function sendDiscordNotification(contact: Contact) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured')
    return
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

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })
  } catch (error) {
    console.error('Failed to send Discord notification:', error)
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

    const contact: Contact = {
      name,
      phone,
      message: message || '',
    }

    // Supabase에 저장
    const { error } = await supabase
      .from('contacts')
      .insert([contact])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: '데이터 저장에 실패했습니다.' },
        { status: 500 }
      )
    }

    // Discord 알림 전송
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

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase select error:', error)
      return NextResponse.json(
        { error: '데이터를 불러오는데 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { error: '데이터를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
