import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollBorder from './ScrollBorder'

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <ScrollBorder />
      <Header />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-4 pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
