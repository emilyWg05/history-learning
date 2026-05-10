import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import EraOverview from './pages/EraOverview'
import Emperors from './pages/Emperors'
import Politics from './pages/Politics'
import Economy from './pages/Economy'
import Culture from './pages/Culture'
import Military from './pages/Military'
import Diplomacy from './pages/Diplomacy'
import Society from './pages/Society'
import EthnicGroups from './pages/EthnicGroups'
import Figures from './pages/Figures'
import Timeline from './pages/Timeline'
import Review from './pages/Review'

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:eraId" element={<EraOverview />} />
          <Route path="/:eraId/emperors" element={<Emperors />} />
          <Route path="/:eraId/politics" element={<Politics />} />
          <Route path="/:eraId/economy" element={<Economy />} />
          <Route path="/:eraId/culture" element={<Culture />} />
          <Route path="/:eraId/military" element={<Military />} />
          <Route path="/:eraId/diplomacy" element={<Diplomacy />} />
          <Route path="/:eraId/society" element={<Society />} />
          <Route path="/:eraId/ethnic-groups" element={<EthnicGroups />} />
          <Route path="/:eraId/figures" element={<Figures />} />
          <Route path="/:eraId/timeline" element={<Timeline />} />
          <Route path="/review" element={<Review />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
