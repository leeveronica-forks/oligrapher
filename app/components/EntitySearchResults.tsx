import React from 'react'
import { useSelector } from 'react-redux'
import { FiExternalLink } from 'react-icons/fi'

import { LsNode } from '../datasources/littlesis3'
import { StateWithHistory } from '../util/defaultState'

export function SearchResult({ entity, onClick }: SearchResultProps) {
  return (
    <div className="entity-search-result">
      <a onClick={() => onClick(entity)}><b>{entity.name}</b></a>
      { entity.url && 
        <a className="entity-external-link" href={entity.url} target="_blank" rel="noopener noreferrer">
          <FiExternalLink />
        </a> 
      }
      { entity.description && <div className="entity-search-description">{entity.description}</div> }
    </div>
  )
}

interface SearchResultProps {
  entity: LsNode,
  onClick: (entity: LsNode) => any
}

export default function EntitySearchResults({ results, onClick }: EntitySearchResultsProps) {
  const existingNodeIds = useSelector<StateWithHistory, string[]>(state => Object.keys(state.graph.nodes))
  const visibleResults = results.filter(entity => !existingNodeIds.includes(entity.id))

  return (
    <div className="entity-search-results">
      { visibleResults.map(entity => (
          <SearchResult 
            onClick={onClick}
            entity={entity}
            key={entity.id} />
        )) 
      }
    </div>
  )
}

interface EntitySearchResultsProps {
  results: LsNode[],
  onClick: (entity: LsNode) => any
}
