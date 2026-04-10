import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  pointerWithin, 
  closestCorners,
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ShieldAlert, Trash2, PlusCircle, CheckCircle2, Trophy, Download, RotateCcw } from 'lucide-react';
import { initialData } from '../data';
import { TierRow } from './TierRow';
import { PlayerCard } from './Player';
import { hashString } from '../utils/crypto';

export default function RankingPage({ players: initialPlayers, sitePassword }) {
  const [tiers] = useState(initialData.tiers);
  const [categories] = useState(initialData.categories || []);
  const [currentCategory, setCurrentCategory] = useState(initialData.categories?.[0]?.id || 'cat-overall');
  
  // Load initial players from localStorage if available
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('czechtiers_players');
    return saved ? JSON.parse(saved) : initialPlayers;
  });
  
  const [adminInput, setAdminInput] = useState('');
  const isAdmin = hashString(adminInput) === '36cd579784d354983326cb7e87e7bbb69d412fe957e1e1ce0bad11251b08ed0f';

  // Save players to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('czechtiers_players', JSON.stringify(players));
  }, [players]);

  // Reset category if it's cheaters but admin is turned off
  useEffect(() => {
    if (!isAdmin && currentCategory === 'cat-cheaters') {
      setCurrentCategory(initialData.categories?.[0]?.id || 'cat-overall');
    }
  }, [isAdmin, currentCategory]);

  const [activePlayer, setActivePlayer] = useState(null);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerAvatar, setNewPlayerAvatar] = useState('https://mc-heads.net/avatar/Steve');
  const [useCustomAvatar, setUseCustomAvatar] = useState(false);



  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const getPlayerById = (id) => players.find((p) => p.id === id);

  const onDragStart = (event) => {
    const { active } = event;
    const player = getPlayerById(active.id);
    if (player) setActivePlayer(player);
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActivePlayer = active.data.current?.type === 'Player';
    const isOverPlayer = over.data.current?.type === 'Player';
    const isOverTier = over.data.current?.type === 'Tier';
    const isOverTrash = over.id === 'trash-zone';

    if (!isActivePlayer) return;

    if (isOverTrash) return; // handled in drag end

    // Dragging over another player
    if (isOverPlayer) {
      setPlayers((prev) => {
        const activeIndex = prev.findIndex((p) => p.id === activeId);
        const overIndex = prev.findIndex((p) => p.id === overId);
        
        let newPlayers = [...prev];
        if (newPlayers[activeIndex].tierId !== newPlayers[overIndex].tierId) {
          newPlayers[activeIndex] = { ...newPlayers[activeIndex], tierId: newPlayers[overIndex].tierId };
          return arrayMove(newPlayers, activeIndex, overIndex);
        }
        return arrayMove(newPlayers, activeIndex, overIndex);
      });
    }

    // Dragging over an empty tier
    if (isOverTier) {
      setPlayers((prev) => {
        const activeIndex = prev.findIndex((p) => p.id === activeId);
        const newPlayers = [...prev];
        if (newPlayers[activeIndex].tierId !== overId) {
          newPlayers[activeIndex] = { ...newPlayers[activeIndex], tierId: overId };
          return newPlayers;
        }
        return prev;
      });
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActivePlayer(null);

    if (!over) return;

    if (over.id === 'trash-zone') {
      setPlayers((prev) => prev.filter(p => p.id !== active.id));
    }
  };

  const handleAddPlayer = () => {
    if (!newPlayerName) return;
    const newPlayer = {
      id: `player-${Date.now()}`,
      name: newPlayerName,
      avatar: newPlayerAvatar || 'https://mc-heads.net/avatar/Steve',
      tierId: tiers[0].id, // Default to highest tier initially
      categoryId: currentCategory
    };
    setPlayers(prev => [...prev, newPlayer]);
    setShowAddModal(false);
    setNewPlayerName('');
    setUseCustomAvatar(false);
  };

  const handleExportData = () => {
    const dataString = JSON.stringify(players, null, 2);
    navigator.clipboard.writeText(dataString);
    alert('Data byla zkopírována do schránky! Pošli mi je sem, abych mohl web zaktualizovat pro všechny.');
  };

  const handleResetData = () => {
    if (window.confirm('Opravdu chceš smazat všechny svoje změny a vrátit se k původnímu nastavení?')) {
      setPlayers(initialPlayers);
      localStorage.removeItem('czechtiers_players');
    }
  };

  const displayedPlayers = players.filter(p => p.categoryId === currentCategory);

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', left: '40px', zIndex: 10 }}>
        <h2 style={{ color: 'var(--text-main)', margin: 0, fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>CzechTiers</h2>
      </div>

      <main className="main-content" style={{ paddingLeft: 0, paddingRight: 0, paddingTop: '80px' }}>
        <div className="content-wrapper" style={{ padding: '0 40px' }}>
          
          <div className="categories-nav" style={{ margin: 0, padding: 0 }}>
            {categories
              .filter(cat => cat.id !== 'cat-cheaters' || isAdmin)
              .map(cat => (
                <div 
                  key={cat.id}
                  className={`category-tab ${currentCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setCurrentCategory(cat.id)}
                >
                  {cat.icon === 'trophy' 
                    ? <Trophy size={28} className="category-icon" style={{ strokeWidth: 1.5, color: '#e6e600', marginBottom: '8px' }} />
                    : cat.icon && <img src={cat.icon} alt={cat.label} className="category-icon" />
                  }
                  <span className="category-label">{cat.label}</span>
                </div>
              ))}
          </div>

          <header className="header" style={{ marginTop: '30px' }}>
            <h1 className="title">{categories.find(c => c.id === currentCategory)?.label} Rankings</h1>
          </header>

          <div className="admin-topbar">
            {isAdmin && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handleExportData} 
                  className="btn" 
                  style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <Download size={14} /> Export pro web
                </button>
                <button 
                  onClick={handleResetData} 
                  className="btn" 
                  style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 59, 48, 0.1)', color: 'var(--error)', border: '1px solid rgba(255, 59, 48, 0.2)' }}
                >
                  <RotateCcw size={14} /> Reset
                </button>
                <div className="badge"><ShieldAlert size={16}/> Admin Mode</div>
              </div>
            )}
            <input 
              type="password" 
              placeholder="Admin Code..." 
              value={adminInput}
              onChange={e => setAdminInput(e.target.value)}
              className="admin-input" 
            />
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          >
            <div className="tiers-container">
              {tiers.map((tier) => (
                <TierRow 
                  key={tier.id} 
                  tier={tier} 
                  players={displayedPlayers.filter(p => p.tierId === tier.id)} 
                  isAdmin={isAdmin} 
                />
              ))}
            </div>

            {isAdmin && (
              <div style={{ marginTop: 24, display: 'flex', gap: 20 }}>
                <button className="add-player-btn" onClick={() => setShowAddModal(true)}>
                  <PlusCircle size={24} />
                  <span>Add</span>
                </button>
                <TrashZone />
              </div>
            )}

            <DragOverlay>
              {activePlayer ? <PlayerCard player={activePlayer} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>

      {/* Add Player Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Player</h3>
            <input 
              type="text" 
              placeholder="Player Name" 
              className="input-field" 
              value={newPlayerName}
              onChange={e => {
                setNewPlayerName(e.target.value);
                if (!useCustomAvatar) {
                  setNewPlayerAvatar(`https://mc-heads.net/avatar/${e.target.value}`);
                }
              }}
              style={{ textAlign: 'left' }}
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <input 
                type="checkbox" 
                id="customAvatarToggle" 
                checked={useCustomAvatar} 
                onChange={(e) => {
                  setUseCustomAvatar(e.target.checked);
                  if (!e.target.checked) setNewPlayerAvatar(`https://mc-heads.net/avatar/${newPlayerName || 'Steve'}`);
                }}
              />
              <label htmlFor="customAvatarToggle" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Use custom image URL</label>
            </div>

            {useCustomAvatar && (
              <input 
                type="text" 
                placeholder="https://..." 
                className="input-field" 
                value={newPlayerAvatar}
                onChange={e => setNewPlayerAvatar(e.target.value)}
                style={{ textAlign: 'left', marginBottom: 20 }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img src={newPlayerAvatar} width={40} height={40} style={{ borderRadius: 4, background: 'var(--bg-color)', imageRendering: 'pixelated', objectFit: 'cover' }} />
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Preview</span>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn" onClick={handleAddPlayer}>Add to Tier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Separate component to hook into dnd context easily
import { useDroppable } from '@dnd-kit/core';
function TrashZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash-zone',
    data: { type: 'Trash' }
  });

  return (
    <div ref={setNodeRef} className={`trash-zone ${isOver ? 'is-over' : ''}`}>
      <Trash2 size={24} /> Drag here to delete player
    </div>
  );
}
