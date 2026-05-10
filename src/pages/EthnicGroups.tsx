import { useParams } from 'react-router-dom'
import ModulePage from '../components/ui/ModulePage'
import { songEthnicGroups } from '../data/song'
import { yuanEthnicGroups } from '../data/yuan'
import { mingEthnicGroups } from '../data/ming'
import { tangEthnicGroups } from '../data/tang'
import type { Article } from '../types/content'

const eraArticles: Record<string, Article[]> = {
  song: songEthnicGroups,
  yuan: yuanEthnicGroups,
  ming: mingEthnicGroups,
  tang: tangEthnicGroups,
}

export default function EthnicGroups() {
  const { eraId } = useParams()
  const articles = eraId ? (eraArticles[eraId] ?? []) : []
  return <ModulePage title="民族" articles={articles} />
}
