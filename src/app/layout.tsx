import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '멀티고 - 무점포 창업의 새로운 시작',
  description: '대리운전, 퀵서비스, 꽃배달 창업! 현재 존재하는 사업 중 가장 쉽고 빠르게 수익 발생이 가능합니다. 합리적인 비용으로 성공 창업을 시작하세요.',
  keywords: '무점포창업, 대리운전창업, 퀵서비스창업, 꽃배달창업, 위탁콜센터, 소자본창업',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
