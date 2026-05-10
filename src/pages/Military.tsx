import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songMilitary } from '../data/song'
import { yuanMilitary } from '../data/yuan'
import { mingMilitary } from '../data/ming'
import { tangMilitary } from '../data/tang'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songMilitary,
  yuan: yuanMilitary,
  ming: mingMilitary,
  tang: tangMilitary,
}

export default function Military() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="军事" articles={articles} />
}
