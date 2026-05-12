import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songDiplomacy } from '../data/song'
import { yuanDiplomacy } from '../data/yuan'
import { mingDiplomacy } from '../data/ming'
import { tangDiplomacy } from '../data/tang'
import { wudaiDiplomacy } from '../data/wudai'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songDiplomacy,
  yuan: yuanDiplomacy,
  ming: mingDiplomacy,
  tang: tangDiplomacy,
  wudai: wudaiDiplomacy,
}

export default function Diplomacy() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="外交" articles={articles} />
}
