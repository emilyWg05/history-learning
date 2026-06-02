import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-[rgb(244,240,231)]">
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-4 pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
