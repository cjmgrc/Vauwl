import React from 'react'
import { graphEdges, graphNodes } from '@/mocks/data'

const GraphCanvas = ({ selectedId, onSelect, hiddenTypes, query, zoom }) => {
  const visible = graphNodes.filter((n) => !hiddenTypes.includes(n.type))
  const visibleIds = new Set(visible.map((n) => n.id))
  const q = query.trim().toLowerCase()
  const matches = (node) => !q || node.label.toLowerCase().includes(q)
  const byId = Object.fromEntries(graphNodes.map((n) => [n.id, n]))

  return (
    <div className="graph__scroll">
      <svg className="graph__svg" viewBox="0 0 800 520" role="group" aria-label="Graph of connected records">
        <g transform={`translate(400 260) scale(${zoom}) translate(-400 -260)`} className="graph__zoom">
          {graphEdges
            .filter(([a, b]) => visibleIds.has(a) && visibleIds.has(b))
            .map(([a, b]) => (
              <line
                key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
                className={`graph__edge${a === selectedId || b === selectedId ? ' is-linked' : ''}`}
              />
            ))}
          {visible.map((node) => (
            <g
              key={node.id} role="button" tabIndex={0} aria-pressed={node.id === selectedId} aria-label={`${node.label}, ${node.kicker}`}
              className={`gnode gnode--${node.type}${node.id === selectedId ? ' is-selected' : ''}${matches(node) ? '' : ' is-dim'}`}
              transform={`translate(${node.x} ${node.y})`}
              onClick={() => onSelect(node.id)}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(node.id) } }}
            >
              <circle r="30" className="gnode__ring" />
              <circle r="24" className="gnode__body" />
              <text className="gnode__short" textAnchor="middle" dominantBaseline="central">{node.short}</text>
              <text className="gnode__label" y="46" textAnchor="middle">{node.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default GraphCanvas
