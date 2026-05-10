import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songPolitics } from '../data/song'
import { yuanPolitics } from '../data/yuan'
import { mingPolitics } from '../data/ming'
import { tangPolitics } from '../data/tang'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songPolitics,
  yuan: yuanPolitics,
  ming: mingPolitics,
  tang: tangPolitics,
}

export default function Politics() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="政治" articles={articles} />
}
