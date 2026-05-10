import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songCulture } from '../data/song'
import { yuanCulture } from '../data/yuan'
import { mingCulture } from '../data/ming'
import { tangCulture } from '../data/tang'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songCulture,
  yuan: yuanCulture,
  ming: mingCulture,
  tang: tangCulture,
}

export default function Culture() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="文化" articles={articles} />
}
