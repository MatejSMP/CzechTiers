import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortablePlayer({ player, isAdmin }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: player.id,
    data: {
      type: 'Player',
      player,
    },
    disabled: !isAdmin
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...(isAdmin ? attributes : {})} 
      {...(isAdmin ? listeners : {})}
      className={`player-card ${isAdmin ? 'admin-mode' : ''}`}
    >
      <img src={player.avatar} alt={player.name} className="player-avatar" />
      <span className="player-name">{player.name}</span>
    </div>
  );
}

export function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <img src={player.avatar} alt={player.name} className="player-avatar" />
      <span className="player-name">{player.name}</span>
    </div>
  );
}
