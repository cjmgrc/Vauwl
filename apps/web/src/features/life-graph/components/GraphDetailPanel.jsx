import React from 'react'
import { ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { graphEdges, graphNodes, graphTypeLabels } from '@/mocks/data'

const GraphDetailPanel = ({ nodeId, onSelect }) => {
  const node = graphNodes.find((n) => n.id === nodeId)
  if (!node) return null
  const neighbors = graphEdges
    .filter(([a, b]) => a === node.id || b === node.id)
    .map(([a, b]) => graphNodes.find((n) => n.id === (a === node.id ? b : a)))

  return (
    <aside className="panel graph__panel" aria-labelledby="graph-detail-title">
      <div className="panel__body">
        <p className="muted">{node.kicker}</p>
        <h2 id="graph-detail-title" className="panel__title">{node.label}</h2>
        <p className="muted">{node.subtitle}</p>
        <div className="graph__value">
          <span className="muted">{node.valueLabel}</span>
          <b className="tabular">{node.value}</b>
        </div>
      </div>
      <h3 className="graph__subhead">Connected records</h3>
      <ul className="rows">
        {neighbors.map((n) => (
          <li key={n.id}>
            <button type="button" className="row row--button" onClick={() => onSelect(n.id)}>
              <div className="row__text">
                <p className="row__title">{n.label}</p>
                <p className="muted row__sub">{graphTypeLabels[n.type]}: {n.value}</p>
              </div>
              <ChevronRight size={18} aria-hidden="true" className="muted" />
            </button>
          </li>
        ))}
      </ul>
      {node.type === 'item' && (
        <div className="panel__body">
          <Button variant="primary" block to={`/inventory?q=${encodeURIComponent(node.label)}`}>Open in inventory</Button>
        </div>
      )}
    </aside>
  )
}

export default GraphDetailPanel
