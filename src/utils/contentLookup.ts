import { songEmperors, songFigures, songTimeline, songPolitics, songEconomy, songCulture, songMilitary, songDiplomacy, songSociety, songEthnicGroups } from '../data/song'
import { yuanEmperors, yuanFigures, yuanTimeline, yuanPolitics, yuanEconomy, yuanCulture, yuanMilitary, yuanDiplomacy, yuanSociety, yuanEthnicGroups } from '../data/yuan'
import { mingEmperors, mingFigures, mingTimeline, mingPolitics, mingEconomy, mingCulture, mingMilitary, mingDiplomacy, mingSociety, mingEthnicGroups } from '../data/ming'
import { tangEmperors, tangFigures, tangTimeline, tangPolitics, tangEconomy, tangCulture, tangMilitary, tangDiplomacy, tangSociety, tangEthnicGroups } from '../data/tang'
import { wudaiEmperors, wudaiFigures, wudaiTimeline, wudaiPolitics, wudaiEconomy, wudaiCulture, wudaiMilitary, wudaiDiplomacy, wudaiSociety, wudaiEthnicGroups } from '../data/wudai'
import type { Emperor, Figure, TimelineEvent, Article } from '../types/content'

const allEmperors: Emperor[] = [...songEmperors, ...yuanEmperors, ...mingEmperors, ...tangEmperors, ...wudaiEmperors]
const allFigures: Figure[] = [...songFigures, ...yuanFigures, ...mingFigures, ...tangFigures, ...wudaiFigures]
const allEvents: TimelineEvent[] = [...songTimeline, ...yuanTimeline, ...mingTimeline, ...tangTimeline, ...wudaiTimeline]
const allArticles: Article[] = [
  ...songPolitics, ...songEconomy, ...songCulture, ...songMilitary, ...songDiplomacy, ...songSociety, ...songEthnicGroups,
  ...yuanPolitics, ...yuanEconomy, ...yuanCulture, ...yuanMilitary, ...yuanDiplomacy, ...yuanSociety, ...yuanEthnicGroups,
  ...mingPolitics, ...mingEconomy, ...mingCulture, ...mingMilitary, ...mingDiplomacy, ...mingSociety, ...mingEthnicGroups,
  ...tangPolitics, ...tangEconomy, ...tangCulture, ...tangMilitary, ...tangDiplomacy, ...tangSociety, ...tangEthnicGroups,
  ...wudaiPolitics, ...wudaiEconomy, ...wudaiCulture, ...wudaiMilitary, ...wudaiDiplomacy, ...wudaiSociety, ...wudaiEthnicGroups,
]

const emperorMap = new Map(allEmperors.map((e) => [e.id, e]))
const figureMap = new Map(allFigures.map((f) => [f.id, f]))
const eventMap = new Map(allEvents.map((e) => [e.id, e]))
const articleMap = new Map(allArticles.map((a) => [a.id, a]))

export function lookupEmperor(id: string): Emperor | undefined {
  return emperorMap.get(id)
}

export function lookupFigure(id: string): Figure | undefined {
  return figureMap.get(id)
}

export function lookupEvent(id: string): TimelineEvent | undefined {
  return eventMap.get(id)
}

export function lookupArticle(id: string): Article | undefined {
  return articleMap.get(id)
}
