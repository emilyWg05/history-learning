import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songSociety } from '../data/song'
import { yuanSociety } from '../data/yuan'
import { mingSociety } from '../data/ming'
import { tangSociety } from '../data/tang'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songSociety,
  yuan: yuanSociety,
  ming: mingSociety,
  tang: tangSociety,
}

export default function Society() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="社会" articles={articles} />
}
