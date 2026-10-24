import { costSeries } from '@/mocks/data'
import { formatCurrency } from '@/lib/format'

const has = (text, pattern) => pattern.test(text.toLowerCase())

const itemRecord = (item) => ({ id: item.id, title: item.name, detail: item.note, to: `/inventory?q=${encodeURIComponent(item.name)}` })

// Keyword matching over saved records. Replace with the API's natural-language search later.
export const answerQuery = (question, { items, documents }) => {
  if (has(question, /warrant|cover|expir/)) {
    const covered = items.filter((i) => ['expiring', 'protected'].includes(i.status))
    if (!covered.length) return { summary: 'No items with warranty records yet.', records: [] }
    const soonest = covered.filter((i) => i.dueInDays != null).sort((a, b) => a.dueInDays - b.dueInDays)[0]
    return {
      summary: `${covered.length} items have warranty or coverage records.${soonest ? ` ${soonest.name} ends first, in ${soonest.dueInDays} days.` : ''}`,
      records: covered.map(itemRecord),
    }
  }

  if (has(question, /spen|cost|expens|maintenance/)) {
    const total = costSeries.current.reduce((sum, v) => sum + v, 0)
    const maintenance = Math.round(total * 0.232)
    return {
      summary: `You recorded ${formatCurrency(total)} in ownership costs over the last 12 months. About ${formatCurrency(maintenance)} of that was maintenance.`,
      records: [{ id: 'truecost', title: 'TrueCost analytics', detail: 'See the full breakdown', to: '/truecost' }],
    }
  }

  if (has(question, /attention|due|need|action|this month|week/)) {
    const due = items.filter((i) => ['expiring', 'action', 'maintenance'].includes(i.status))
    return {
      summary: due.length ? `${due.length} items need attention soon.` : 'Nothing needs attention right now.',
      records: due.sort((a, b) => (a.dueInDays ?? 99) - (b.dueInDays ?? 99)).map(itemRecord),
    }
  }

  if (has(question, /office|work|desk|setup/)) {
    const work = items.filter((i) => i.category === 'Work')
    const docs = documents.filter((d) => work.some((i) => i.id === d.itemId))
    return {
      summary: `${work.length} work items and ${docs.length} linked documents.`,
      records: [
        ...work.map(itemRecord),
        ...docs.map((d) => ({ id: d.id, title: d.name, detail: d.category, to: `/documents?q=${encodeURIComponent(d.name)}` })),
      ],
    }
  }

  const matched = items.filter((i) => question.toLowerCase().includes(i.name.split(' ')[0].toLowerCase()))
  if (matched.length) return { summary: `Found ${matched.length} matching ${matched.length === 1 ? 'item' : 'items'}.`, records: matched.map(itemRecord) }

  return null
}
