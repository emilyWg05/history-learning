import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songEconomy } from '../data/song'
import { yuanEconomy } from '../data/yuan'
import { mingEconomy } from '../data/ming'
import { tangEconomy } from '../data/tang'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songEconomy,
  yuan: yuanEconomy,
  ming: mingEconomy,
  tang: tangEconomy,
}

export default function Economy() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="经济" articles={articles} />
}
