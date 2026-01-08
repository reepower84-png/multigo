'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitResult({ success: true, message: '문의가 정상적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!' })
        setFormData({ name: '', phone: '', message: '' })
      } else {
        setSubmitResult({ success: false, message: data.error || '문의 접수에 실패했습니다. 다시 시도해주세요.' })
      }
    } catch {
      setSubmitResult({ success: false, message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src="/멀티고_로고_단독버젼_v1-removebg-preview.png"
            alt="멀티고"
            onClick={scrollToTop}
            className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              서비스 소개
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              차별화 시스템
            </button>
            <button
              onClick={() => scrollToSection('success')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              성공 사례
            </button>
            <button
              onClick={scrollToForm}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              무료 상담받기
            </button>
          </div>
          <button
            onClick={scrollToForm}
            className="md:hidden bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            무료 상담받기
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            무점포 창업 전문 컨설팅
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            현재 존재하는 사업 중<br />
            <span className="text-blue-600">가장 쉽고 빠르게</span><br />
            수익 발생이 가능합니다
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            대리운전 · 퀵서비스 · 꽃배달<br />
            위탁 콜센터 시스템으로 안정적인 수익을 만들어 드립니다
          </p>
          <button
            onClick={scrollToForm}
            className="btn-primary text-xl animate-pulse-slow"
          >
            지금 바로 무료 상담받기
          </button>
          <p className="mt-4 text-gray-500 text-sm">✓ 상담은 무료입니다</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="section-title text-white">혼자 창업하면 왜 어려울까요?</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="text-4xl mb-4">💸</div>
              <h4 className="text-xl font-bold mb-3">높은 초기 비용</h4>
              <p className="text-gray-400">콜센터 구축, 시스템 개발, 인력 채용 등 수천만 원의 초기 투자가 필요합니다</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="text-4xl mb-4">😰</div>
              <h4 className="text-xl font-bold mb-3">운영 노하우 부재</h4>
              <p className="text-gray-400">어떻게 고객을 모으고, 기사를 관리하고, 클레임을 처리해야 할지 막막합니다</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="text-4xl mb-4">⏰</div>
              <h4 className="text-xl font-bold mb-3">24시간 운영 부담</h4>
              <p className="text-gray-400">콜센터는 24시간 운영되어야 하지만 혼자서는 불가능합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="section-title">멀티고가 해결해 드립니다</h3>
          <p className="section-subtitle">
            내가 혼자 창업한다면 많은 비용이 들어가지만<br />
            <strong className="text-blue-600">합리적인 비용으로 성공 창업을 이끕니다</strong>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚗</span>
              </div>
              <h4 className="font-bold text-lg mb-2">대리운전</h4>
              <p className="text-gray-600 text-sm">검증된 콜센터 시스템으로 안정적인 콜 공급</p>
            </div>
            <div className="text-center p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h4 className="font-bold text-lg mb-2">퀵서비스</h4>
              <p className="text-gray-600 text-sm">지역 기반 퀵서비스 운영 노하우 전수</p>
            </div>
            <div className="text-center p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💐</span>
              </div>
              <h4 className="font-bold text-lg mb-2">꽃배달</h4>
              <p className="text-gray-600 text-sm">전국 네트워크 연계로 주문 확보</p>
            </div>
            <div className="text-center p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h4 className="font-bold text-lg mb-2">위탁 콜센터</h4>
              <p className="text-gray-600 text-sm">24시간 전문 콜센터 운영 대행</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={scrollToForm} className="btn-primary">
              나도 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            &ldquo;창업을 가르치지 않습니다&rdquo;
          </h3>
          <p className="text-3xl md:text-5xl font-bold mb-8">
            <span className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg inline-block">&lsquo;살아남는 구조&rsquo;</span>
            <span className="block mt-4">를 만들어드립니다</span>
          </p>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            단순히 창업 방법만 알려주는 것이 아닙니다.<br />
            실제로 수익이 발생하고, 지속 가능한 사업 구조를 함께 만들어갑니다.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="section-title">멀티고만의 차별화된 시스템</h3>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">검증된 콜센터 시스템</h4>
                  <p className="text-gray-600">이미 운영 중인 콜센터에 합류하여 안정적인 콜 위탁이 가능합니다.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">낮은 초기 비용</h4>
                  <p className="text-gray-600">시스템 구축 비용 없이 합리적인 가입비만으로 시작할 수 있습니다. 리스크를 최소화하고 수익에 집중하세요.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">24시간 운영 지원</h4>
                  <p className="text-gray-600">혼자 밤새울 필요 없습니다. 전문 상담원이 24시간 콜을 접수하고 배차해드립니다.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">지속적인 교육 & 지원</h4>
                  <p className="text-gray-600">창업 후에도 지속적인 운영 노하우 공유와 문제 해결을 도와드립니다. 혼자가 아닙니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="section-title">성공 사례</h3>
          <p className="section-subtitle">멀티고와 함께 성공적으로 창업한 분들의 이야기</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">김</div>
                <div>
                  <h4 className="font-bold">김OO 대표님</h4>
                  <p className="text-sm text-gray-500">대리운전 · 창업 8개월</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;처음엔 반신반의했는데, 시작하자마자 콜이 들어오더라고요. 지금은 월 <strong className="text-blue-600">순수익 400만 원</strong> 이상 나오고 있습니다. 혼자 했으면 절대 못 했을 거예요.&rdquo;
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">박</div>
                <div>
                  <h4 className="font-bold">박OO 대표님</h4>
                  <p className="text-sm text-gray-500">퀵서비스 · 창업 1년 2개월</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;퇴직 후 뭘 해야 할지 막막했는데, 멀티고 덕분에 제2의 인생을 시작했습니다. 시스템이 잘 되어 있어서 <strong className="text-green-600">운영이 정말 편합니다.</strong>&rdquo;
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">이</div>
                <div>
                  <h4 className="font-bold">이OO 대표님</h4>
                  <p className="text-sm text-gray-500">꽃배달 · 창업 6개월</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;꽃집 경험 전혀 없이 시작했어요. 전국 네트워크 덕분에 주문이 꾸준히 들어오고, <strong className="text-pink-600">기념일 시즌엔 정신없이 바빠요!</strong>&rdquo;
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={scrollToForm} className="btn-primary">
              나도 성공 사례가 되고 싶다
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            지금이 시작할 때입니다
          </h3>
          <p className="text-xl text-blue-100 mb-4">
            무점포 창업, 더 이상 미루지 마세요.<br />
            지금 상담받고 한 달 후 수익을 만들어 보세요.
          </p>
          <p className="text-lg text-yellow-300 font-bold mb-8">
            고민만 하시면 절대! 아무 일도 일어나지 않습니다!!
          </p>
          <button onClick={scrollToForm} className="bg-white text-blue-600 font-bold py-4 px-10 rounded-lg text-xl hover:bg-blue-50 transition-colors">
            무료 상담 신청하기
          </button>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="section-title">무료 상담 신청</h3>
          <p className="section-subtitle">
            아래 정보를 남겨주시면 전문 상담원이 친절히 안내해 드립니다
          </p>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="홍길동"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="010-1234-5678"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                상담 문의
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="궁금하신 점이나 관심 있는 분야를 적어주세요"
              />
            </div>
            {submitResult && (
              <div className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {submitResult.message}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '전송 중...' : '상담 신청하기'}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              개인정보는 상담 목적으로만 사용됩니다
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <img
              src="/멀티고_로고_단독버젼_v1-removebg-preview.png"
              alt="멀티고"
              className="h-12 mx-auto mb-2 brightness-0 invert"
            />
            <p className="text-sm">무점포 창업의 새로운 시작</p>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="text-center text-sm space-y-2">
              <p>상호: 제이코리아 | 대표: 이주영</p>
              <p>사업자등록번호: 278-30-01540</p>
              <p>주소: 인천광역시 계양구 오조산로57번길 15, 7층 7106호</p>
            </div>
          </div>
          <div className="text-center mt-8 text-xs text-gray-600">
            © 2024 멀티고. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Kakao Floating Button */}
      <a
        href="http://pf.kakao.com/_pxgQxbC/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
      >
        <img
          src="/카톡_원형_로고.png"
          alt="카카오톡 상담"
          className="w-full h-full rounded-full"
        />
      </a>
    </main>
  )
}
