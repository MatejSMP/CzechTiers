import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortablePlayer } from './Player';

export function TierRow({ tier, players, isAdmin }) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
    data: {
      type: 'Tier',
      tier,
    },
    disabled: !isAdmin
  });

  return (
    <div className="tier-row">
      <div className="tier-label" style={{ color: tier.color }}>
        {tier.title}
      </div>
      <div 
        ref={setNodeRef} 
        className={`tier-items ${isAdmin ? 'admin-mode' : ''}`}
      >
        <SortableContext 
          id={tier.id}
          items={players.map(p => p.id)} 
          strategy={horizontalListSortingStrategy}
        >
          {players.map((player) => (
            <SortablePlayer 
              key={player.id} 
              player={player} 
              isAdmin={isAdmin} 
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
