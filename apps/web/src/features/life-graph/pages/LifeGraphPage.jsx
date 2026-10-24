import React, { useState } from 'react'
import { Filter, Minus, Plus, Search, Sparkles } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import GraphCanvas from '@/features/life-graph/components/GraphCanvas'
import GraphDetailPanel from '@/features/life-graph/components/GraphDetailPanel'
import InsightsModal from '@/features/life-graph/components/InsightsModal'
import { graphTypeLabels } from '@/mocks/data'

const LifeGraphPage = () => {
  const [selectedId, setSelectedId] = useState('macbook')
  const [query, setQuery] = useState('')
  const [hiddenTypes, setHiddenTypes] = useState([])
  const [zoom, setZoom] = useState(1)
  const [insightsOpen, setInsightsOpen] = useState(false)

  const toggleType = (type) =>
    setHiddenTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]))

  return (
    <>
      <PageHeader
        title="LifeGraph"
        description="See how every item, document, cost, and deadline connects."
        actions={<Button variant="secondary" onClick={() => setInsightsOpen(true)}><Sparkles size={16} aria-hidden="true" /> Discover insights</Button>}
      />

      <div className="graph">
        <section className="panel graph__main" aria-label="Graph">
          <div className="graph__toolbar">
            <div className="input-wrap graph__search">
              <Search size={18} className="input-icon" aria-hidden="true" />
              <input
                type="search" className="input input-search" placeholder="Find anything in your graph" aria-label="Find in graph"
                autoCapitalize="none" autoCorrect="off" value={query} onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Dropdown
              triggerClassName="btn btn--secondary"
              ariaLabel="Filter by record type"
              trigger={<><Filter size={16} aria-hidden="true" /> Filter</>}
              items={Object.entries(graphTypeLabels).map(([type, label]) => ({
                key: type, label, role: 'menuitemcheckbox', checked: !hiddenTypes.includes(type), keepOpen: true, onSelect: () => toggleType(type),
              }))}
            />
          </div>
          <GraphCanvas selectedId={selectedId} onSelect={setSelectedId} hiddenTypes={hiddenTypes} query={query} zoom={zoom} />
          <div className="graph__zoomctl" role="group" aria-label="Zoom">
            <button type="button" className="btn btn--ghost btn--icon" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))}><Minus size={16} aria-hidden="true" /></button>
            <button type="button" className="graph__zoomval tabular" onClick={() => setZoom(1)} aria-label="Reset zoom">{Math.round(zoom * 100)}%</button>
            <button type="button" className="btn btn--ghost btn--icon" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.2).toFixed(1)))}><Plus size={16} aria-hidden="true" /></button>
          </div>
        </section>
        <GraphDetailPanel nodeId={selectedId} onSelect={setSelectedId} />
      </div>

      <InsightsModal open={insightsOpen} onClose={() => setInsightsOpen(false)} />
    </>
  )
}

export default LifeGraphPage
