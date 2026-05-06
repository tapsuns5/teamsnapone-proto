// @ts-nocheck
import React from "react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Download, Plus, ChevronLeft, ChevronRight, ChevronDown, Search, Calendar, Info, Clock, Edit2, MoreVertical, Archive, Upload, ExternalLink, Filter, Check, X, Zap, Settings } from 'lucide-react';

const BL = "#2563EB", BLP = "#EFF6FF", BLD = "#1d4ed8";
const OR = "#F57C00", GR = "#16a34a", RD = "#dc2626", AM = "#d97706";
const G50 = "#f9fafb", G100 = "#f3f4f6", G200 = "#e5e7eb", G300 = "#d1d5db";
const G400 = "#9ca3af", G500 = "#6b7280", G600 = "#4b5563", G700 = "#374151";
const G800 = "#1f2937", G900 = "#111827";

function Btn({ children, variant = "o", size = "m", onClick, style = {}, disabled = false }) {
  const sz = { s: { padding: "5px 11px", fontSize: 12 }, m: { padding: "7px 14px", fontSize: 13 } };
  const vr = {
    p: { background: BL, borderColor: BL, color: "#fff" },
    o: { background: "#fff", borderColor: G300, color: G700 },
    g: { background: "transparent", borderColor: "transparent", color: G500 },
  };
  return (
    <button disabled={disabled} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid", borderRadius: 7, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, whiteSpace: "nowrap", fontFamily: "inherit", ...sz[size], ...vr[variant], ...style }}>
      {children}
    </button>
  );
}

function CB({ on, onChange, half = false }) {
  return (
    <div onClick={e => { e.stopPropagation(); onChange(!on); }}
      style={{ width: 17, height: 17, border: `1.5px solid ${on ? BL : G300}`, borderRadius: 4, background: on ? BL : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#fff", fontSize: 11, fontWeight: 700 }}>
      {on ? "✓" : half ? "–" : ""}
    </div>
  );
}

function Tog({ on, set }) {
  return (
    <div onClick={() => set(!on)} style={{ width: 40, height: 22, borderRadius: 11, background: on ? BL : G300, cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", width: 18, height: 18, background: "#fff", borderRadius: "50%", top: 2, left: on ? 20 : 2, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </div>
  );
}

function Badge({ children, color = "gray" }) {
  const c = { gray: { background: G100, color: G600 }, orange: { background: "#FFF3E0", color: OR }, green: { background: "#f0fdf4", color: GR }, blue: { background: BLP, color: BLD } };
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, ...(c[color] || c.gray) }}>{children}</span>;
}

function DD({ trigger, children, right = false, w = 190 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const close = () => setOpen(false);
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div style={{ position: "absolute", [right ? "right" : "left"]: 0, top: "calc(100% + 4px)", background: "#fff", border: `1px solid ${G200}`, borderRadius: 9, boxShadow: "0 8px 28px rgba(0,0,0,.15)", zIndex: 100, minWidth: w, overflow: "hidden" }}>
          {children && React.Children.map(children, c => c && typeof c === "object" ? React.cloneElement(c, { _close: close }) : c)}
        </div>
      )}
    </div>
  );
}

function DDItem({ children, onClick, hi, sub, _close }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseDown={e => e.preventDefault()} onClick={() => { onClick && onClick(); _close && setTimeout(_close, 0); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: sub ? "6px 14px 6px 24px" : "9px 14px", fontSize: sub ? 12 : 13, cursor: "pointer", color: hi ? BLD : sub ? G600 : G700, fontWeight: hi ? 700 : 400, background: hi && !h ? BLP : h ? G50 : "transparent" }}>
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
}
function DDSep() { return <div style={{ height: 1, background: G100, margin: "3px 0" }} />; }
function DDLbl({ children }) { return <div style={{ padding: "7px 14px 2px", fontSize: 10, fontWeight: 700, color: G400, textTransform: "uppercase", letterSpacing: ".06em" }}>{children}</div>; }

function Chip({ label, value, opts, onSel, name }) {
  const active = value && !value.startsWith("All") && value !== "";
  return (
    <DD w={220} trigger={
      <button type="button" className={`rounded-full border ${active ? 'border-solid border-admin-action-border bg-admin-action-background-weak-pressed' : 'border-dashed border-neutral-border-medium'} hover:border-admin-action-border px-2 py-[2px] pl-1 flex min-h-[32px] cursor-pointer items-center gap-1 whitespace-nowrap data-[state=open]:border-admin-action-border data-[state=open]:bg-admin-action-background-weak-pressed min-w-[100px]`} name={name}>
        <div className="flex items-center gap-[4px] !font-semibold text-label">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={active ? "M20 6L9 17l-5-5" : "M12 5v14M5 12h14"}/></svg>
           {active ? `${label}: ${value}` : label}
        </div>
      </button>
    }>
      {opts.map((o, i) => {
        const val = o.v ?? o; const lbl = o.l ?? o;
        if (o.divHdr) return <DDLbl key={i}>{o.l}</DDLbl>;
        const isSub = lbl.startsWith("\u00a0");
        return <DDItem key={i} sub={isSub} onClick={() => onSel(val.trim())}>{lbl.trim()}</DDItem>;
      })}
    </DD>
  );
}

const DIVS = [
  { id: "8u", name: "8U", l: "8U", teams: ["Dodgers", "Marlins", "Yankees", "Red Sox", "Cubs", "Giants", "Astros", "Braves", "Mets", "Cardinals"] },
  { id: "9u", name: "9U", l: "9U", teams: ["Tigers", "Athletics", "Phillies", "Rays", "Blue Jays", "Rangers", "Brewers", "Diamondbacks", "Angels", "Guardians"] },
  { id: "10u", name: "10U", l: "10U", teams: ["White Sox", "Padres", "Mariners", "Rockies", "Orioles", "Royals", "Pirates", "Nationals", "Reds", "Twins"] }
];

const SCHED_TEAMS = { 
  "Fall 2026 Season": ["Dodgers", "Marlins", "Tigers", "White Sox"],
  "Spring 2026 Make-ups": ["Yankees", "Athletics", "Padres"]
};

const EVTS = [
  // ── SAT MAY 3 ──
  { id: 1,  date: "Sat May 3, 2026", time: "9:00 AM – 10:15 AM PT",  home: "Dodgers",    away: "Marlins",     venue: "Central Sports Park", sub: "West Stadium",  type: "game",     pub: "published", status: "scheduled", div: "8U",   sch: "Fall 2026 Season" },
  { id: 2,  date: "Sat May 3, 2026", time: "10:30 AM – 11:45 AM PT", home: "Yankees",    away: "Red Sox",     venue: "Central Sports Park", sub: "West Stadium",  type: "game",     pub: "published", status: "scheduled", div: "8U",   sch: "Fall 2026 Season" },
  { id: 3,  date: "Sat May 3, 2026", time: "12:00 PM – 1:15 PM PT",  home: "Tigers", away: "Athletics", venue: "Central Sports Park", sub: "East Field",  type: "game",     pub: "draft",     status: "scheduled", div: "9U",   sch: "Fall 2026 Season" },
  { id: 4,  date: "Sat May 3, 2026", time: "1:30 PM – 2:45 PM PT",   home: "White Sox",       away: "Padres",      venue: "Central Sports Park", sub: "North Diamond",  type: "game",     pub: "draft",     status: "scheduled", div: "10U",   sch: "Fall 2026 Season" },
  { id: 5,  date: "Sat May 3, 2026", time: "3:00 PM – 4:15 PM PT",   home: "Cubs",    away: "Giants",   venue: "Central Sports Park", sub: "South Pitch",  type: "game",     pub: "draft",     status: "scheduled", div: "8U",   sch: "Fall 2026 Season" },
  // ── SUN MAY 4 ──
  { id: 6,  date: "Sun May 4, 2026", time: "9:00 AM – 10:15 AM PT",  home: "Phillies",  away: "Rays",     venue: "Brooke St. Park", sub: "Upper Field", type: "game",     pub: "published", status: "scheduled", div: "9U", sch: "Spring 2026 Make-ups" },
  { id: 7,  date: "Sun May 4, 2026", time: "10:30 AM – 11:45 AM PT", home: "Mariners",  away: "Rockies", venue: "Brooke St. Park", sub: "Lower Field", type: "game",     pub: "draft",     status: "scheduled", div: "10U", sch: "Spring 2026 Make-ups" },
  { id: 8,  date: "Sun May 4, 2026", time: "12:00 PM – 1:15 PM PT",  home: "Orioles",   away: "Royals",  venue: "Hilltop Complex", sub: "Grandstand", type: "game",     pub: "draft",     status: "scheduled", div: "10U", sch: "Spring 2026 Make-ups" },
  { id: 9,  date: "Sun May 4, 2026", time: "1:30 PM – 2:45 PM PT",   home: "Pirates",  away: "Nationals", venue: "Hilltop Complex", sub: "South Field", type: "game",     pub: "draft",     status: "scheduled", div: "10U", sch: "Spring 2026 Make-ups" },
  { id: 10, date: "Sun May 4, 2026", time: "3:00 PM – 4:15 PM PT",   home: "Dodgers",   away: "",               venue: "Central Sports Park", sub: "Practice Area", type: "practice", pub: "draft",     status: "scheduled", div: "8U",   sch: "Fall 2026 Season" },
];
const TDOT = { game: "#22c55e", practice: OR, other: BL };
const WIZ_STEPS = ["Details & Playing Groups", "Availability & Venues", "Review & Generate"];
const WIZ_SUBS = ["Select divisions and configure team playing groups for scheduling", "Configure venues, availability, and scheduling constraints", "Confirm settings and generate the draft schedule"];

function WStep0({ ws, set }) {
  const [divisionDropdownOpen, setDivisionDropdownOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState(new Set());
  const [draggedTeam, setDraggedTeam] = useState(null);
  const [draggedFromDivId, setDraggedFromDivId] = useState(null);

  const toggleDivision = (divId) => {
    set(s => {
      const newDivs = s.divs.includes(divId) ? s.divs.filter(d => d !== divId) : [...s.divs, divId];
      const div = DIVS.find(d => d.id === divId);
      const newPlayingGroupNames = s.playingGroupNames || {};
      if (!s.divs.includes(divId) && div) {
        // Initialize the playing group name to "{division name} Divisions"
        newPlayingGroupNames[divId] = `${div.name} Divisions`;
      }
      return { ...s, divs: newDivs, playingGroupNames: newPlayingGroupNames };
    });
  };

  const removeDivision = (divId) => {
    set(s => ({ ...s, divs: s.divs.filter(d => d !== divId) }));
  };

  const toggleGroupExpansion = (divId) => {
    setExpandedGroups(prev => ({ ...prev, [divId]: !prev[divId] }));
  };

  const toggleTeamSelection = (team) => {
    setSelectedTeams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(team)) {
        newSet.delete(team);
      } else {
        newSet.add(team);
      }
      return newSet;
    });
  };

  const addTeamsToPlayingGroups = () => {
    if (selectedTeams.size > 0) {
      set(s => {
        const newCustomTeams = s.customTeams || {};
        const newDivs = [...s.divs];
        const newPlayingGroupNames = s.playingGroupNames || {};
        const newCustomDivs = s.customDivs || new Set();
        
        // For each selected team, find its division and add it
        Array.from(selectedTeams).forEach(team => {
          // Find which division this team belongs to
          for (const div of DIVS) {
            if (div.teams.includes(team)) {
              // If this division is not already in ws.divs, add it as a custom division
              if (!newDivs.includes(div.id)) {
                newDivs.push(div.id);
                newPlayingGroupNames[div.id] = `${div.name} Divisions`;
                newCustomDivs.add(div.id);
              }
              // Add the team to the division's custom teams
              const divTeams = newCustomTeams[div.id] || [];
              if (!divTeams.includes(team)) {
                newCustomTeams[div.id] = [...divTeams, team];
              }
              break;
            }
          }
        });
        
        return {
          ...s,
          divs: newDivs,
          customTeams: newCustomTeams,
          playingGroupNames: newPlayingGroupNames,
          customDivs: newCustomDivs
        };
      });
    }
    setSelectedTeams(new Set());
    setAddTeamModalOpen(false);
  };

  const handleDragStart = (team, divId) => {
    setDraggedTeam(team);
    setDraggedFromDivId(divId);
  };

  const handleDropOnNotPlaying = () => {
    if (draggedTeam && draggedFromDivId) {
      set(s => {
        const newNotPlayingTeams = s.notPlayingTeams || [];
        if (!newNotPlayingTeams.includes(draggedTeam)) {
          // Remove from custom teams if it was there
          const newCustomTeams = s.customTeams || {};
          if (newCustomTeams[draggedFromDivId]) {
            newCustomTeams[draggedFromDivId] = newCustomTeams[draggedFromDivId].filter(t => t !== draggedTeam);
          }
          return {
            ...s,
            customTeams: newCustomTeams,
            notPlayingTeams: [...newNotPlayingTeams, draggedTeam]
          };
        }
        return s;
      });
      setDraggedTeam(null);
      setDraggedFromDivId(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Schedule name</label>
            <div>
              <input 
                style={{ padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }}
                type="text" 
                placeholder="Ex: U10 2025 Fall" 
                value={ws.name}
                onChange={e => set(s => ({ ...s, name: e.target.value }))}
              />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Schedule games for teams in</label>
            <div style={{ position: "relative" }}>
              <button 
                type="button"
                onClick={() => setDivisionDropdownOpen(!divisionDropdownOpen)}
                style={{ width: "100%", padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 24, textAlign: "left", display: "flex", alignItems: "center", gap: 8, background: "#fff", minHeight: 48, cursor: "pointer" }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, flex: 1 }}>
                  {ws.divs.length === 0 ? (
                    <span style={{ color: G500, padding: "0 8px" }}>Select divisions...</span>
                  ) : (
                    ws.divs.map(divId => {
                      const div = DIVS.find(d => d.id === divId);
                      return div ? (
                        <div key={divId} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#eff6ff", borderRadius: 8 }}>
                          <span style={{ fontSize: 12, color: G700, fontWeight: 500 }}>{div.name}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeDivision(divId); }}
                            style={{ display: "grid", placeContent: "center", borderRadius: "50%", border: "1px solid transparent", color: G500, background: "transparent", width: 24, height: 24, minWidth: 24, cursor: "pointer", padding: 0 }}
                            type="button"
                            aria-label={`Remove ${div.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ) : null;
                    })
                  )}
                </div>
                <span style={{ color: G400, flexShrink: 0 }}>▼</span>
              </button>
              {divisionDropdownOpen && (
                <div style={{ position: "absolute", zIndex: 10, width: "100%", marginTop: 4, background: "#fff", border: `1px solid ${G300}`, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: 8 }}>
                  {DIVS.map(div => {
                    const isSelected = ws.divs.includes(div.id);
                    return (
                      <div
                        key={div.id}
                        onClick={() => { toggleDivision(div.id); }}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, cursor: "pointer", background: "transparent", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ width: 20, height: 20, border: `2px solid ${isSelected ? BL : G300}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: isSelected ? BL : "#fff" }}>
                          {isSelected && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 500, color: G700 }}>{div.name}</span>
                        <span style={{ fontSize: 12, color: G500 }}>({div.teams.length} teams)</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {ws.divs.length > 0 && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: G900, marginBottom: 8 }}>Playing groups</h3>
            <p style={{ fontSize: 14, color: G500, lineHeight: 1.5 }}>Your playing group defines who match ups will be created against in the auto-scheduler. You can create matchups within one division, multiple divisions, or even one division and select specific teams from other divisions.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ borderRadius: 16, border: `1px solid ${G200}`, background: "#fff", transition: "all 0.2s" }}>
                <div style={{ padding: "12px 16px", borderRadius: "16px 16px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: G900 }}>Schedule</span>
                    <span style={{ fontSize: 12, color: G500 }}>
                      {ws.divs.reduce((acc, divId) => {
                        const div = DIVS.find(d => d.id === divId);
                        if (!div) return acc;
                        const customTeams = ws.customTeams?.[divId] || [];
                        const notPlayingTeams = ws.notPlayingTeams || [];
                        return acc + [...div.teams, ...customTeams].filter(team => !notPlayingTeams.includes(team)).length;
                      }, 0)} teams
                    </span>
                  </div>
                  <button onClick={() => setExpandedGroups({})} style={{ cursor: "pointer", background: "none", border: "none", padding: 4, fontSize: 20 }}>
                    ▼
                  </button>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {ws.divs.map(divId => {
                      const div = DIVS.find(d => d.id === divId);
                      if (!div) return null;
                      const customTeams = ws.customTeams?.[divId] || [];
                      const notPlayingTeams = ws.notPlayingTeams || [];
                      const isCustomDiv = ws.customDivs?.has(divId);
                      const allTeams = isCustomDiv 
                        ? customTeams.filter(team => !notPlayingTeams.includes(team))
                        : [...div.teams, ...customTeams].filter(team => !notPlayingTeams.includes(team));
                      const playingGroupName = ws.playingGroupNames?.[divId] || `${div.name} Divisions`;
                      return (
                        <div key={divId} style={{ padding: 12, background: "#f9fafb", borderRadius: 12, border: `1px solid ${G200}` }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                            <input 
                              type="text"
                              value={playingGroupName}
                              onChange={e => set(s => ({ ...s, playingGroupNames: { ...(s.playingGroupNames || {}), [divId]: e.target.value } }))}
                              style={{ fontSize: 14, fontWeight: 600, color: G700, border: "none", background: "transparent", padding: 0, width: "auto", minWidth: 120, fontFamily: "inherit", outline: "none" }}
                            />
                            <button onClick={() => removeDivision(divId)} style={{ display: "grid", placeContent: "center", borderRadius: "50%", border: "1px solid transparent", color: RD, background: "transparent", width: 24, height: 24, minWidth: 24, cursor: "pointer", padding: 0 }} type="button" aria-label="Delete division">
                              🗑
                            </button>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 }}>
                            {allTeams.map(team => (
                              <div 
                                key={team} 
                                draggable 
                                onDragStart={() => handleDragStart(team, divId)}
                                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 16, border: `1px solid ${G200}`, cursor: "grab", transition: "all 0.2s", opacity: 1, background: "#fff", userSelect: "none", fontSize: 12 }}
                              >
                                <span style={{ color: G400, fontSize: 10 }}>⋮⋮</span>
                                <span style={{ fontSize: 12, fontWeight: 500, color: G700 }}>{team}</span>
                                <span style={{ width: 12, height: 12, borderRadius: "50%", background: G100, color: G500, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700 }}>{div.name.toLowerCase()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", border: `1px solid ${G300}`, borderRadius: 6, background: "#fff", color: G700, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                <span style={{ fontSize: 18 }}>+</span>
                Add custom playing group
              </button>
              <button type="button" onClick={() => setAddTeamModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", border: `1px solid ${G300}`, borderRadius: 6, background: "#fff", color: G700, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                <span style={{ fontSize: 18 }}>+</span>
                Add a team
              </button>
            </div>
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropOnNotPlaying}
              style={{ borderRadius: 16, border: `1px dashed ${G400}`, background: "#f9fafb", transition: "all 0.2s" }}
            >
              <div style={{ padding: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: G500 }}>Not playing</span>
                <p style={{ fontSize: 12, color: G500, marginTop: 4 }}>Teams here are excluded from schedule</p>
              </div>
              <div style={{ padding: "0 16px 16px" }}>
                {ws.notPlayingTeams && ws.notPlayingTeams.length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {ws.notPlayingTeams.map(team => (
                      <div key={team} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 20, border: `1px solid ${G200}`, background: "#fff" }}>
                        <span style={{ color: G400, fontSize: 14 }}>⋮⋮</span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: G700 }}>{team}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 12, color: G400, fontStyle: "italic", textAlign: "center", padding: "16px 0" }}>No teams excluded from schedule</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Team Modal */}
      {addTeamModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 500, maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: G900 }}>Add Teams to Playing Group</h3>
              <button onClick={() => { setAddTeamModalOpen(false); setSelectedTeams(new Set()); }} style={{ display: "grid", placeContent: "center", borderRadius: "50%", border: "1px solid transparent", color: G500, background: "transparent", width: 32, height: 32, minWidth: 32, cursor: "pointer", padding: 0 }} type="button" aria-label="Close">
                ×
              </button>
            </div>
            <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
              <p style={{ fontSize: 14, color: G500, marginBottom: 12 }}>Select teams to add to your playing groups:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {DIVS.map(div => {
                  // Get custom teams that were already added to this playing group
                  const customTeams = ws.customTeams?.[div.id] || [];
                  const existingCustomTeams = new Set(customTeams);
                  // Filter out only custom teams that were already added, not original division teams
                  const availableTeams = div.teams.filter(team => !existingCustomTeams.has(team));
                  
                  if (availableTeams.length === 0) return null;
                  
                  return (
                    <div key={div.id}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: G700, marginBottom: 4 }}>{div.name}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 12 }}>
                        {availableTeams.map(team => (
                          <div 
                            key={team} 
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, border: `1px solid ${selectedTeams.has(team) ? BL : G200}`, cursor: "pointer", transition: "background 0.2s", background: selectedTeams.has(team) ? "#eff6ff" : "#fff" }}
                          >
                            <input 
                              type="checkbox" 
                              checked={selectedTeams.has(team)}
                              onChange={() => toggleTeamSelection(team)}
                              onClick={(e) => e.stopPropagation()}
                              style={{ width: 16, height: 16, cursor: "pointer" }} 
                            />
                            <span style={{ fontSize: 14, color: G700 }}>{team}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ padding: "16px 20px", borderTop: `1px solid ${G200}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => { setAddTeamModalOpen(false); setSelectedTeams(new Set()); }} style={{ padding: "8px 16px", border: `1px solid ${G300}`, borderRadius: 6, background: "#fff", color: G700, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
              <button onClick={addTeamsToPlayingGroups} style={{ padding: "8px 16px", border: "none", borderRadius: 6, background: BL, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                Add Teams
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WStep1({ ws, set }) {
  const [expandedVenues, setExpandedVenues] = useState({});
  const [venueTimeSlots, setVenueTimeSlots] = useState({});
  const [venueTravelTimes, setVenueTravelTimes] = useState({});
  
  const VENS = [
    { name: "Riverbend High School", subs: [{ name: "Field 1 - Turf", max: 2 }, { name: "Field 2 - Grass", max: 2 }] },
    { name: "Riverbend Stadium", subs: [{ name: "Field 1 - Turf", max: 1 }] },
    { name: "Memorial Park", subs: [{ name: "Field 1 - Grass", max: 1 }, { name: "Field 2 - Grass", max: 1 }] },
  ];

  const toggleVenueExpansion = (venueName) => {
    setExpandedVenues(prev => ({ ...prev, [venueName]: !prev[venueName] }));
  };

  const tog = (vi, si) => set(s => { const k = `${vi}-${si}`; const n = new Set(s.subs); n.has(k) ? n.delete(k) : n.add(k); return { ...s, subs: n }; });

  const addTimeSlot = (venueKey) => {
    setVenueTimeSlots(prev => {
      const slots = prev[venueKey] || [{ days: ['Sat', 'Sun'], startTime: '09:00' }];
      return { ...prev, [venueKey]: [...slots, { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], startTime: '09:00' }] };
    });
  };

  const removeTimeSlot = (venueKey, index) => {
    setVenueTimeSlots(prev => {
      const slots = prev[venueKey] || [];
      if (slots.length <= 1) return prev;
      return { ...prev, [venueKey]: slots.filter((_, i) => i !== index) };
    });
  };

  const updateTimeSlot = (venueKey, index, field, value) => {
    setVenueTimeSlots(prev => {
      const slots = prev[venueKey] || [{ days: ['Sat', 'Sun'], startTime: '09:00' }];
      const updatedSlots = [...slots];
      if (field === 'days') {
        const currentDays = updatedSlots[index].days || [];
        updatedSlots[index] = { ...updatedSlots[index], days: currentDays.includes(value) ? currentDays.filter(d => d !== value) : [...currentDays, value] };
      } else {
        updatedSlots[index] = { ...updatedSlots[index], [field]: value };
      }
      return { ...prev, [venueKey]: updatedSlots };
    });
  };

  const calculateEndTime = (startTime) => {
    const gameDuration = parseInt(ws.dur.replace(' min', '')) || 75;
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + gameDuration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  // Calculate required slots based on setup
  const calculateRequiredSlots = () => {
    const selectedDivs = DIVS.filter(d => ws.divs.includes(d.id));
    const totalTeams = selectedDivs.reduce((acc, d) => acc + d.teams.length, 0);
    const gamesPerTeam = parseInt(ws.gpt) || 10;
    const totalGames = Math.ceil((totalTeams * gamesPerTeam) / 2);
    const gameDuration = parseInt(ws.dur) || 75;
    return { totalGames, gameDuration };
  };

  // Calculate weeks from date range
  const calculateWeeks = () => {
    const startDate = new Date(ws.start);
    const endDate = new Date(ws.end);
    const weeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));
    return weeks;
  };

  // Calculate available hours based on selected venues
  const calculateAvailableHours = () => {
    let totalHours = 0;
    const weeks = calculateWeeks();
    
    ws.subs.forEach(key => {
      const [vi, si] = key.split("-").map(Number);
      const v = VENS[vi];
      if (v && v.subs[si]) {
        const maxConcurrent = v.subs[si].max || 1;
        // Assuming default 8 hours per day for simplicity
        totalHours += 8 * 7 * weeks * maxConcurrent;
      }
    });
    
    return totalHours;
  };

  const { totalGames, gameDuration } = calculateRequiredSlots();
  const weeks = calculateWeeks();
  const availableHours = calculateAvailableHours();
  const neededHours = totalGames * (gameDuration / 60);
  const hasConflict = availableHours < neededHours;
  const additionalHoursNeeded = Math.max(0, neededHours - availableHours);
  const gamesUnscheduled = hasConflict ? Math.floor(additionalHoursNeeded / (gameDuration / 60)) : 0;

  return (
    <>
      {/* Schedule Rules */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: G900, marginBottom: 8 }}>Schedule Rules</h3>
        <div style={{ display: "flex", background: "#f9fafb", border: `1px solid ${G200}`, borderRadius: 16, padding: 8, flexDirection: "row", gap: 8 }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Games per team</label>
            <input 
              type="number" 
              value={ws.gpt}
              onChange={e => set(s => ({ ...s, gpt: e.target.value }))}
              style={{ padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Max games per week</label>
            <input 
              type="number" 
              value={ws.gpw}
              onChange={e => set(s => ({ ...s, gpw: e.target.value }))}
              style={{ padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Game duration</label>
            <input 
              type="number" 
              value={ws.dur.replace(' min', '')}
              onChange={e => set(s => ({ ...s, dur: e.target.value + ' min' }))}
              style={{ padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 16, marginTop: 8, padding: 8, background: "#f9fafb", border: `1px solid ${G200}`, borderRadius: 16 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input 
              type="checkbox" 
              checked={ws.allowByeWeeks || false}
              onChange={e => set(s => ({ ...s, allowByeWeeks: e.target.checked }))}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ fontSize: 14, color: G700 }}>Allow bye weeks</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input 
              type="checkbox" 
              checked={ws.allowDoubleHeaders || false}
              onChange={e => set(s => ({ ...s, allowDoubleHeaders: e.target.checked }))}
              style={{ width: 18, height: 18, cursor: "pointer" }}
            />
            <span style={{ fontSize: 14, color: G700 }}>Allow double headers</span>
          </label>
        </div>
      </div>

      {/* Time Window */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: G900, marginBottom: 8 }}>Time Window</h3>
        <div style={{ display: "flex", background: "#f9fafb", border: `1px solid ${G200}`, borderRadius: 16, padding: 8, flexDirection: "row", gap: 8 }}>
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Start date</label>
            <input 
              type="date" 
              value={ws.start}
              onChange={e => set(s => ({ ...s, start: e.target.value }))}
              style={{ padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>End date</label>
            <input 
              type="date" 
              value={ws.end}
              onChange={e => set(s => ({ ...s, end: e.target.value }))}
              style={{ padding: "8px 12px", border: `1px solid ${G300}`, borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }}
            />
          </div>
        </div>
        <div style={{ fontSize: 14, color: G500, marginTop: 8 }}>{weeks} weeks in schedule window</div>
      </div>

      {/* Game Slots */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, marginTop: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: G900 }}>Game Slots</h3>
          <button type="button" style={{ fontSize: 14, fontWeight: 500, color: G700, cursor: "pointer", padding: "6px 12px", border: "none", background: "none", fontFamily: "inherit" }}>Bulk edit venue availability</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {VENS.map((v, vi) => {
            const isExpanded = expandedVenues[v.name] !== false;
            return (
              <div key={vi} style={{ borderRadius: 16, border: `1px solid ${G200}`, background: "#fff" }}>
                <div style={{ padding: "12px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: G900 }}>{v.name}</span>
                    <button style={{ display: "grid", placeContent: "center", borderRadius: "50%", border: "1px solid transparent", color: G500, background: "transparent", width: 32, height: 32, minWidth: 32, cursor: "pointer", padding: 0 }} type="button" aria-label="Edit venue">
                      ✏
                    </button>
                  </div>
                  <button onClick={() => toggleVenueExpansion(v.name)} style={{ cursor: "pointer", background: "none", border: "none", padding: 4, fontSize: 20 }}>
                    {isExpanded ? '▼' : '▲'}
                  </button>
                </div>
                {isExpanded && (
                  <div style={{ padding: "12px 12px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {v.subs.map((sv, si) => {
                      const key = `${vi}-${si}`;
                      const isSelected = ws.subs.has(key);
                      return (
                        <div key={si} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <input 
                                type="checkbox" 
                                checked={isSelected}
                                onChange={() => tog(vi, si)}
                                style={{ width: 16, height: 16, cursor: "pointer" }}
                              />
                              <label style={{ fontSize: 14, fontWeight: 500, color: G700, cursor: "pointer" }}>{sv.name}</label>
                            </div>
                          </div>
                          {isSelected && (
                            <div style={{ paddingLeft: 24, padding: 12, background: "#f9fafb", borderRadius: 8, border: `1px solid ${G200}` }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: G700, marginBottom: 8 }}>Availability</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {(venueTimeSlots[key] || [{ days: ['Sat', 'Sun'], startTime: '09:00' }]).map((slot, slotIndex) => (
                                  <div key={slotIndex} style={{ padding: 8, background: "#fff", borderRadius: 6, border: `1px solid ${G200}` }}>
                                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <label key={day} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                                          <input 
                                            type="checkbox" 
                                            checked={slot.days?.includes(day) || false}
                                            onChange={() => updateTimeSlot(key, slotIndex, 'days', day)}
                                            style={{ width: 16, height: 16, cursor: "pointer" }} 
                                          />
                                          <span style={{ fontSize: 13, color: G700 }}>{day}</span>
                                        </label>
                                      ))}
                                    </div>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                                      <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: 12, color: G500, display: "block", marginBottom: 2 }}>Start time</label>
                                        <input 
                                          type="time" 
                                          value={slot.startTime || '09:00'}
                                          onChange={(e) => updateTimeSlot(key, slotIndex, 'startTime', e.target.value)}
                                          style={{ padding: "6px 10px", border: `1px solid ${G300}`, borderRadius: 6, fontSize: 13, width: "100%", fontFamily: "inherit", outline: "none" }}
                                        />
                                      </div>
                                      <span style={{ fontSize: 13, color: G500, marginTop: 14 }}>to</span>
                                      <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: 12, color: G500, display: "block", marginBottom: 2 }}>End time</label>
                                        <input 
                                          type="time" 
                                          value={calculateEndTime(slot.startTime || '09:00')}
                                          disabled
                                          style={{ padding: "6px 10px", border: `1px solid ${G200}`, borderRadius: 6, fontSize: 13, width: "100%", fontFamily: "inherit", outline: "none", background: "#f9fafb", color: G500 }}
                                        />
                                      </div>
                                      {(venueTimeSlots[key]?.length || 1) > 1 && (
                                        <button 
                                          type="button" 
                                          onClick={() => removeTimeSlot(key, slotIndex)}
                                          style={{ fontSize: 12, color: RD, cursor: "pointer", padding: "4px 8px", border: `1px solid ${G300}`, borderRadius: 4, background: "#fff", fontFamily: "inherit", marginTop: 14 }}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                <button 
                                  type="button" 
                                  onClick={() => addTimeSlot(key)}
                                  style={{ fontSize: 12, color: G700, cursor: "pointer", padding: "4px 8px", border: `1px solid ${G300}`, borderRadius: 4, background: "#fff", fontFamily: "inherit", alignSelf: "flex-start" }}
                                >
                                  + Add game slot
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div style={{ fontSize: 14, color: G500, marginTop: 4 }}>Total available: 0 hrs</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Travel Time Between Venues */}
      {ws.allowDoubleHeaders && (
        <div style={{ marginTop: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: G900, marginBottom: 8 }}>Travel Time Between Venues</h3>
          <div style={{ background: "#f9fafb", border: `1px solid ${G200}`, borderRadius: 16, padding: 12 }}>
            <p style={{ fontSize: 14, color: G500, marginBottom: 12 }}>Set travel time between venues for back-to-back games</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VENS.map((v1, vi1) => (
                VENS.filter((v2, vi2) => vi2 > vi1).map((v2, vi2) => (
                  <div key={`${vi1}-${vi2}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, background: "#fff", borderRadius: 8 }}>
                    <span style={{ fontSize: 14, color: G700, flex: 1 }}>{v1.name}</span>
                    <span style={{ fontSize: 14, color: G500 }}>→</span>
                    <span style={{ fontSize: 14, color: G700, flex: 1 }}>{v2.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input 
                        type="number" 
                        placeholder="0"
                        min="0"
                        value={venueTravelTimes[`${vi1}-${vi2}`] || ''}
                        onChange={(e) => setVenueTravelTimes(prev => ({ ...prev, [`${vi1}-${vi2}`]: e.target.value }))}
                        style={{ width: 80, padding: "6px 10px", border: `1px solid ${G300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none" }}
                      />
                      <span style={{ fontSize: 13, color: G500 }}>min</span>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div style={{ marginTop: 12, borderRadius: 16, border: `1px solid ${G200}`, background: "#f9fafb", padding: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, color: G500 }}>Total available</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: G900 }}>{Math.round(availableHours)} hrs</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, color: G500 }}>Needed for all games</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: G900 }}>{Math.round(neededHours)} hrs</span>
          </div>
          <div style={{ borderTop: `1px solid ${G200}` }}></div>
          {hasConflict ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: RD }}>
                <span style={{ fontSize: 20 }}>⚠</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Insufficient venue availability</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "spaceBetween", paddingLeft: 24 }}>
                <span style={{ fontSize: 14, color: G700 }}>Additional hours needed</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: G700 }}>{Math.round(additionalHoursNeeded)} hrs</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 24 }}>
                <span style={{ fontSize: 14, color: G700 }}>Games unscheduled</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: G700 }}>{gamesUnscheduled} games</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Add more venues */}
      <div style={{ marginTop: 12 }}>
        <button type="button" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", border: `1px solid ${G300}`, borderRadius: 6, background: "#fff", color: G700, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
          Add more venues
        </button>
      </div>
    </>
  );
}

function BlackoutAdd({ onAdd }) {
  const [s, setS] = useState(""); const [e, setE] = useState(""); const [l, setL] = useState("");
  const inp = { padding: "7px 9px", border: `1px solid ${G300}`, borderRadius: 7, fontSize: 12, width: "100%", fontFamily: "inherit" };
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
      <div style={{ flex: 1, minWidth: 100 }}><label style={{ fontSize: 12, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Start Date</label><input type="date" value={s} onChange={ev => setS(ev.target.value)} style={inp} /></div>
      <div style={{ flex: 1, minWidth: 100 }}><label style={{ fontSize: 12, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>End Date</label><input type="date" value={e} onChange={ev => setE(ev.target.value)} style={inp} /></div>
      <div style={{ flex: 2, minWidth: 120 }}><label style={{ fontSize: 12, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Label</label><input value={l} onChange={ev => setL(ev.target.value)} placeholder="e.g. Fall Break" style={inp} /></div>
      <Btn size="s" onClick={() => { if (!s) return; onAdd({ s, e, lbl: l }); setS(""); setE(""); setL(""); }} style={{ marginBottom: 1 }}>Add</Btn>
    </div>
  );
}

function VenueSubRow({ sv, vi, si, sel, onToggle, wins, setWins }) {
  const addWin = () => setWins(w => [...w, { day: "Sat", start: "09:00", end: "17:00" }]);
  const remWin = i => setWins(w => w.filter((_, j) => j !== i));
  const updWin = (i, k, v) => setWins(w => { const n = [...w]; n[i] = { ...n[i], [k]: v }; return n; });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${G100}` }}>
        <CB on={sel} onChange={onToggle} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{sv.name}</div>
          {sv.bouts && sv.bouts.map((b, bi) => <div key={bi} style={{ fontSize: 11, color: RD, marginTop: 2 }}>⛔ Venue blackout: {b}</div>)}
        </div>
      </div>
      {sel && (
        <div style={{ padding: "10px 14px", background: G50, borderBottom: `1px solid ${G100}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G600, textTransform: "uppercase", marginBottom: 8 }}>Availability for this schedule</div>
          {wins.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 9px", background: "#fff", borderRadius: 7, marginBottom: 6, fontSize: 12 }}>
              <select value={w.day} onChange={e => updWin(i, "day", e.target.value)} style={{ padding: "4px 6px", border: `1px solid ${G300}`, borderRadius: 5, fontSize: 12, fontFamily: "inherit" }}>
                {days.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="time" value={w.start} onChange={e => updWin(i, "start", e.target.value)} style={{ padding: "4px 6px", border: `1px solid ${G300}`, borderRadius: 5, fontSize: 12, fontFamily: "inherit" }} />
              <span style={{ color: G400, flexShrink: 0 }}>to</span>
              <input type="time" value={w.end} onChange={e => updWin(i, "end", e.target.value)} style={{ padding: "4px 6px", border: `1px solid ${G300}`, borderRadius: 5, fontSize: 12, fontFamily: "inherit" }} />
              <button onClick={() => remWin(i)} style={{ background: "none", border: "none", cursor: "pointer", color: G400, fontSize: 17, lineHeight: 1, flexShrink: 0 }}>×</button>
            </div>
          ))}
          <button onClick={addWin} style={{ fontSize: 12, color: BL, fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>+ Add availability window</button>
        </div>
      )}
    </div>
  );
}

function BulkAvailabilityModal({ visible, onClose, selectedVenues, onSave }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [wins, setWins] = useState([{ day: "Sat", start: "09:00", end: "17:00" }]);
  const addWin = () => setWins(w => [...w, { day: "Sat", start: "09:00", end: "17:00" }]);
  const remWin = i => setWins(w => w.filter((_, j) => j !== i));
  const updWin = (i, k, v) => setWins(w => { const n = [...w]; n[i] = { ...n[i], [k]: v }; return n; });
  if (!visible) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
      <div style={{ background: "#fff", borderRadius: 12, width: 540, maxWidth: "95%", boxShadow: "0 20px 60px rgba(0,0,0,.25)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 0" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Bulk Update Availability</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: G400, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "6px 22px 0", fontSize: 13, color: G500 }}>
          These time windows will be applied to all selected sub-venues.
        </div>
        {/* Selected venues list */}
        <div style={{ margin: "14px 22px", background: G50, border: `1px solid ${G200}`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: G500, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>Applying to</div>
          {selectedVenues.length === 0
            ? <div style={{ fontSize: 13, color: G400 }}>No sub-venues selected. Select sub-venues in the venue list first.</div>
            : selectedVenues.map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: G700, marginBottom: 4 }}>
                <span style={{ color: GR, fontSize: 14 }}>✓</span> {v}
              </div>
            ))
          }
        </div>
        {/* Availability windows */}
        <div style={{ padding: "0 22px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: G700, marginBottom: 10 }}>Availability windows</div>
          {wins.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 9px", background: G50, borderRadius: 7, marginBottom: 6, fontSize: 12 }}>
              <select value={w.day} onChange={e => updWin(i, "day", e.target.value)} style={{ padding: "5px 7px", border: `1px solid ${G300}`, borderRadius: 5, fontSize: 12, fontFamily: "inherit" }}>
                {days.map(d => <option key={d}>{d}</option>)}
              </select>
              <input type="time" value={w.start} onChange={e => updWin(i, "start", e.target.value)} style={{ padding: "5px 7px", border: `1px solid ${G300}`, borderRadius: 5, fontSize: 12, fontFamily: "inherit" }} />
              <span style={{ color: G400, flexShrink: 0 }}>to</span>
              <input type="time" value={w.end} onChange={e => updWin(i, "end", e.target.value)} style={{ padding: "5px 7px", border: `1px solid ${G300}`, borderRadius: 5, fontSize: 12, fontFamily: "inherit" }} />
              <button onClick={() => remWin(i)} style={{ background: "none", border: "none", cursor: "pointer", color: G400, fontSize: 17, lineHeight: 1, flexShrink: 0 }}>×</button>
            </div>
          ))}
          <button onClick={addWin} style={{ fontSize: 12, color: BL, fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>+ Add window</button>
        </div>
        {/* Footer */}
        <div style={{ padding: "14px 22px 20px", borderTop: `1px solid ${G100}`, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="p" style={{ background: BL, borderColor: BL, color: "#fff" }} onClick={() => { onSave(wins); onClose(); }}>Apply to all selected</Btn>
        </div>
      </div>
    </div>
  );
}

function WStep2({ ws, mode, initialWs, onGen, generating, genPct, genMsg }) {
  const isEdit = mode === "edit";
  const [scope, setScope] = useState("all");
  const [keepEdits, setKeepEdits] = useState(true);
  const selDivs = DIVS.filter(d => ws.divs.includes(d.id));
  if (generating) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 18 }}>
      <div style={{ width: 54, height: 54, border: "3.5px solid #e5e7eb", borderTopColor: BL, borderRadius: "50%", animation: "spin .7s linear infinite" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{isEdit ? "Regenerating Schedule…" : "Generating Schedule…"}</div>
        <div style={{ fontSize: 13, color: G500, marginBottom: 14, minHeight: 20 }}>{genMsg}</div>
        <div style={{ width: 260, height: 5, background: G200, borderRadius: 3, overflow: "hidden", margin: "0 auto" }}>
          <div style={{ height: "100%", background: BL, width: `${genPct}%`, transition: "width .3s" }} />
        </div>
      </div>
    </div>
  );
  const VENUE_NAMES = [
    { name: "Springfield High School", subs: ["Field 1 – Turf", "Field 2 – Grass"] },
    { name: "Riverside Community Park", subs: ["Diamond A", "Diamond B"] },
  ];
  const selSubNames = [...ws.subs].map(k => {
    const [vi, si] = k.split("-").map(Number);
    const v = VENUE_NAMES[vi]; if (!v) return null;
    return `${v.subs[si]} (${v.name})`;
  }).filter(Boolean);
  const timeBlocks = ws.days.flatMap(d => ws.wins.filter(w => w.day === d).map(w => `${d} ${w.start}–${w.end}`));
  const blackoutStr = ws.bouts.length
    ? ws.bouts.map(b => b.lbl ? `${b.lbl} (${b.s}${b.e && b.e !== b.s ? " – " + b.e : ""})` : b.s + (b.e && b.e !== b.s ? " – " + b.e : "")).join(", ")
    : "None";
  // Compute which fields changed vs. the initial snapshot (edit mode only)
  const ini = initialWs || {};
  const iniDivStr = (ini.divs || []).slice().sort().join(",");
  const iniSubStr = [...(ini.subs || [])].slice().sort().join(",");
  const iniDayStr = (ini.days || []).join(",");
  const iniWinStr = JSON.stringify(ini.wins || []);
  const iniBoutStr = JSON.stringify(ini.bouts || []);
  const changed = isEdit ? {
    name:  ws.name !== ini.name,
    dates: ws.start !== ini.start || ws.end !== ini.end,
    gpt:   ws.gpt !== ini.gpt,
    gpw:   ws.gpw !== ini.gpw,
    dur:   ws.dur !== ini.dur,
    byes:  ws.byes !== ini.byes,
    b2b:   ws.b2b !== ini.b2b,
    weekendTarget: ws.weekendTarget !== ini.weekendTarget,
    maxGamesPerDay: ws.maxGamesPerDay !== ini.maxGamesPerDay,
    divs:  ws.divs.slice().sort().join(",") !== iniDivStr,
    subs:  [...ws.subs].sort().join(",") !== iniSubStr,
    days:  ws.days.join(",") !== iniDayStr || JSON.stringify(ws.wins) !== iniWinStr,
    bouts: JSON.stringify(ws.bouts) !== iniBoutStr,
  } : {};

  const rows = [
    ["Schedule Name",     ws.name,                                                                                                                changed.name],
    ["Season Dates",      `${ws.start} – ${ws.end}`,                                                                                             changed.dates],
    ["Games per Team",    ws.gpt,                                                                                                                 changed.gpt],
    ["Games per Week",    ws.gpw,                                                                                                                 changed.gpw],
    ["Duration",          ws.dur,                                                                                                                 changed.dur],
    ["Byes Allowed",      ws.byes ? "Yes" : "No",                                                                                               changed.byes],
    ["Weekend Target",    ws.weekendTarget,                                                                                                       changed.weekendTarget],
    ["Back-to-Back Games",parseInt(ws.gpw) >= 2 ? (ws.b2b ? `Allowed (Max ${ws.maxGamesPerDay}/day)` : "Not allowed") : "N/A (requires 2+ games/week)", changed.b2b || (ws.b2b && changed.maxGamesPerDay)],
    ["Divisions",         selDivs.map(d => `${d.name} (${d.teams.length} teams)`).join(", ") || "None",                                        changed.divs],
    ["Sub-venues",        selSubNames.length ? selSubNames.join(", ") : "None selected",                                                        changed.subs],
    ["Game Days & Times", timeBlocks.length ? timeBlocks.join(", ") : "None set",                                                               changed.days],
    ["Blackouts",         blackoutStr,                                                                                                            changed.bouts],
  ];

  // Calculate summary metrics
  const totalTeams = selDivs.reduce((acc, d) => acc + d.teams.length, 0);
  const gamesPerTeam = parseInt(ws.gpt) || 10;
  const totalGames = Math.ceil((totalTeams * gamesPerTeam) / 2);
  const availableSlots = timeBlocks.length * ws.subs.size * parseInt(ws.gpw || 2);
  const blackoutSlots = ws.bouts.length;
  const slotsNeeded = totalGames;
  const hasSlotDeficit = availableSlots < slotsNeeded;
  const slotFillPct = slotsNeeded > 0 ? Math.min(100, Math.round((availableSlots / slotsNeeded) * 100)) : 100;
  const slotSurplus = availableSlots - slotsNeeded;

  return (
    <>
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: hasSlotDeficit ? 10 : 14 }}>
        <div style={{ background: "#fff", border: `1px solid ${G200}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G500, textTransform: "uppercase", marginBottom: 6 }}>Games to Create</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: G900 }}>{totalGames}</div>
          <div style={{ fontSize: 12, color: G500, marginTop: 2 }}>{totalTeams} teams × {gamesPerTeam} games</div>
        </div>

        {/* Slot Capacity Card — turns red when deficit */}
        <div style={{
          background: hasSlotDeficit ? "#FEF2F2" : "#fff",
          border: `1px solid ${hasSlotDeficit ? "#FECACA" : G200}`,
          borderRadius: 10,
          padding: 16,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Red top accent bar when deficit */}
          {hasSlotDeficit && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: RD, borderRadius: "10px 10px 0 0" }} />}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: hasSlotDeficit ? "#991B1B" : G500, textTransform: "uppercase" }}>Slot Capacity</div>
            {hasSlotDeficit && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: RD, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99 }}>
                ⚠ Deficit
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: hasSlotDeficit ? RD : GR, lineHeight: 1 }}>{availableSlots}</div>
            <div style={{ fontSize: 13, color: hasSlotDeficit ? "#dc2626" : G500, fontWeight: 500 }}>/ {slotsNeeded} needed</div>
          </div>
          {/* Fill bar */}
          <div style={{ height: 6, background: hasSlotDeficit ? "#FECACA" : G200, borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${slotFillPct}%`, background: hasSlotDeficit ? RD : GR, borderRadius: 4, transition: "width .4s" }} />
          </div>
          <div style={{ fontSize: 11, color: hasSlotDeficit ? "#dc2626" : G500, fontWeight: 500 }}>
            {hasSlotDeficit
              ? `⚠ ${Math.abs(slotSurplus)} more slot${Math.abs(slotSurplus) !== 1 ? "s" : ""} needed`
              : `✓ ${slotSurplus} slot${slotSurplus !== 1 ? "s" : ""} of buffer`
            }
          </div>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${G200}`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G500, textTransform: "uppercase", marginBottom: 6 }}>Blackout Slots</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: RD }}>{blackoutSlots}</div>
          <div style={{ fontSize: 12, color: G500, marginTop: 2 }}>{blackoutStr}</div>
        </div>
      </div>

      {/* Slot Deficit Alert Banner */}
      {hasSlotDeficit && (
        <div style={{
          padding: "12px 16px",
          borderRadius: 8,
          background: "#FEF2F2",
          border: "1px solid #FECACA",
          color: "#991B1B",
          fontSize: 13,
          lineHeight: 1.5,
          marginBottom: 14,
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠</span>
          <div>
            <strong>Not enough available slots to fit all games.</strong>{" "}
            You need <strong>{slotsNeeded}</strong> slots but only have <strong>{availableSlots}</strong> available ({Math.abs(slotSurplus)} short).
            Go back to <strong>Availability</strong> to add more time blocks or venues, or reduce the number of games per team.
          </div>
        </div>
      )}

      {/* Configuration Card */}
      <div style={{ background: "#fff", border: `1px solid ${G200}`, borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${G100}` }}>Schedule Configuration</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {rows.map(([k, v, isChanged]) => (
            <div key={k} style={{
              background: isChanged ? "#fffbeb" : G50,
              border: `1px solid ${isChanged ? "#fde68a" : G200}`,
              borderLeft: isChanged ? `3px solid #f59e0b` : `1px solid ${G200}`,
              borderRadius: 6,
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: isChanged ? "#92400e" : G400, textTransform: "uppercase", letterSpacing: ".05em" }}>
                {k}{isChanged && <span style={{ marginLeft: 5, fontSize: 8, fontWeight: 700, background: "#f59e0b", color: "#fff", padding: "1px 4px", borderRadius: 3, textTransform: "uppercase", letterSpacing: ".04em" }}>Changed</span>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: isChanged ? "#92400e" : G900, lineHeight: 1.4 }}>{v || "—"}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Generated Schedule Report ───────────────────────────────────────────────
const REPORT_TEAMS = [
  { team: "Dodgers",    div: "8U",  games: 10, weekendGames: 7, b2b: 1, conflicts: 0 },
  { team: "Marlins",    div: "8U",  games: 10, weekendGames: 8, b2b: 0, conflicts: 0 },
  { team: "Yankees",    div: "8U",  games: 10, weekendGames: 7, b2b: 2, conflicts: 1 },
  { team: "Red Sox",    div: "8U",  games: 10, weekendGames: 9, b2b: 0, conflicts: 0 },
  { team: "Cubs",       div: "8U",  games: 10, weekendGames: 8, b2b: 1, conflicts: 0 },
  { team: "Giants",     div: "8U",  games: 10, weekendGames: 7, b2b: 0, conflicts: 0 },
  { team: "Tigers",     div: "9U",  games: 10, weekendGames: 8, b2b: 1, conflicts: 0 },
  { team: "Athletics",  div: "9U",  games: 10, weekendGames: 9, b2b: 0, conflicts: 0 },
  { team: "Phillies",   div: "9U",  games: 10, weekendGames: 7, b2b: 2, conflicts: 1 },
  { team: "Rays",       div: "9U",  games: 10, weekendGames: 8, b2b: 0, conflicts: 0 },
  { team: "White Sox",  div: "10U", games: 10, weekendGames: 8, b2b: 1, conflicts: 0 },
  { team: "Padres",     div: "10U", games: 10, weekendGames: 7, b2b: 0, conflicts: 2 },
  { team: "Mariners",   div: "10U", games: 10, weekendGames: 9, b2b: 0, conflicts: 0 },
  { team: "Rockies",    div: "10U", games: 10, weekendGames: 8, b2b: 1, conflicts: 0 },
];

const REPORT_GAMES = [
  { id: 1,  date: "2025-11-22", dateStr: "Sat Nov 22", time: "3:00 PM", home: "Marlins",   away: "Cubs",      venue: "Springfield High – Field 1", div: "8U",  pub: "draft" },
  { id: 2,  date: "2025-11-22", dateStr: "Sat Nov 22", time: "1:30 PM", home: "Padres",    away: "Mariners",  venue: "Riverside Park – Diamond A", div: "10U", pub: "draft" },
  { id: 3,  date: "2025-11-15", dateStr: "Sat Nov 15", time: "9:00 AM", home: "Yankees",   away: "Giants",    venue: "Springfield High – Field 2", div: "8U",  pub: "draft" },
  { id: 4,  date: "2025-11-15", dateStr: "Sat Nov 15", time: "10:30 AM",home: "Athletics", away: "Rays",      venue: "Riverside Park – Diamond B", div: "9U",  pub: "draft" },
  { id: 5,  date: "2025-11-09", dateStr: "Sun Nov 9",  time: "1:00 PM", home: "Dodgers",   away: "Red Sox",   venue: "Springfield High – Field 1", div: "8U",  pub: "draft" },
  { id: 6,  date: "2025-11-09", dateStr: "Sun Nov 9",  time: "2:30 PM", home: "White Sox", away: "Rockies",   venue: "Riverside Park – Diamond A", div: "10U", pub: "draft" },
  { id: 7,  date: "2025-11-08", dateStr: "Sat Nov 8",  time: "9:00 AM", home: "Tigers",    away: "Phillies",  venue: "Springfield High – Field 1", div: "9U",  pub: "draft" },
  { id: 8,  date: "2025-11-08", dateStr: "Sat Nov 8",  time: "10:30 AM",home: "Cubs",      away: "Marlins",   venue: "Riverside Park – Diamond A", div: "8U",  pub: "draft" },
  { id: 9,  date: "2025-11-01", dateStr: "Sat Nov 1",  time: "9:00 AM", home: "Mariners",  away: "Padres",    venue: "Springfield High – Field 2", div: "10U", pub: "draft" },
  { id: 10, date: "2025-11-01", dateStr: "Sat Nov 1",  time: "11:00 AM",home: "Red Sox",   away: "Yankees",   venue: "Riverside Park – Diamond B", div: "8U",  pub: "draft" },
  { id: 11, date: "2025-10-25", dateStr: "Sat Oct 25", time: "1:30 PM", home: "Rays",      away: "Tigers",    venue: "Springfield High – Field 1", div: "9U",  pub: "draft" },
  { id: 12, date: "2025-10-25", dateStr: "Sat Oct 25", time: "3:00 PM", home: "Giants",    away: "Dodgers",   venue: "Riverside Park – Diamond A", div: "8U",  pub: "draft" },
  { id: 13, date: "2025-10-18", dateStr: "Sat Oct 18", time: "9:00 AM", home: "Rockies",   away: "White Sox", venue: "Springfield High – Field 1", div: "10U", pub: "draft" },
  { id: 14, date: "2025-10-18", dateStr: "Sat Oct 18", time: "10:30 AM",home: "Phillies",  away: "Athletics", venue: "Riverside Park – Diamond B", div: "9U",  pub: "draft" },
  { id: 15, date: "2025-10-11", dateStr: "Sat Oct 11", time: "9:00 AM", home: "Yankees",   away: "Marlins",   venue: "Springfield High – Field 2", div: "8U",  pub: "draft" },
];

function GenReport({ ws, onComplete, onEditSchedule }) {
  const [sortCol, setSortCol] = useState("date");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("desc");
  const [filterDiv, setFilterDiv] = useState("All");
  const [filterTeam, setFilterTeam] = useState("All");
  const [expandedWeeks, setExpandedWeeks] = useState({});
  
  const toggleWeek = (weekNum) => {
    setExpandedWeeks(prev => ({ ...prev, [weekNum]: !prev[weekNum] }));
  };

  const totalConflicts = REPORT_TEAMS.reduce((a, t) => a + t.conflicts, 0);
  const totalB2B       = REPORT_TEAMS.reduce((a, t) => a + t.b2b, 0);
  const avgWeekend     = Math.round(REPORT_TEAMS.reduce((a, t) => a + t.weekendGames, 0) / REPORT_TEAMS.length * 10) / 10;

  const statCards = [
    { label: "Games Generated", value: REPORT_GAMES.length, sub: `${REPORT_TEAMS.length} teams`, color: BL, icon: "🏆" },
    { label: "Avg Weekend Games/Team", value: avgWeekend, sub: "across all teams", color: GR, icon: "📅" },
    { label: "Back-to-Back Games", value: totalB2B, sub: totalB2B > 0 ? "review recommended" : "none found", color: totalB2B > 0 ? AM : GR, icon: "⚡" },
    { label: "Potential Conflicts", value: totalConflicts, sub: totalConflicts > 0 ? "needs attention" : "schedule is clean", color: totalConflicts > 0 ? RD : GR, icon: totalConflicts > 0 ? "⚠" : "✓" },
  ];

  const divs = ["All", ...Array.from(new Set(REPORT_TEAMS.map(t => t.div)))];
  const teams = ["All", ...REPORT_TEAMS.filter(t => filterDiv === "All" || t.div === filterDiv).map(t => t.team)];

  const sortedGames = [...REPORT_GAMES]
    .filter(g => filterDiv === "All" || g.div === filterDiv)
    .filter(g => filterTeam === "All" || g.home === filterTeam || g.away === filterTeam)
    .sort((a, b) => {
      let av: any = a[sortCol], bv: any = b[sortCol];
      if (sortCol === "date") { av = a.date; bv = b.date; }
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };
  const SortIcon = ({ col }: { col: string }) => (
    <span style={{ marginLeft: 4, opacity: sortCol === col ? 1 : 0.3, fontSize: 10 }}>
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "▼"}
    </span>
  );

  const teamRows = REPORT_TEAMS.filter(t => filterDiv === "All" || t.div === filterDiv);

  // Group games by week for schedule preview
  const weeksData = Array.from({ length: 7 }, (_, i) => {
    const weekNum = i + 1;
    const gameCount = Math.floor(REPORT_GAMES.length / 7);
    const weekGames = REPORT_GAMES.slice(i * gameCount, (i + 1) * gameCount);
    const startDate = new Date("2025-11-01");
    startDate.setDate(startDate.getDate() + (i * 7));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return {
      weekNum,
      dateRange: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      gameCount: weekGames.length,
      isExpanded: expandedWeeks[weekNum] !== false,
      games: weekGames.map(g => ({
        day: new Date(g.date).toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(g.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: g.time,
        home: g.home,
        away: g.away,
        venue: g.venue.split('–')[0],
        field: g.venue.split('–')[1] || ''
      }))
    };
  });

  // Check for unscheduled games (conflicts or insufficient slots)
  const hasUnscheduledGames = totalConflicts > 0;
  const unscheduledGames = hasUnscheduledGames ? [
    { home: "Select Team", away: "Meteors" },
    { home: "Knights", away: "Dragons" },
    { home: "Blazers", away: "Spartans" },
    { home: "Warriors", away: "Cyclones" },
    { home: "Rhinos", away: "Pirates" },
    { home: "Ninjas", away: "Wolverines" },
    { home: "Grizzlies", away: "Meteors" },
    { home: "Knights", away: "Staff Team" },
    { home: "Select Team", away: "Dragons" },
    { home: "Warriors", away: "Blazers" },
    { home: "Spartans", away: "Pirates" },
    { home: "Ninjas", away: "Cyclones" },
    { home: "Rhinos", away: "Meteors" },
    { home: "Knights", away: "Wolverines" },
    { home: "Grizzlies", away: "Dragons" },
    { home: "Select Team", away: "Staff Team" },
  ] : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Success banner */}
      <div style={{ padding: "12px 16px", borderRadius: 9, background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🎉</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#15803d" }}>Schedule Generated Successfully</div>
          <div style={{ fontSize: 12, color: "#16a34a", marginTop: 2 }}>All {REPORT_GAMES.length} games are in <strong>Draft</strong> state. Review below, then complete or edit before publishing.</div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {statCards.map(c => (
          <div key={c.label} style={{ background: "#fff", border: `1px solid ${G200}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: G500, textTransform: "uppercase" }}>{c.label}</div>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: G500, marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: G600 }}>Filter:</div>
        <select value={filterDiv} onChange={e => { setFilterDiv(e.target.value); setFilterTeam("All"); }}
          style={{ padding: "5px 9px", border: `1px solid ${G300}`, borderRadius: 6, fontSize: 12, fontFamily: "inherit", background: "#fff" }}>
          {divs.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)}
          style={{ padding: "5px 9px", border: `1px solid ${G300}`, borderRadius: 6, fontSize: 12, fontFamily: "inherit", background: "#fff" }}>
          {teams.map(t => <option key={t}>{t}</option>)}
        </select>
        {(filterDiv !== "All" || filterTeam !== "All") && (
          <button onClick={() => { setFilterDiv("All"); setFilterTeam("All"); }}
            style={{ fontSize: 11, color: BL, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            Clear filters ×
          </button>
        )}
        <div style={{ marginLeft: "auto", fontSize: 12, color: G500 }}>{sortedGames.length} games shown</div>
      </div>

      {/* Per-team breakdown */}
      <div style={{ background: "#fff", border: `1px solid ${G200}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${G100}`, fontSize: 13, fontWeight: 700 }}>Team Breakdown</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: G800 }}>
                {[["team","Team"],["div","Division"],["games","Games"],["weekendGames","Weekend"],["b2b","Back-to-Back"],["conflicts","Conflicts"]].map(([col, lbl]) => (
                  <th key={col} onClick={() => toggleSort(col)}
                    style={{ padding: "9px 12px", color: "rgba(255,255,255,.8)", fontWeight: 600, textAlign: "left", fontSize: 11, textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>
                    {lbl}<SortIcon col={col} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamRows.map((t, i) => (
                <tr key={t.team} style={{ background: i % 2 === 0 ? "#fff" : G50, borderBottom: `1px solid ${G100}` }}>
                  <td style={{ padding: "8px 12px", fontWeight: 600, color: G900 }}>{t.team}</td>
                  <td style={{ padding: "8px 12px" }}><span style={{ background: G100, color: G600, padding: "2px 7px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{t.div}</span></td>
                  <td style={{ padding: "8px 12px", color: G700 }}>{t.games}</td>
                  <td style={{ padding: "8px 12px", color: G700 }}>{t.weekendGames}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ color: t.b2b > 0 ? AM : G500, fontWeight: t.b2b > 0 ? 700 : 400 }}>{t.b2b > 0 ? `⚡ ${t.b2b}` : "—"}</span>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ color: t.conflicts > 0 ? RD : GR, fontWeight: t.conflicts > 0 ? 700 : 400 }}>{t.conflicts > 0 ? `⚠ ${t.conflicts}` : "✓ Clean"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Preview */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Schedule Preview</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {weeksData.map((week) => (
              <div key={week.weekNum} style={{ borderRadius: 16, border: `1px solid ${G200}`, background: "#fff", overflow: "hidden" }}>
                <div 
                  onClick={() => toggleWeek(week.weekNum)}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    padding: 8, 
                    background: "#f9fafb", 
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#f9fafb"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWeek(week.weekNum); }}
                      style={{ 
                        display: "grid", 
                        placeContent: "center", 
                        borderRadius: "50%", 
                        border: "1px solid transparent", 
                        color: G400, 
                        background: "transparent", 
                        width: 32, 
                        height: 32, 
                        minWidth: 32, 
                        cursor: "pointer", 
                        padding: 0 
                      }}
                      type="button"
                      aria-label={week.isExpanded ? "Collapse" : "Expand"}
                    >
                      {week.isExpanded ? '▼' : '▶'}
                    </button>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>Week {week.weekNum}</div>
                      <div style={{ fontSize: 12, color: G500 }}>{week.dateRange}</div>
                    </div>
                  </div>
                  <div style={{ padding: "2px 8px", borderRadius: 999, background: "#f9fafb" }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: G500 }}>{week.gameCount} games</span>
                  </div>
                </div>
                {week.isExpanded && week.games.length > 0 && (
                  <div style={{ padding: 8, display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 4 }}>
                    {week.games.map((game, i) => (
                      <div key={i} style={{ 
                        borderRadius: 8, 
                        border: `1px solid ${G200}`, 
                        background: "#fff", 
                        transition: "all 0.2s",
                        cursor: "pointer"
                      }}>
                        <div style={{ padding: 8, display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            minWidth: 72, 
                            padding: "4px 8px", 
                            borderRadius: 8, 
                            background: "#f9fafb" 
                          }}>
                            <div style={{ fontSize: 12, color: G500, textTransform: "uppercase" }}>{game.day}</div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{game.date}</div>
                            <div style={{ fontSize: 12, color: G500, marginTop: 2 }}>{game.time}</div>
                          </div>
                          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: G900 }}>{game.home}</div>
                                <div style={{ fontSize: 12, color: G500 }}>Home</div>
                              </div>
                            </div>
                            <div style={{ borderTop: `1px solid ${G200}` }}></div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: G900 }}>{game.away}</div>
                                <div style={{ fontSize: 12, color: G500 }}>Away</div>
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 160, textAlign: "right" }}>
                            <div style={{ fontSize: 12, color: G500 }}>{game.venue}</div>
                            {game.field && <div style={{ fontSize: 12, color: G500 }}>{game.field}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {hasUnscheduledGames && (
          <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Unscheduled Games ({unscheduledGames.length})</h4>
              <div style={{ border: `1px solid ${G200}`, borderRadius: 16, background: "#f9fafb", overflow: "hidden" }}>
                <div style={{ padding: 8, borderBottom: `1px solid ${G200}` }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: G500, marginBottom: 2 }}>Not enough time slots</div>
                  <div style={{ fontSize: 12, color: G500 }}>{unscheduledGames.length} games need to be scheduled</div>
                </div>
                <div style={{ maxHeight: 256, overflowY: "auto", background: "#fff" }}>
                  {unscheduledGames.map((game, i) => (
                    <div key={i} style={{ padding: 8, borderBottom: `1px solid ${G200}` }}>
                      <div style={{ fontSize: 12, color: G500 }}><span style={{ fontWeight: 500 }}>{game.home}</span> vs <span style={{ fontWeight: 500 }}>{game.away}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: 8, background: "#f9fafb", borderTop: `1px solid ${G200}` }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: G500, marginBottom: 4 }}>Quick fixes:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button style={{ width: "100%", textAlign: "left", padding: 8, background: "#fff", border: `1px solid ${G200}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: G500 }}>Add weekend availability</div>
                      <div style={{ fontSize: 12, color: G500 }}>Enable Saturday and Sunday for existing venues to schedule {unscheduledGames.length} more games</div>
                    </button>
                    <button style={{ width: "100%", textAlign: "left", padding: 8, background: "#fff", border: `1px solid ${G200}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: G500 }}>Extend season by one week</div>
                      <div style={{ fontSize: 12, color: G500 }}>Add 7 more days to create {unscheduledGames.length} additional time slots</div>
                    </button>
                    <button style={{ width: "100%", textAlign: "left", padding: 8, background: "#fff", border: `1px solid ${G200}`, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: G500 }}>Add evening time slots</div>
                      <div style={{ fontSize: 12, color: G500 }}>Add 6-9pm slots on enabled days to create more availability</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function WizardPanel({ mode = "new", onClose, onDone }) {
  const [step, setStep] = useState(0);
  const [sn, setSN] = useState(mode === "new" ? "New Schedule (Draft)" : "Fall 2025 Season");
  const [generating, setGenerating] = useState(false);
  const [genPct, setGenPct] = useState(0);
  const [genMsg, setGenMsg] = useState("");
  const [genDone, setGenDone] = useState(false);
  const [ws, setWs] = useState({ name: mode === "new" ? "" : "Fall 2025 Season", start: "2025-09-06", end: "2025-11-22", gpt: "10", gpw: "2", weekendTarget: "2", maxGamesPerDay: "2", dur: "75 min", byes: true, b2b: false, divs: [], days: ["Sat", "Sun"], wins: [{ day: "Sat", start: "09:00", end: "12:00" }, { day: "Sat", start: "14:00", end: "17:00" }, { day: "Sun", start: "09:00", end: "15:00" }], bouts: [{ s: "Oct 11", e: "Oct 12", lbl: "Fall Break" }], subs: new Set(["0-0", "0-1", "1-0"]) });
  // Frozen snapshot of ws at mount time — used in edit mode to highlight changed fields
  const initialWs = useRef(null);
  if (initialWs.current === null) initialWs.current = JSON.parse(JSON.stringify({ ...ws, subs: [...ws.subs], divs: [...ws.divs] }));
  const isEdit = mode === "edit";
  const MSGS = isEdit
    ? ["Locking manually edited games…", "Reverting published events to draft…", "Analyzing existing pairings…", "Identifying games to generate…", "Reassigning U8 Boys slots…", "Reassigning U10 Girls slots…", "Reassigning U12 Co-ed slots…", "Applying venue availability…", "Enforcing hard constraints…", "Optimizing soft preferences…", "Rebalancing home/away…", "Conflict detection…", "Finalizing generated schedule…"]
    : ["Initializing constraint engine…", "Analyzing team pairings…", "Assigning U8 Boys slots…", "Assigning U10 Girls slots…", "Assigning U12 Co-ed slots…", "Applying venue availability…", "Enforcing hard constraints…", "Optimizing soft preferences…", "Balancing home/away…", "Distributing time slots…", "Conflict detection…", "Creating 118 game events…", "Finalizing draft schedule…"];
  const doGen = () => {
    setGenerating(true); setGenPct(0); setGenMsg(MSGS[0]); setGenDone(false);
    let i = 0;
    const tick = () => { i++; setGenPct(Math.round((i / MSGS.length) * 100)); setGenMsg(MSGS[Math.min(i, MSGS.length - 1)]); if (i < MSGS.length) setTimeout(tick, 280 + Math.random() * 150); else setTimeout(() => { setGenerating(false); setGenDone(true); }, 400); };
    setTimeout(tick, 280);
  };
  const handleEditSchedule = () => { setGenDone(false); setStep(2); };
  const handleComplete = () => { onDone(ws.name); };
  const isLast = step === WIZ_STEPS.length - 1;
  const SCHEDS = ["Fall 2025 Season", "Spring 2025 Make-ups", "New Schedule (Draft)"];
  const steps = [<WStep0 key={0} ws={ws} set={setWs} />, <WStep1 key={1} ws={ws} set={setWs} />, <WStep2 key={2} ws={ws} mode={mode} initialWs={initialWs.current} onGen={doGen} generating={generating} genPct={genPct} genMsg={genMsg} />];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%", background: "#f9fafb", overflow: "hidden" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ height: 56, background: "#fff", borderBottom: `1px solid ${G200}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: G900, flex: 1 }}>{genDone ? `${ws.name} — Draft Schedule` : (mode === "new" ? "Create Game Schedule" : "Edit Schedule")}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onClose} style={{ fontSize: 14, fontWeight: 500, color: G700, cursor: "pointer", padding: "6px 12px", border: `1px solid ${G300}`, borderRadius: 6, background: "#fff", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={generating || step === 0} style={{ fontSize: 14, fontWeight: 500, color: G700, cursor: "pointer", padding: "6px 12px", border: `1px solid ${G300}`, borderRadius: 6, background: "#fff", fontFamily: "inherit", visibility: step === 0 ? "hidden" : "visible" }}>Back</button>
          <button onClick={() => isLast ? doGen() : setStep(s => s + 1)} disabled={generating || ws.name === ""} style={{ fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer", padding: "6px 16px", border: "none", borderRadius: 6, background: BL, fontFamily: "inherit", opacity: (generating || ws.name === "") ? 0.5 : 1 }}>{generating ? "Generating…" : isLast ? "Generate Schedule →" : "Next"}</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 300, background: "#fff", borderRight: `1px solid ${G200}`, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
          <nav style={{ width: "100%", maxWidth: 344, height: "100%", background: "#f9fafb" }}>
            {WIZ_STEPS.map((label, i) => {
              const done = i < step, active = i === step;
              return (
                <div key={i}>
                  <div onClick={() => !generating && setStep(i)} style={{ display: "flex", alignItems: "center", height: 74, minHeight: 74, padding: "0 24px", cursor: generating ? "not-allowed" : "pointer", transition: "background 0.2s", background: active ? "#eff6ff" : "#fff", borderLeft: active ? "4px solid #2563eb" : "4px solid transparent", borderBottom: `1px solid ${G100}` }} role="button" tabIndex={0}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 0" }}>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: active ? 600 : 500, color: G700 }}>{label}</span>
                      <span style={{ width: 24, height: 24, display: "block", border: "2px solid", borderRadius: "50%", position: "relative", flexShrink: 0, background: "#fff", borderColor: done || active ? "#2563eb" : G300 }}></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#f9fafb" }}>
          {!genDone && (
            <div style={{ padding: 16, flexShrink: 0, display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 850 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: G900, marginBottom: 4 }}>{WIZ_STEPS[step]}</h2>
                <p style={{ fontSize: 14, color: G500 }}>{WIZ_SUBS[step]}</p>
              </div>
            </div>
          )}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 850, display: "flex", flexDirection: "column", gap: 24 }}>
                {genDone ? <GenReport ws={ws} onComplete={handleComplete} onEditSchedule={handleEditSchedule} /> : steps[step]}
              </div>
            </div>
          </div>
          {!genDone && (
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 850 }}>
                <button onClick={() => isLast ? doGen() : setStep(s => s + 1)} disabled={generating || ws.name === ""} style={{ fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer", padding: "8px 20px", border: "none", borderRadius: 6, background: BL, fontFamily: "inherit", opacity: (generating || ws.name === "") ? 0.5 : 1, width: "100%" }}>{generating ? "Generating…" : isLast ? "Generate Schedule →" : "Continue →"}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Modal({ visible, onClose, children, w = 500 }) {
  if (!visible) return null;
  return createPortal(
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10001, backdropFilter: "blur(2px)" }}>
      <div style={{ background: "#fff", borderRadius: 12, width: w, maxWidth: "95%", maxHeight: "90%", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,.25)", position: "relative" }}>{children}</div>
    </div>,
    document.body
  );
}
function MHead({ title, onClose }) { return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 0" }}><div style={{ fontSize: 16, fontWeight: 700 }}>{title}</div><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: G400, lineHeight: 1 }}>×</button></div>; }
function MFoot({ onClose, onOk, okLabel }) { return <div style={{ padding: "14px 22px 20px", display: "flex", gap: 8, justifyContent: "flex-end", borderTop: `1px solid ${G100}` }}><Btn onClick={onClose}>Cancel</Btn><Btn variant="p" onClick={onOk} style={{ background: BL, borderColor: BL, color: "#fff" }}>{okLabel}</Btn></div>; }

function BalanceModal({ visible, onClose, onTeamF }) {
  const data = [{ div: "U8 Boys", team: "Gryffindor", g: 10, by: 1, h: 5, a: 5, mp: 78, sa: 2, sp: 3, ua: 4, up: 1, tt: 0, tv: 0 }, { div: "U8 Boys", team: "Slytherin", g: 9, by: 1, h: 5, a: 4, mp: 89, sa: 2, sp: 2, ua: 3, up: 2, tt: 2, tv: 2 }, { div: "U8 Boys", team: "Ravenclaw", g: 10, by: 0, h: 5, a: 5, mp: 100, sa: 3, sp: 2, ua: 2, up: 3, tt: 0, tv: 0 }, { div: "U10 Girls", team: "Purple Storm", g: 10, by: 0, h: 5, a: 5, mp: 100, sa: 2, sp: 3, ua: 3, up: 2, tt: 0, tv: 0 }, { div: "U10 Girls", team: "Gold Rush", g: 9, by: 1, h: 4, a: 5, mp: 89, sa: 3, sp: 2, ua: 2, up: 2, tt: 2, tv: 1 }, { div: "U12 Co-ed", team: "Team Blaze", g: 10, by: 0, h: 5, a: 5, mp: 100, sa: 3, sp: 3, ua: 2, up: 2, tt: 0, tv: 0 }];
  const th = { padding: "8px 9px", background: G800, color: "rgba(255,255,255,.75)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", textAlign: "left", whiteSpace: "nowrap" };
  const td = { padding: "8px 9px", borderBottom: `1px solid ${G100}`, fontSize: 12 };
  return (
    <Modal visible={visible} onClose={onClose} w={900}>
      <MHead title="Balance Report" onClose={onClose} />
      <div style={{ padding: "14px 22px", borderBottom: `1px solid ${G200}`, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: G700 }}>Schedule:</span>
        <select style={{ padding: "6px 10px", border: `1px solid ${G300}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit" }}><option>Fall 2025 Season</option><option>Spring 2025 Make-ups</option><option>All Schedules</option></select>
        <span style={{ fontSize: 12, color: G500 }}>Click a team name to filter the schedule to that team.</span>
      </div>
      <div style={{ overflowX: "auto", maxHeight: "55vh", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Team", "Games", "Byes", "H/A/TBD", "Matchup %", "Sat 9–12:30", "Sat 2–7pm", "Sun 9–12:30", "Sun 2–7pm", "TBD Start", "TBD Venue"].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>{[...new Set(data.map(r => r.div))].map(div => [
            <tr key={div}><td colSpan={11} style={{ ...td, background: G50, fontWeight: 700, color: G700, padding: "6px 9px" }}>{div}</td></tr>,
            ...data.filter(r => r.div === div).map(r => (
              <tr key={r.team}>
                <td style={{ ...td, paddingLeft: 20 }}><span onClick={() => { onTeamF(r.team); onClose(); }} style={{ color: BL, cursor: "pointer", fontWeight: 600 }}>{r.team}</span></td>
                <td style={td}>{r.g}</td><td style={td}>{r.by}</td><td style={td}>{r.h}/{r.a}/0</td><td style={td}>{r.mp}%</td>
                <td style={td}>{r.sa}</td><td style={td}>{r.sp}</td><td style={td}>{r.ua}</td><td style={td}>{r.up}</td>
                <td style={td}>{r.tt > 0 ? <span onClick={() => { onTeamF(r.team); onClose(); }} style={{ color: RD, cursor: "pointer", fontWeight: 600 }}>{r.tt}</span> : 0}</td>
                <td style={td}>{r.tv > 0 ? <span onClick={() => { onTeamF(r.team); onClose(); }} style={{ color: RD, cursor: "pointer", fontWeight: 600 }}>{r.tv}</span> : 0}</td>
              </tr>
            ))
          ])}</tbody>
        </table>
      </div>
      <div style={{ padding: "14px 22px 20px", display: "flex", gap: 8, justifyContent: "flex-end", borderTop: `1px solid ${G100}` }}>
        <Btn size="s" onClick={onClose}>Close</Btn>
      </div>
    </Modal>
  );
}

function GameModalShell({ title, onClose, children, footer }) {
  /* Shared pill-style input token */
  return (
    <Modal visible={true} onClose={onClose} w={540}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0" }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: G900 }}>{title}</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: G400, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ padding: "8px 24px 0", fontSize: 13, fontWeight: 600, color: G700 }}>There must be at least one internal team in a game.</div>
      <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
      {footer}
    </Modal>
  );
}

const PILL = { padding: "9px 14px", border: `1px solid ${G300}`, borderRadius: 24, fontSize: 13, fontFamily: "inherit", background: "#fff", width: "100%" };
const PILL_DIS = { ...PILL, background: G100, color: G500, cursor: "not-allowed" };
function FRow({ label, req, children }) {
  return <div><label style={{ fontSize: 13, fontWeight: 600, color: G700, display: "block", marginBottom: 6 }}>{label}{req && <span style={{ color: RD }}> *</span>}</label>{children}</div>;
}

function MoreActionsMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(o => !o)} style={{ fontSize: 13, fontWeight: 600, color: BL, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit", padding: "8px 0" }}>
        More actions <span style={{ fontSize: 11 }}>{open ? "▲" : "▲"}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: 0, background: "#fff", border: `1px solid ${G200}`, borderRadius: 10, boxShadow: "0 -8px 24px rgba(0,0,0,.12)", minWidth: 160, overflow: "hidden", zIndex: 10 }}>
          {items.map((item, i) => (
            <div key={i} onMouseDown={e => e.preventDefault()} onClick={() => { item.onClick(); setOpen(false); }}
              style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600, color: item.danger ? RD : G700, cursor: "pointer", borderBottom: i < items.length - 1 ? `1px solid ${G100}` : "none" }}
              onMouseEnter={e => e.currentTarget.style.background = G50} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddGameModal({ visible, onClose, defaultSch = "" }) {
  const [sch, setSch] = useState(defaultSch);
  const [t1, setT1] = useState(""); const [t2, setT2] = useState("");
  const teams = sch ? SCHED_TEAMS[sch] || [] : DIVS.flatMap(d => d.teams);
  const onSch = v => { setSch(v); if (v && t1 && SCHED_TEAMS[v] && !SCHED_TEAMS[v].includes(t1)) setT1(""); if (v && t2 && SCHED_TEAMS[v] && !SCHED_TEAMS[v].includes(t2)) setT2(""); };
  const moreActions = [
    { label: "Cancel game", danger: true, onClick: () => { onClose(); alert("Game canceled."); } },
    { label: "Delete game", danger: true, onClick: () => { onClose(); alert("Game deleted."); } },
  ];
  const footer = (
    <div style={{ padding: "14px 24px 20px", borderTop: `1px solid ${G100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <MoreActionsMenu items={moreActions} />
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{ padding: "9px 20px", fontSize: 13, fontWeight: 600, background: "#fff", border: `1.5px solid ${G300}`, borderRadius: 24, cursor: "pointer", color: G700, fontFamily: "inherit" }}>Cancel editing</button>
        <button onClick={() => { onClose(); }} style={{ padding: "9px 22px", fontSize: 13, fontWeight: 700, background: BL, color: "#fff", border: "none", borderRadius: 24, cursor: "pointer", fontFamily: "inherit" }}>Save</button>
      </div>
    </div>
  );
  return (
    <GameModalShell title="Add Game" onClose={onClose} footer={footer}>
      {/* Attach to schedule */}
      <FRow label="Attach to schedule">
        <select value={sch} onChange={e => onSch(e.target.value)} style={PILL}>
          <option value="">-- None / manually added --</option>
          <option>Fall 2025 Season</option><option>Spring 2025 Make-ups</option>
        </select>
        <div style={{ fontSize: 11, color: G400, marginTop: 4 }}>Team options are limited to teams in the selected schedule.</div>
        {sch && <div style={{ display: "flex", alignItems: "baseline", gap: 5, fontSize: 11, color: "#92400e", marginTop: 5 }}><span>⚠</span><span>Games added to a schedule are created in <strong>Draft</strong> state and won't be visible to teams until published.</span></div>}
      </FRow>
      {/* Team 1 */}
      <FRow label="Team 1" req>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...PILL, flex: .8 }}><option>Internal</option><option>External</option></select>
          <select value={t1} onChange={e => setT1(e.target.value)} style={{ ...PILL, flex: 2 }}><option value="">Select a team</option>{teams.map(t => <option key={t}>{t}</option>)}</select>
          <select style={{ ...PILL, flex: .8 }}><option>Home</option><option>Away</option></select>
        </div>
      </FRow>
      {/* Team 2 */}
      <FRow label="Team 2" req>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...PILL, flex: .8 }}><option>Internal</option><option>External</option></select>
          <select value={t2} onChange={e => setT2(e.target.value)} style={{ ...PILL, flex: 2 }}><option value="">Select a team</option>{teams.filter(t => t !== t1).map(t => <option key={t}>{t}</option>)}</select>
          <select style={{ ...PILL, flex: .8 }}><option>Away</option><option>Home</option></select>
        </div>
      </FRow>
      {/* Date */}
      <FRow label="Date" req>
        <div style={{ position: "relative" }}>
          <input type="date" style={{ ...PILL, paddingRight: 40 }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G400} strokeWidth="2" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
      </FRow>
      {/* Start Time */}
      <FRow label="Start Time">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select style={{ ...PILL, flex: 1 }}>
            <option>TBD</option><option>8:00 AM</option><option>9:00 AM</option><option>9:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option><option>12:00 PM</option><option>1:30 PM</option><option>2:30 PM</option><option>3:00 PM</option>
          </select>
          <span style={{ fontSize: 13, fontWeight: 600, color: BL, whiteSpace: "nowrap" }}>CT – Central</span>
        </div>
        <div style={{ fontSize: 11, color: G400, marginTop: 4 }}>Leave empty for TBD start time</div>
      </FRow>
      {/* Duration */}
      <FRow label="Duration" req>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...PILL, flex: 1 }}><option>0 hours</option><option>1 hour</option><option>1.5 hours</option><option>2 hours</option></select>
          <select style={{ ...PILL, flex: 1 }}><option>0 minutes</option><option>15 minutes</option><option>30 minutes</option><option>45 minutes</option></select>
        </div>
      </FRow>
      {/* Venue */}
      <FRow label="Venue">
        <select style={PILL}><option>TBD</option><option>Springfield High School – Field 1 – Turf</option><option>Springfield High School – Field 2 – Grass</option><option>Riverside Community Park – Diamond A</option><option>Riverside Community Park – Diamond B</option></select>
      </FRow>
      {/* Notes */}
      <FRow label="Notes">
        <textarea rows={3} placeholder="Add notes" style={{ ...PILL, resize: "vertical", borderRadius: 12 }} />
      </FRow>
    </GameModalShell>
  );
}

function PublishModal({ visible, onClose, mode, selCount, onPublish }) {
  const [notif, setNotif] = useState(true);
  const isAll = mode === "all"; const n = isAll ? 112 : selCount;
  return (
    <Modal visible={visible} onClose={onClose}>
      <MHead title={isAll ? "Publish All Draft Events" : "Publish Selected Events"} onClose={onClose} />
      <div style={{ padding: "14px 22px" }}>
        <p style={{ fontSize: 13, color: G600, marginBottom: 14 }}>{isAll ? "All draft events matching current filters will be published." : "Selected events will be published and visible to teams."}</p>
        <div style={{ display: "grid", gridTemplateColumns: isAll ? "repeat(4,1fr)" : "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
          {(isAll ? [["3", "Divisions"], ["24", "Teams"], ["" + n, "Draft Events"], ["3", "Conflicts"]] : [["" + n, "Selected"], ["2", "Divisions"], ["1", "Conflicts"]]).map(([v, l]) => (
            <div key={l} style={{ background: G50, border: `1px solid ${G200}`, borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: l === "Conflicts" ? RD : G900 }}>{v}</div>
              <div style={{ fontSize: 11, color: G500, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 12px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, color: "#92400e", fontSize: 12, display: "flex", gap: 8, marginBottom: 14 }}><span>⚠</span><span>Published events cannot be reverted to draft.</span></div>
        <div style={{ border: `1px solid ${G200}`, borderRadius: 8, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 13, fontWeight: 500 }}>Send notification to teams</span><Tog on={notif} set={setNotif} /></div>
          <label style={{ fontSize: 12, fontWeight: 600, color: G700, display: "block", marginBottom: 4 }}>Custom message (optional)</label>
          <textarea rows={3} placeholder="e.g. Your fall season schedule is now live!" style={{ padding: "8px 10px", border: `1px solid ${G300}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit", width: "100%", resize: "vertical" }} />
        </div>
      </div>
      <MFoot onClose={onClose} onOk={() => { onPublish(); onClose(); }} okLabel={`Publish ${n} events`} />
    </Modal>
  );
}

function BulkEditModal({ visible, onClose, selectedEvents, onUpdateEvents }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [venue, setVenue] = useState("");
  const [subVenue, setSubVenue] = useState("");
  const [status, setStatus] = useState("");

  const venues = ["Central Sports Park", "Brooke St. Park", "Hilltop Complex"];
  const subVenuesMap = {
    "Central Sports Park": ["West Stadium", "East Field", "North Diamond", "South Pitch", "Practice Area"],
    "Brooke St. Park": ["Upper Field", "Lower Field", "Practice Area"],
    "Hilltop Complex": ["Grandstand", "South Field", "Annex Court"]
  };

  const handleSave = () => {
    const updates = {};
    if (date) updates.date = date;
    if (startTime) updates.time = startTime;
    if (eventType) updates.type = eventType;
    if (venue) updates.venue = venue;
    if (subVenue) updates.sub = subVenue;
    if (status) updates.pub = status;
    onUpdateEvents(updates);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <MHead title={`Bulk Edit ${selectedEvents.length} Events`} onClose={onClose} />
      <div style={{ padding: "14px 22px" }}>
        <p style={{ fontSize: 13, color: G600, marginBottom: 14 }}>Leave a field blank to keep the existing value for that field.</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Date and Start Time */}
          <FRow label="Date">
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)}
              style={{ ...PILL, width: "100%" }} 
            />
          </FRow>
          
          <FRow label="Start Time">
            <input 
              type="time" 
              value={startTime} 
              onChange={e => setStartTime(e.target.value)}
              style={{ ...PILL, width: "100%" }} 
            />
          </FRow>

          {/* Event Type */}
          <FRow label="Event Type">
            <select 
              value={eventType} 
              onChange={e => setEventType(e.target.value)}
              style={{ ...PILL, width: "100%" }}
            >
              <option value="">-- Keep existing --</option>
              <option value="game">Game</option>
              <option value="practice">Practice</option>
              <option value="other">Other</option>
            </select>
          </FRow>

          {/* Venue */}
          <FRow label="Venue">
            <select 
              value={venue} 
              onChange={e => { setVenue(e.target.value); setSubVenue(""); }}
              style={{ ...PILL, width: "100%" }}
            >
              <option value="">-- Keep existing --</option>
              {venues.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </FRow>

          {/* Sub-venue */}
          {venue && (
            <FRow label="Sub-venue">
              <select 
                value={subVenue} 
                onChange={e => setSubVenue(e.target.value)}
                style={{ ...PILL, width: "100%" }}
              >
                <option value="">-- Keep existing --</option>
                {subVenuesMap[venue]?.map(sv => <option key={sv} value={sv}>{sv}</option>)}
              </select>
            </FRow>
          )}

          {/* Status */}
          <FRow label="Status">
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              style={{ ...PILL, width: "100%" }}
            >
              <option value="">-- Keep existing --</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </FRow>
        </div>
      </div>
      <MFoot onClose={onClose} onOk={handleSave} okLabel="Apply Changes" />
    </Modal>
  );
}

/* ── CALENDAR HELPERS ── */
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function evColor(ev){ return ev.type==="game"?"#22c55e":ev.type==="practice"?OR:BL; }

function CalEvChip({ev,compact=false}){
  const label = ev.type==="practice"?ev.home : `${ev.home}${ev.away?` vs. ${ev.away}`:""}`;
  return <div style={{display:"flex",alignItems:"center",gap:3,padding:compact?"1px 5px":"2px 6px",borderRadius:4,background:evColor(ev)+"22",marginBottom:2,cursor:"pointer",overflow:"hidden"}} title={`${label} · ${ev.time}`}>
    <span style={{width:6,height:6,borderRadius:"50%",background:evColor(ev),flexShrink:0}}/>
    <span style={{fontSize:10,color:G800,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",lineHeight:1.4}}>{ev.time.split(" ")[0]} {label}</span>
  </div>;
}

function MonthlyCalendar({filtered}){
  const now = new Date(2026,4,1); // May 2026 — matches stub data
  const [yr,setYr] = useState(now.getFullYear());
  const [mo,setMo] = useState(now.getMonth());
  const [expanded,setExpanded] = useState(null); // "YYYY-MM-DD" key

  const prev=()=>{ if(mo===0){setMo(11);setYr(y=>y-1);}else setMo(m=>m-1); setExpanded(null); };
  const next=()=>{ if(mo===11){setMo(0);setYr(y=>y+1);}else setMo(m=>m+1); setExpanded(null); };

  // parse "Sat May 3, 2026" → Date
  const parseDate=str=>{
    const parts=str.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if(!parts) return null;
    const months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
    return new Date(parseInt(parts[3]),months[parts[1]],parseInt(parts[2]));
  };

  // Build day cells: Mon=0 … Sun=6
  const firstDay = new Date(yr,mo,1);
  const firstDow = (firstDay.getDay()+6)%7; // shift so Mon=0
  const daysInMonth = new Date(yr,mo+1,0).getDate();
  const today = new Date(2026,3,8); // "today" in demo = Apr 8

  // Group events by date key "YYYY-M-D"
  const byDate={};
  filtered.forEach(ev=>{
    const d=parseDate(ev.date);
    if(!d||d.getFullYear()!==yr||d.getMonth()!==mo) return;
    const key=`${yr}-${mo}-${d.getDate()}`;
    (byDate[key]=byDate[key]||[]).push(ev);
  });

  const cells=[];
  for(let i=0;i<firstDow;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);

  return <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",background:G50}}>
    {/* Nav */}
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 0 10px",flexShrink:0}}>
      <button onClick={prev} style={{border:`1px solid ${G300}`,background:"#fff",borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>‹</button>
      <select value={mo} onChange={e=>setMo(Number(e.target.value))} style={{padding:"5px 8px",border:`1px solid ${G300}`,borderRadius:6,fontSize:13,fontFamily:"inherit",background:"#fff"}}>
        {MONTH_NAMES.map((n,i)=><option key={i} value={i}>{n}</option>)}
      </select>
      <select value={yr} onChange={e=>setYr(Number(e.target.value))} style={{padding:"5px 8px",border:`1px solid ${G300}`,borderRadius:6,fontSize:13,fontFamily:"inherit",background:"#fff"}}>
        {[2025,2026,2027].map(y=><option key={y}>{y}</option>)}
      </select>
      <button onClick={next} style={{border:`1px solid ${G300}`,background:"#fff",borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>›</button>
    </div>
    {/* Grid */}
    <div style={{background:"#fff",border:`1px solid ${G200}`,borderRadius:10,overflow:"hidden"}}>
      {/* Day headers */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:`1px solid ${G200}`}}>
        {DAY_SHORT.map(d=><div key={d} style={{padding:"8px 0",textAlign:"center",fontSize:11,fontWeight:700,color:G500,textTransform:"uppercase",letterSpacing:".04em"}}>{d}</div>)}
      </div>
      {/* Cells */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
        {cells.map((d,i)=>{
          if(!d) return <div key={i} style={{minHeight:90,background:G50,borderRight:`1px solid ${G100}`,borderBottom:`1px solid ${G100}`}}/>;
          const key=`${yr}-${mo}-${d}`;
          const evs=byDate[key]||[];
          const isToday=d===today.getDate()&&mo===today.getMonth()&&yr===today.getFullYear();
          const showExpanded=expanded===key;
          const LIMIT=3;
          return <div key={i} style={{minHeight:90,padding:"6px 5px",borderRight:`1px solid ${G100}`,borderBottom:`1px solid ${G100}`,background:"#fff",verticalAlign:"top",position:"relative"}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:isToday?BL:"transparent",color:isToday?"#fff":G700,fontSize:12,fontWeight:isToday?700:500,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:3}}>{d}</div>
            {showExpanded
              ? <div>
                  {evs.map((ev,ei)=><CalEvChip key={ei} ev={ev}/>)}
                  <button onClick={()=>setExpanded(null)} style={{fontSize:10,color:BL,background:"none",border:"none",cursor:"pointer",padding:0,marginTop:2}}>Show less</button>
                </div>
              : <div>
                  {evs.slice(0,LIMIT).map((ev,ei)=><CalEvChip key={ei} ev={ev}/>)}
                  {evs.length>LIMIT&&<button onClick={()=>setExpanded(key)} style={{fontSize:10,color:BL,fontWeight:600,background:BLP,border:"none",cursor:"pointer",padding:"1px 6px",borderRadius:4,marginTop:1}}>+{evs.length-LIMIT} more</button>}
                </div>
            }
          </div>;
        })}
      </div>
    </div>
  </div>;
}

function WeeklyCalendar({filtered}){
  // Default to week containing May 3, 2026
  const getMonday=d=>{ const dt=new Date(d); const day=dt.getDay(); const diff=dt.getDate()-(day===0?6:day-1); return new Date(dt.setDate(diff)); };
  const [weekStart,setWeekStart]=useState(getMonday(new Date(2026,4,3)));
  const [showAll,setShowAll]=useState(false);
  const [expanded,setExpanded]=useState(null); // "day-hour" key

  const prev=()=>setWeekStart(w=>{ const d=new Date(w); d.setDate(d.getDate()-7); return d; });
  const next=()=>setWeekStart(w=>{ const d=new Date(w); d.setDate(d.getDate()+7); return d; });

  const days=Array.from({length:7},(_,i)=>{ const d=new Date(weekStart); d.setDate(d.getDate()+i); return d; });
  const HOURS=showAll?Array.from({length:24},(_,i)=>i):Array.from({length:15},(_,i)=>i+7); // 7am–9pm or 0–23

  const fmtDate=d=>`${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]||""}`; // unused
  const fmtHeader=d=>{
    const dn=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][(d.getDay()+6)%7];
    return `${dn} ${d.getMonth()+1}/${d.getDate()}`;
  };
  const fmtHour=h=>`${h===0?12:h>12?h-12:h}${h<12?"am":"pm"}`;

  const parseDate=str=>{
    const parts=str.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if(!parts) return null;
    const months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
    return new Date(parseInt(parts[3]),months[parts[1]],parseInt(parts[2]));
  };
  const parseHour=str=>{
    const m=str.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if(!m) return -1;
    let h=parseInt(m[1]);
    if(m[3].toUpperCase()==="PM"&&h!==12) h+=12;
    if(m[3].toUpperCase()==="AM"&&h===12) h=0;
    return h;
  };

  // Build map: "dayIdx-hour" → events
  const bySlot={};
  filtered.forEach(ev=>{
    const d=parseDate(ev.date);
    if(!d) return;
    days.forEach((wd,di)=>{
      if(d.toDateString()===wd.toDateString()){
        const h=parseHour(ev.time);
        const key=`${di}-${h}`;
        (bySlot[key]=bySlot[key]||[]).push(ev);
      }
    });
  });

  const LIMIT=3;
  return <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",background:G50}}>
    {/* Nav */}
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 0 10px"}}>
      <button onClick={prev} style={{border:`1px solid ${G300}`,background:"#fff",borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>‹</button>
      <span style={{fontSize:13,fontWeight:600,color:G800,minWidth:200}}>{fmtHeader(days[0])} – {fmtHeader(days[6])}</span>
      <button onClick={next} style={{border:`1px solid ${G300}`,background:"#fff",borderRadius:6,padding:"5px 10px",cursor:"pointer",fontSize:13,fontFamily:"inherit"}}>›</button>
      <button onClick={()=>setShowAll(s=>!s)} style={{marginLeft:8,fontSize:12,color:BL,background:BLP,border:`1px solid #BFDBFE`,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit"}}>
        {showAll?"Show 7am–9pm":"Show all 24h"}
      </button>
    </div>
    {/* Grid */}
    <div style={{background:"#fff",border:`1px solid ${G200}`,borderRadius:10,overflow:"hidden"}}>
      {/* Header row */}
      <div style={{display:"grid",gridTemplateColumns:"52px repeat(7,1fr)",borderBottom:`1px solid ${G200}`,background:G50}}>
        <div style={{borderRight:`1px solid ${G100}`}}/>
        {days.map((d,i)=>{
          const isToday=d.toDateString()===new Date(2026,3,8).toDateString();
          return <div key={i} style={{padding:"8px 4px",textAlign:"center",fontSize:12,fontWeight:600,color:isToday?BL:G600,borderRight:`1px solid ${G100}`}}>
            {fmtHeader(d)}
          </div>;
        })}
      </div>
      {/* Hour rows */}
      {HOURS.map(h=><div key={h} style={{display:"grid",gridTemplateColumns:"52px repeat(7,1fr)",borderBottom:`1px solid ${G100}`,minHeight:56}}>
        <div style={{padding:"4px 6px",fontSize:10,color:G400,textAlign:"right",borderRight:`1px solid ${G100}`,paddingTop:6,fontWeight:500}}>{fmtHour(h)}</div>
        {days.map((_,di)=>{
          const key=`${di}-${h}`;
          const evs=bySlot[key]||[];
          const expKey=`${di}-${h}`;
          const isExpanded=expanded===expKey;
          return <div key={di} style={{borderRight:`1px solid ${G100}`,padding:"3px 4px",minHeight:56}}>
            {isExpanded
              ? <div>
                  {evs.map((ev,ei)=><CalEvChip key={ei} ev={ev} compact/>)}
                  <button onClick={()=>setExpanded(null)} style={{fontSize:9,color:BL,background:"none",border:"none",cursor:"pointer",padding:0}}>less</button>
                </div>
              : <div>
                  {evs.slice(0,LIMIT).map((ev,ei)=><CalEvChip key={ei} ev={ev} compact/>)}
                  {evs.length>LIMIT&&<button onClick={()=>setExpanded(expKey)} style={{fontSize:9,color:BL,fontWeight:600,background:BLP,border:"none",cursor:"pointer",padding:"1px 5px",borderRadius:3,marginTop:1}}>+{evs.length-LIMIT}</button>}
                </div>
            }
          </div>;
        })}
      </div>)}
    </div>
  </div>;
}

/* ── VENUE VIEW ── */
const VENUE_ROWS = [
  { type: "venue", label: "Springfield High School", id: "shs" },
  { type: "sub", label: "Field 1 – Turf", venueId: "shs", id: "shs-1" },
  { type: "sub", label: "Field 2 – Grass", venueId: "shs", id: "shs-2" },
  { type: "venue", label: "Riverside Community Park", id: "rcp" },
  { type: "sub", label: "Diamond A", venueId: "rcp", id: "rcp-1" },
  { type: "sub", label: "Diamond B", venueId: "rcp", id: "rcp-2" },
];

// Map stub event venues to venue row IDs
function matchVenueRow(ev) {
  if (ev.venue.includes("Springfield") || ev.venue.includes("Hogwarts") || ev.sub?.includes("Field 1")) return "shs-1";
  if (ev.sub?.includes("Field 2") || ev.sub?.includes("Grass")) return "shs-2";
  if (ev.sub?.includes("Diamond A")) return "rcp-1";
  if (ev.sub?.includes("Diamond B")) return "rcp-2";
  if (ev.venue.includes("Springfield") || ev.venue.includes("Hogwarts")) return "shs-1";
  if (ev.venue.includes("Riverside") || ev.venue.includes("Potter")) return "rcp-1";
  return null;
}

function VenueView({ filtered }) {
  const [selectedDate, setSelectedDate] = useState("2026-05-03"); // default to first stub event date
  const [showAll, setShowAll] = useState(false);
  const [dragOver, setDragOver] = useState(null); // "rowId-hour"
  const [dragEv, setDragEv] = useState(null);
  const [eventPositions, setEventPositions] = useState({}); // evId → {rowId, hour}
  const [toast, setToast] = useState(null);

  const HOURS = showAll
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 15 }, (_, i) => i + 7); // 7am–9pm

  const fmtHour = h => `${h === 0 ? 12 : h > 12 ? h - 12 : h}:00 ${h < 12 ? "AM" : "PM"}`;
  const fmtHourShort = h => `${h === 0 ? 12 : h > 12 ? h - 12 : h}${h < 12 ? "am" : "pm"}`;

  const parseHour = str => {
    const m = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return -1;
    let h = parseInt(m[1]);
    if (m[3].toUpperCase() === "PM" && h !== 12) h += 12;
    if (m[3].toUpperCase() === "AM" && h === 12) h = 0;
    return h;
  };

  const parseDate = str => {
    const parts = str.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if (!parts) return null;
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const d = new Date(parseInt(parts[3]), months[parts[1]], parseInt(parts[2]));
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const fmtDisplayDate = dateStr => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };

  const prevDay = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dt = new Date(y, m - 1, d - 1);
    setSelectedDate(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`);
  };
  const nextDay = () => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dt = new Date(y, m - 1, d + 1);
    setSelectedDate(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`);
  };

  // Build event map: rowId+hour → event list, respecting drag overrides
  const eventsForDay = filtered.filter(ev => parseDate(ev.date) === selectedDate);

  const getPos = ev => eventPositions[ev.id] || { rowId: matchVenueRow(ev), hour: parseHour(ev.time) };

  const byCell = {};
  eventsForDay.forEach(ev => {
    const pos = getPos(ev);
    if (!pos.rowId || pos.hour < 0) return;
    const key = `${pos.rowId}-${pos.hour}`;
    (byCell[key] = byCell[key] || []).push(ev);
  });

  // Unplaced events (TBD time or no venue match)
  const unplaced = eventsForDay.filter(ev => {
    const pos = getPos(ev);
    return !pos.rowId || pos.hour < 0;
  });

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleDrop = (rowId, hour) => {
    if (!dragEv) return;
    setEventPositions(p => ({ ...p, [dragEv.id]: { rowId, hour } }));
    showToast(`Moved to ${fmtHour(hour)} · ${VENUE_ROWS.find(r => r.id === rowId)?.label}`);
    setDragOver(null);
    setDragEv(null);
  };

  const ROW_W = 120; // label column width
  const CELL_H = 64;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: G50 }}>
      {/* Date nav bar */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${G200}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button onClick={prevDay} style={{ border: `1px solid ${G300}`, background: "#fff", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>‹ Prev</button>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
          style={{ padding: "5px 10px", border: `1px solid ${G300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: "#fff" }} />
        <button onClick={nextDay} style={{ border: `1px solid ${G300}`, background: "#fff", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Next ›</button>
        <span style={{ fontSize: 14, fontWeight: 600, color: G800, marginLeft: 4 }}>{fmtDisplayDate(selectedDate)}</span>
        <button onClick={() => setShowAll(s => !s)} style={{ marginLeft: "auto", fontSize: 12, color: BL, background: BLP, border: `1px solid #BFDBFE`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontFamily: "inherit" }}>
          {showAll ? "Show 7am–9pm" : "Show all 24h"}
        </button>
        <span style={{ fontSize: 11, color: G400, marginLeft: 8 }}>⬡ Drag events to change time or venue</span>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ display: "flex", minWidth: ROW_W + HOURS.length * 90 }}>
          {/* Row label column */}
          <div style={{ width: ROW_W, flexShrink: 0, borderRight: `1px solid ${G200}` }}>
            {/* Corner cell — aligns with hour header */}
            <div style={{ height: 36, borderBottom: `1px solid ${G200}`, background: G50 }} />
            {VENUE_ROWS.map(row => (
              <div key={row.id} style={{
                height: CELL_H, display: "flex", alignItems: "center",
                padding: row.type === "venue" ? "0 12px" : "0 12px 0 22px",
                background: row.type === "venue" ? G100 : "#fff",
                borderBottom: `1px solid ${G100}`,
                borderRight: `1px solid ${G200}`,
              }}>
                {row.type === "venue"
                  ? <div style={{ fontSize: 12, fontWeight: 700, color: G800, lineHeight: 1.3 }}>📍 {row.label}</div>
                  : <div style={{ fontSize: 12, color: G600, lineHeight: 1.3 }}>
                    <span style={{ opacity: .5, marginRight: 4 }}>└</span>{row.label}
                  </div>
                }
              </div>
            ))}
            {/* Unplaced row */}
            {unplaced.length > 0 && (
              <div style={{ height: "auto", minHeight: CELL_H, display: "flex", alignItems: "center", padding: "0 12px", background: "#fffbeb", borderBottom: `1px solid ${G100}`, borderRight: `1px solid ${G200}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: AM }}>⚠ TBD / Unplaced</div>
              </div>
            )}
          </div>

          {/* Hour columns */}
          <div style={{ flex: 1 }}>
            {/* Hour header row */}
            <div style={{ display: "flex", height: 36, borderBottom: `1px solid ${G200}`, background: G50 }}>
              {HOURS.map(h => (
                <div key={h} style={{ width: 90, flexShrink: 0, borderRight: `1px solid ${G100}`, display: "flex", alignItems: "center", paddingLeft: 6, fontSize: 10, fontWeight: 600, color: G400, textTransform: "uppercase", letterSpacing: ".04em" }}>
                  {fmtHourShort(h)}
                </div>
              ))}
            </div>

            {/* Venue/sub rows */}
            {VENUE_ROWS.map(row => (
              <div key={row.id} style={{ display: "flex", height: CELL_H, borderBottom: `1px solid ${G100}`, background: row.type === "venue" ? G100 : "#fff" }}>
                {HOURS.map(h => {
                  const key = `${row.id}-${h}`;
                  const cellEvs = byCell[key] || [];
                  const isOver = dragOver === key;
                  return (
                    <div key={h} style={{ width: 90, flexShrink: 0, borderRight: `1px solid ${G100}`, padding: "3px 3px", position: "relative", background: isOver ? "#EFF6FF" : row.type === "venue" ? G100 : "#fff", transition: "background .1s" }}
                      onDragOver={e => { e.preventDefault(); setDragOver(key); }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={() => handleDrop(row.id, h)}
                    >
                      {row.type === "sub" && cellEvs.map((ev, ei) => {
                        const label = ev.type === "practice" ? ev.home : `${ev.home}${ev.away ? ` vs ${ev.away}` : ""}`;
                        return (
                          <div key={ei} draggable
                            onDragStart={() => setDragEv(ev)}
                            onDragEnd={() => { setDragOver(null); setDragEv(null); }}
                            style={{ background: evColor(ev), borderRadius: 4, padding: "2px 5px", marginBottom: 2, cursor: "grab", userSelect: "none" }}
                            title={`${label} · ${ev.time}`}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.6)", flexShrink: 0 }} />
                              <span style={{ fontSize: 10, color: "#fff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 68 }}>{label}</span>
                            </div>
                            <div style={{ fontSize: 9, color: "rgba(255,255,255,.75)", paddingLeft: 9 }}>{ev.time.split(" ")[0]}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Unplaced events row */}
            {unplaced.length > 0 && (
              <div style={{ display: "flex", minHeight: CELL_H, borderBottom: `1px solid ${G100}`, background: "#fffbeb" }}>
                {HOURS.map(h => (
                  <div key={h} style={{ width: 90, flexShrink: 0, borderRight: `1px solid ${G100}` }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Unplaced events list below grid */}
        {unplaced.length > 0 && (
          <div style={{ padding: "10px 16px", background: "#fffbeb", borderTop: `1px solid #fde68a` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: AM, marginBottom: 6 }}>Unscheduled events on this date (TBD venue or time):</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {unplaced.map(ev => (
                <div key={ev.id} style={{ background: "#fff", border: `1px solid #fde68a`, borderRadius: 6, padding: "5px 10px", fontSize: 12, color: G700 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: evColor(ev), display: "inline-block", marginRight: 5 }} />
                  {ev.type === "practice" ? ev.home : `${ev.home} vs. ${ev.away}`} — TBD
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", background: G800, color: "#fff", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 99, boxShadow: "0 4px 16px rgba(0,0,0,.2)", whiteSpace: "nowrap" }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

/* ── VENUE UTILIZATION REPORT MODAL ── */
const VENUE_UTIL_DATA = [
  {
    venue: "Springfield High School", type: "", isHeader: true,
    count: "", sat1: "", sat2: "", sun1: "", sun2: "", tbd: ""
  },
  { venue: "Field 1 – Turf", type: "Turf", isHeader: false, count: 10, sat1: 2, sat2: 3, sun1: 4, sun2: 1, tbd: 0 },
  { venue: "Field 2 – Grass", type: "Grass", isHeader: false, count: 11, sat1: 3, sat2: 3, sun1: 2, sun2: 3, tbd: 0 },
  {
    venue: "Riverside Community Park", type: "", isHeader: true,
    count: "", sat1: "", sat2: "", sun1: "", sun2: "", tbd: ""
  },
  { venue: "Diamond A", type: "–", isHeader: false, count: 10, sat1: 4, sat2: 2, sun1: 2, sun2: 2, tbd: 0 },
  { venue: "Diamond B", type: "–", isHeader: false, count: 10, sat1: 4, sat2: 3, sun1: 3, sun2: 0, tbd: 2 },
];

function VenueUtilModal({ visible, onClose }) {
  if (!visible) return null;
  const th = {
    padding: "8px 10px", background: G800, color: "rgba(255,255,255,.75)",
    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: ".04em", textAlign: "left", whiteSpace: "nowrap"
  };
  const td = { padding: "8px 10px", borderBottom: `1px solid ${G100}`, fontSize: 12 };
  const tdNum = { ...td, textAlign: "center" };
  return (
    <Modal visible={visible} onClose={onClose} w={860}>
      <MHead title="Venue Utilization Report" onClose={onClose} />
      <div style={{ padding: "14px 22px", borderBottom: `1px solid ${G200}`, display: "flex", alignItems: "center", gap: 12 }}>
        <select style={{ padding: "6px 10px", border: `1px solid ${G300}`, borderRadius: 7, fontSize: 13, fontFamily: "inherit" }}>
          <option>Fall 2025 Season</option>
          <option>Spring 2025 Make-ups</option>
          <option>New Schedule</option>
          <option>All Schedules</option>
        </select>
        <span style={{ fontSize: 12, color: G500 }}>Utilization reflects all divisions across the selected schedule.</span>
      </div>
      <div style={{ overflowX: "auto", maxHeight: "60vh", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Venue", "Type", "Event Count", "Sat 9am–12:30pm", "Sat 2pm–7pm", "Sun 9am–12:30pm", "Sun 2pm–7pm", "TBD Times"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VENUE_UTIL_DATA.map((row, i) =>
              row.isHeader
                ? <tr key={i}>
                    <td colSpan={8} style={{ ...td, background: G50, fontWeight: 700, color: G700, padding: "6px 10px" }}>
                      {row.venue}
                    </td>
                  </tr>
                : <tr key={i}>
                    <td style={{ ...td, paddingLeft: 20 }}>{row.venue}</td>
                    <td style={{ ...td, color: G500 }}>{row.type}</td>
                    <td style={tdNum}>{row.count}</td>
                    <td style={tdNum}>{row.sat1}</td>
                    <td style={tdNum}>{row.sat2}</td>
                    <td style={tdNum}>{row.sun1}</td>
                    <td style={tdNum}>{row.sun2}</td>
                    <td style={{ ...tdNum, color: row.tbd > 0 ? AM : G500, fontWeight: row.tbd > 0 ? 700 : 400 }}>{row.tbd}</td>
                  </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "14px 22px 20px", display: "flex", gap: 8, justifyContent: "flex-end", borderTop: `1px solid ${G100}` }}>
        <Btn size="s" onClick={onClose}>Close</Btn>
      </div>
    </Modal>
  );
}

function EditGameModal({ ev, onClose, dismissedConflicts, onDismissConflict }) {
  const teams = ev.sch ? SCHED_TEAMS[ev.sch] || [] : DIVS.flatMap(d => d.teams);
  const [t1, setT1] = useState(ev.home || "");
  const [t2, setT2] = useState(ev.away || "");
  const hasConflict = ev.conflict && !dismissedConflicts.has(ev.id);

  const parsedDate = (() => {
    const m = ev.date?.match(/(\w+)\s+(\d+),\s+(\d+)/);
    if (!m) return "";
    const mo = { Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12" };
    return `${m[3]}-${mo[m[1]]}-${m[2].padStart(2,"0")}`;
  })();

  const moreActions = [
    ...(hasConflict ? [{ label: "Dismiss conflict", danger: false, onClick: () => { onDismissConflict(ev.id); onClose(); } }] : []),
    { label: "Cancel game", danger: true, onClick: () => { onClose(); alert("Game canceled."); } },
    { label: "Delete game", danger: true, onClick: () => { onClose(); alert("Game deleted."); } },
  ];

  const footer = (
    <div style={{ padding: "14px 24px 20px", borderTop: `1px solid ${G100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <MoreActionsMenu items={moreActions} />
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{ padding: "9px 20px", fontSize: 13, fontWeight: 600, background: "#fff", border: `1.5px solid ${G300}`, borderRadius: 24, cursor: "pointer", color: G700, fontFamily: "inherit" }}>Cancel editing</button>
        <button onClick={() => { onClose(); }} style={{ padding: "9px 22px", fontSize: 13, fontWeight: 700, background: BL, color: "#fff", border: "none", borderRadius: 24, cursor: "pointer", fontFamily: "inherit" }}>Save</button>
      </div>
    </div>
  );

  return (
    <GameModalShell title="Edit Game" onClose={onClose} footer={footer}>
      {/* Conflict notice */}
      {hasConflict && <div style={{ padding: "9px 13px", borderRadius: 8, background: "#fff8f8", border: `1px solid #fecaca`, fontSize: 12, color: RD, display: "flex", gap: 7 }}><span>⚠</span><span>Coach double-booked. Use More actions → Dismiss conflict to clear.</span></div>}
      {/* Schedule */}
      <FRow label="Attach to schedule">
        {ev.sch
          ? <input value={ev.sch} disabled style={PILL_DIS} />
          : <select defaultValue="" style={PILL}><option value="">-- None / manually added --</option><option>Fall 2025 Season</option><option>Spring 2025 Make-ups</option></select>
        }
        <div style={{ fontSize: 11, color: ev.sch ? G500 : G400, marginTop: 4 }}>{ev.sch ? "Schedule cannot be changed once a game is assigned to one." : "Team options are limited to teams in the selected schedule."}</div>
        {ev.sch && ev.pub !== "published" && <div style={{ display: "flex", alignItems: "baseline", gap: 5, fontSize: 11, color: "#92400e", marginTop: 5 }}><span>⚠</span><span>Games added to a schedule are in <strong>Draft</strong> state until published.</span></div>}
      </FRow>
      {/* Team 1 */}
      <FRow label="Team 1" req>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...PILL, flex: .8 }}><option>Internal</option><option>External</option></select>
          <select value={t1} onChange={e => setT1(e.target.value)} style={{ ...PILL, flex: 2 }}><option value="">Select a team</option>{teams.map(t => <option key={t}>{t}</option>)}</select>
          <select defaultValue="Home" style={{ ...PILL, flex: .8 }}><option>Home</option><option>Away</option></select>
        </div>
      </FRow>
      {/* Team 2 */}
      <FRow label="Team 2" req>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...PILL, flex: .8 }}><option>Internal</option><option>External</option></select>
          <select value={t2} onChange={e => setT2(e.target.value)} style={{ ...PILL, flex: 2 }}><option value="">Select a team</option>{teams.filter(t => t !== t1).map(t => <option key={t}>{t}</option>)}</select>
          <select defaultValue="Away" style={{ ...PILL, flex: .8 }}><option>Away</option><option>Home</option></select>
        </div>
      </FRow>
      {/* Date */}
      <FRow label="Date" req>
        <div style={{ position: "relative" }}>
          <input type="date" defaultValue={parsedDate} style={{ ...PILL, paddingRight: 40 }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G400} strokeWidth="2" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
      </FRow>
      {/* Start Time */}
      <FRow label="Start Time">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select defaultValue={ev.time?.split(" – ")[0] || "TBD"} style={{ ...PILL, flex: 1 }}>
            <option>TBD</option><option>8:00 AM</option><option>9:00 AM</option><option>9:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option><option>12:00 PM</option><option>1:30 PM</option><option>2:30 PM</option><option>3:00 PM</option>
          </select>
          <span style={{ fontSize: 13, fontWeight: 600, color: BL, whiteSpace: "nowrap" }}>CT – Central</span>
        </div>
        <div style={{ fontSize: 11, color: G400, marginTop: 4 }}>Leave empty for TBD start time</div>
      </FRow>
      {/* Duration */}
      <FRow label="Duration" req>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...PILL, flex: 1 }}><option>0 hours</option><option>1 hour</option><option>1.5 hours</option><option>2 hours</option></select>
          <select style={{ ...PILL, flex: 1 }}><option>0 minutes</option><option>15 minutes</option><option>30 minutes</option><option>45 minutes</option></select>
        </div>
      </FRow>
      {/* Venue */}
      <FRow label="Venue">
        <select defaultValue={ev.venue || "TBD"} style={PILL}>
          <option>TBD</option><option>Springfield High School – Field 1 – Turf</option><option>Springfield High School – Field 2 – Grass</option><option>Riverside Community Park – Diamond A</option><option>Riverside Community Park – Diamond B</option>
        </select>
      </FRow>
      {/* Notes */}
      <FRow label="Notes">
        <textarea rows={3} placeholder="Add notes" style={{ ...PILL, resize: "vertical", borderRadius: 12 }} />
      </FRow>
    </GameModalShell>
  );
}

export default function ScheduleTab({ hideHeader = false }) {
  const [evts, setEvts] = useState(EVTS);
  const [overlay, setOverlay] = useState(null);
  const [modal, setModal] = useState(null);
  const [editingEv, setEditingEv] = useState(null);
  const [schedTab, setSchedTab] = useState("list");
  const [F, setF] = useState({ div: "", ven: "", type: "", status: "", pub: "", sch: "", conflict: "" });
  const sf = (k, v) => setF(f => ({ ...f, [k]: v }));
  const clearF = () => setF({ div: "", ven: "", type: "", status: "", pub: "", sch: "", conflict: "" });
  const hasF = Object.values(F).some(v => v && !v.startsWith("All"));
  const [sel, setSel] = useState(new Set());
  const [canceledIds, setCanceledIds] = useState(new Set());
  const [dismissedConflicts, setDismissedConflicts] = useState(new Set());

  const divOptsFlat = [
    { v: "All Divisions & Teams", l: "All Divisions & Teams" },
    ...DIVS.flatMap(d => [{ divHdr: true, l: d.l }, { v: d.l, l: d.l }, ...d.teams.map(t => ({ v: t, l: "\u00a0\u00a0\u00a0\u00a0" + t }))])
  ];

  const filtered = evts.filter(ev => {
    if (F.div && !F.div.startsWith("All")) { if (ev.div !== F.div && ev.home !== F.div && ev.away !== F.div) return false; }
    if (F.ven && !F.ven.startsWith("All") && !ev.venue.includes(F.ven)) return false;
    if (F.type && F.type !== "All Types" && ev.type !== F.type.toLowerCase()) return false;
    if (F.status && F.status !== "All Status" && ev.status !== F.status.toLowerCase()) return false;
    if (F.pub && F.pub !== "All" && ev.pub !== F.pub.toLowerCase()) return false;
    if (F.sch && !F.sch.startsWith("All") && ev.sch !== F.sch) return false;
    if (F.conflict === "yes" && (!ev.conflict || dismissedConflicts.has(ev.id))) return false;
    return true;
  });
  const grouped = filtered.reduce((acc, ev) => { (acc[ev.date] = acc[ev.date] || []).push(ev); return acc; }, {});
  const togSel = id => { const n = new Set(sel); n.has(id) ? n.delete(id) : n.add(id); setSel(n); };
  const allSel = filtered.length > 0 && sel.size === filtered.length;
  const someSel = sel.size > 0 && !allSel;
  const togAll = () => setSel(allSel ? new Set() : new Set(filtered.map(e => e.id)));

  const TH = { textAlign: "left", padding: "10px 16px", borderBottom: `1px solid ${G200}`, fontWeight: 600, fontSize: 13, color: G700, background: "#fff", position: "sticky", top: 0, zIndex: 2, whiteSpace: "nowrap" };
  const TD = { padding: "12px 16px", borderBottom: `1px solid ${G100}`, fontSize: 13, verticalAlign: "middle" };

  const schedView = (
    <div className="flex flex-col h-full overflow-hidden relative bg-neutral-background-medium">
      {/* Header Row */}
      <div className={`px-4 border-neutral-border flex items-center justify-between  ${hideHeader ? 'py-3' : ''}`}>
        {!hideHeader ? (
          <div className="flex gap-8">
            <button onClick={() => setSchedTab("list")} className={`py-4 text-sm font-bold relative transition-all ${schedTab === "list" ? "text-admin-action-text" : "text-neutral-text-medium hover:text-admin-action-text"}`}>
              All Events
              {schedTab === "list" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />}
            </button>
            <button onClick={() => setSchedTab("weekly")} className={`py-4 text-sm font-bold relative transition-all ${schedTab === "weekly" || schedTab === "monthly" ? "text-admin-action-text" : "text-neutral-text-medium hover:text-admin-action-text"}`}>
              Calendar
              {(schedTab === "weekly" || schedTab === "monthly") && <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />}
            </button>
            <button onClick={() => setSchedTab("venue")} className={`py-4 text-sm font-bold relative transition-all ${schedTab === "venue" ? "text-admin-action-text" : "text-neutral-text-medium hover:text-admin-action-text"}`}>
              Venue
              {schedTab === "venue" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />}
            </button>
          </div>
        ) : (
          <div /> // Spacer for flex justify-between
        )}

        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-full border-2 border-admin-action-border bg-white text-admin-action-text text-sm font-bold hover:bg-admin-action-background-weak-hover transition-all flex items-center gap-2 shadow-sm">
            <Download size={18} />
            <span>Export</span>
          </button>
          
          <DD right w={230} trigger={
            <button type="button" className="px-6 py-2 rounded-full bg-admin-action-background text-white text-sm font-bold hover:bg-admin-action-text-hover transition-colors flex items-center gap-2 shadow-md">
              <span>Add/Import</span>
              <ChevronDown size={18} />
            </button>
          }>
            <DDLbl>Auto-schedule</DDLbl>
            <DDItem hi onClick={() => setOverlay("wizard-new")}>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-admin-action-text" fill="currentColor" />
                <span className="font-bold text-admin-action-text">Create game schedule</span>
              </div>
            </DDItem>
            <DDItem onClick={() => setOverlay("wizard-edit")}>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-neutral-icon" />
                <span>Edit existing schedule</span>
              </div>
            </DDItem>
            <DDSep />
            <DDLbl>Add individually</DDLbl>
            <DDItem onClick={() => setModal("addGame")}>Add game</DDItem>
            <DDItem onClick={() => alert("Add practice")}>Add practice</DDItem>
            <DDItem onClick={() => alert("Add other event")}>Add other event</DDItem>
            <DDSep />
            <DDLbl>Import</DDLbl>
            <DDItem onClick={() => alert("Import games")}>Import games</DDItem>
            <DDItem onClick={() => alert("Import practices")}>Import practices</DDItem>
          </DD>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <section className="px-4 py-4 mb-2">
        <div className="flex gap-2 mb-2 justify-between items-center">
          <div className="flex gap-2 flex-wrap items-center">
            <fieldset className="w-fit">
              <button type="button" className="flex w-full items-center justify-between gap-1 rounded-full border border-solid border-neutral-border bg-white px-3 text-sm hover:border-action-border-hover h-[32px] cursor-pointer font-semibold">
                <span className="flex flex-row gap-1 items-center">
                  <Calendar size={14} className="text-neutral-icon-medium" />
                  <span>04/22/2026 - 12/31/2026</span>
                </span>
                <ChevronDown size={14} className="ml-1 text-neutral-icon-medium" />
              </button>
            </fieldset>
            <Chip label="Schedule" value={F.sch} opts={["All Schedules", "Fall 2025 Season", "Spring 2025 Make-ups", "New Schedule"]} onSel={v => sf("sch", v)} name="schedule" />
            <Chip label="Divisions" value={F.div} opts={divOptsFlat} onSel={v => sf("div", v)} name="divisionAndTeams" />
            <Chip label="Event type" value={F.type} opts={["All Types", "Game", "Practice", "Other Event"]} onSel={v => sf("type", v)} name="types" />
            <Chip label="Teams" value={F.div} opts={divOptsFlat} onSel={v => sf("div", v)} name="teams" />
            {hasF && <button onClick={clearF} className="text-sm text-admin-action-text font-semibold px-2 hover:underline cursor-pointer">Clear all</button>}
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#FEF2F2] border border-[#FEE2E2] px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="bg-red-500 rounded-full p-1">
                <Info size={12} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-red-800 uppercase tracking-wider leading-none">Attention Required</span>
                <span className="text-xs font-bold text-red-600">23 VENUE CONFLICTS</span>
              </div>
              <button className="bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors uppercase ml-2">
                View & Resolve
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="flex-1 overflow-hidden flex flex-col px-4 pb-10">
        <div className="mb-4 flex flex-col h-full">
          {/* Legend / Pagination Header */}
          <header className="flex border border-neutral-border items-center pl-[20px] rounded-t-lg gap-4 bg-white flex-shrink-0">
            <button type="button" className="text-admin-action-text text-sm font-bold py-2 hover:bg-admin-action-background-weak-hover px-2 rounded-lg transition-all">PT - Pacific</button>
            <div className="flex gap-2">
              <p className="flex items-center gap-1 text-[11px]"><span className="block size-[12px] bg-[#22c55e] rounded-full"></span>Game</p>
              <p className="flex items-center gap-1 text-[11px]"><span className="block size-[12px] bg-[#F57C00] rounded-full"></span>Practice</p>
              <p className="flex items-center gap-1 text-[11px]"><span className="block size-[12px] bg-[#2563EB] rounded-full"></span>Other event</p>
            </div>

            {/* View Switcher (Added for utility) */}
            <div className="flex border border-neutral-border rounded-lg overflow-hidden ml-4 scale-90">
              {[['list','List'],['monthly','Month'],['weekly','Week'],['venue','Venue']].map(([v,l]) => (
                <button key={v} onClick={() => setSchedTab(v)} className={`px-3 py-1 text-xs font-bold ${schedTab === v ? 'bg-admin-action-background text-white' : 'bg-white text-neutral-text-medium hover:bg-neutral-background-weak'} border-r last:border-r-0 border-neutral-border transition-colors`}>{l}</button>
              ))}
            </div>

            <div className="flex items-center gap-2 p-2 flex-wrap ml-auto">
              <div className="flex items-center gap-2 text-sm">
                <select className="rounded-lg border border-neutral-border bg-white px-2 py-1 text-xs focus:outline-none">
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-text-medium">
                <button className="text-neutral-icon-disabled cursor-not-allowed"><ChevronLeft size={16} /></button>
                <span className="font-medium">1 - {filtered.length} of {evts.length}</span>
                <button className="text-neutral-icon-disabled cursor-not-allowed"><ChevronRight size={16} /></button>
              </div>
            </div>
          </header>

          {/* Table Container */}
          <div className="flex-1 overflow-auto border-l border-r border-b border-neutral-border bg-white rounded-b-lg hide-scrollbar">
            {schedTab === "list" ? (
              filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] gap-2">
                  <div className="text-4xl">📋</div>
                  <div className="text-lg font-bold text-neutral-text-medium">No events match your filters</div>
                  <button onClick={clearF} className="text-admin-action-text font-bold hover:underline">Clear all filters</button>
                </div>
              ) : (
                <table className="w-full border-spacing-0 border-separate text-sm">
                  <thead className="bg-neutral-background-weak sticky top-0 z-20">
                    <tr>
                      <th className="p-2 text-left align-middle text-label !font-semibold min-h-[44px] font-bold border-b border-neutral-border w-[40px]">
                        <CB on={allSel} onChange={togAll} half={someSel} />
                      </th>
                      <th className="p-2 text-left align-middle text-label !font-semibold min-h-[44px] font-bold border-b border-neutral-border w-[120px]">Time</th>
                      <th className="p-2 text-left align-middle text-label !font-semibold min-h-[44px] font-bold border-b border-neutral-border">Team(s)</th>
                      <th className="p-2 text-left align-middle text-label !font-semibold min-h-[44px] font-bold border-b border-neutral-border">Venue</th>
                      <th className="p-2 text-left align-middle text-label !font-semibold min-h-[44px] font-bold border-b border-neutral-border">Status</th>
                      <th className="p-2 text-right align-middle text-label !font-semibold min-h-[44px] font-bold border-b border-neutral-border pr-4 w-[100px]"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {Object.entries(grouped).map(([date, evs]) => [
                      <tr key={date} className="sticky top-[37px] z-10">
                        <td colSpan={6} className="bg-white border-b border-neutral-border p-0">
                          <div className="p-2 flex gap-2 items-center font-bold text-neutral-text">
                            <CB on={false} onChange={() => {}} /> {date}
                          </div>
                        </td>
                      </tr>,
                      ...evs.map(ev => {
                        const canceled = ev.status === "canceled" || canceledIds.has(ev.id);
                        const isSel = sel.has(ev.id);
                        return (
                          <tr key={ev.id} className={`group/row [&_td]:border-b [&_td]:border-solid [&_td]:border-neutral-border hover:bg-neutral-background-weak transition-colors ${isSel ? 'bg-admin-action-background-weak-hover' : ''}`}>
                            <td className="p-2 align-top w-[40px] pr-0">
                              <CB on={isSel} onChange={() => togSel(ev.id)} />
                            </td>
                            <td className="p-2 align-top pl-0 w-[120px]">
                              <p className={`text-neutral-text-medium pt-[5px] ${canceled ? 'line-through' : ''}`}>{ev.time}</p>
                            </td>
                            <td className="p-2 align-top py-0">
                              <div className="flex gap-2 py-2 min-h-[60px] items-center">
                                <span className={`block size-[12px] rounded-full flex-shrink-0`} style={{ background: canceled ? G300 : TDOT[ev.type] }}></span>
                                <div className="flex flex-col justify-center">
                                  <div className={`font-bold ${canceled ? 'text-neutral-text-disabled line-through' : 'text-neutral-text'}`}>
                                    {ev.type === "practice" ? ev.home : <>{ev.home} vs.<br/>{ev.away}</>}
                                  </div>
                                  {ev.conflict && !canceled && !dismissedConflicts.has(ev.id) && (
                                    <div className="text-[10px] text-red-500 font-bold">⚠ Coach double-booked</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 align-middle">
                              <p className={`${canceled ? 'line-through text-neutral-text-disabled' : ''}`}>{ev.venue}</p>
                              {ev.sub && <p className="text-xs text-neutral-text-medium">{ev.sub}</p>}
                            </td>
                            <td className="p-2 align-middle">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ev.pub === 'published' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                {ev.pub === 'published' ? 'PUBLISHED' : 'DRAFT'}
                              </span>
                            </td>
                            <td className="p-2 align-middle pr-4">
                              <div className="flex gap-2 items-center justify-end">
                                <button onClick={() => setEditingEv(ev)} className="grid place-content-center rounded-full border border-transparent active:scale-95 text-admin-action-text hover:border-admin-action-border hover:bg-admin-action-background-weak-hover h-[32px] w-[32px] transition-all">
                                  <Edit2 size={16} />
                                </button>
                                <button className="grid place-content-center rounded-full border border-transparent active:scale-95 text-admin-action-text hover:border-admin-action-border hover:bg-admin-action-background-weak-hover h-[32px] w-[32px] transition-all">
                                  <ChevronRight size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ])}
                  </tbody>
                </table>
              )
            ) : schedTab === "monthly" ? (
              <MonthlyCalendar filtered={filtered} />
            ) : schedTab === "weekly" ? (
              <WeeklyCalendar filtered={filtered} />
            ) : (
              <VenueView filtered={filtered} />
            )}
          </div>
        </div>
      </section>

      {/* Bulk Action Bar (Matching TeamSnap style) */}
      {sel.size > 0 && (
        <div className="fixed bottom-6 left-[50%] translate-x-[-50%] bg-[#1e3a8a] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-[100] animate-in slide-in-from-bottom-4">
          <span className="font-bold">{sel.size} selected</span>
          <div className="flex gap-2">
            <button onClick={() => setModal("pubSel")} className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 text-sm font-bold transition-colors">Publish</button>
            <button onClick={() => setModal("bulkEdit")} className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 text-sm font-bold transition-colors">Bulk Edit</button>
            <button onClick={() => { setCanceledIds(c => { const n = new Set(c); sel.forEach(id => n.add(id)); return n; }); setSel(new Set()); }} className="px-4 py-1 rounded-full bg-red-500/80 hover:bg-red-500 text-sm font-bold transition-colors">Cancel</button>
          </div>
          <button onClick={() => setSel(new Set())} className="ml-4 opacity-70 hover:opacity-100"><X size={18} /></button>
        </div>
      )}

      {/* Modals */}
      <BalanceModal visible={modal === "balance"} onClose={() => setModal(null)} onTeamF={t => sf("div", t)} />
      {modal === "addGame" && <AddGameModal visible={true} onClose={() => setModal(null)} defaultSch={F.sch && !F.sch.startsWith("All") ? F.sch : ""} />}
      {editingEv && <EditGameModal ev={editingEv} onClose={() => setEditingEv(null)} dismissedConflicts={dismissedConflicts} onDismissConflict={id => setDismissedConflicts(s => { const n = new Set(s); n.add(id); return n; })} />}
      <PublishModal visible={modal === "pubAll"} onClose={() => setModal(null)} mode="all" selCount={sel.size} onPublish={() => {
        setEvts(prev => prev.map(e => {
          if (e.pub === "draft") {
            return { ...e, pub: "published" };
          }
          return e;
        }));
      }} />
      <PublishModal visible={modal === "pubSel"} onClose={() => setModal(null)} mode="selected" selCount={sel.size} onPublish={() => {
        setEvts(prev => prev.map(e => {
          if (sel.has(e.id) && e.pub === "draft") {
            return { ...e, pub: "published" };
          }
          return e;
        }));
        setSel(new Set());
      }} />
      <VenueUtilModal visible={modal === "venueUtil"} onClose={() => setModal(null)} />
      <BulkEditModal 
        visible={modal === "bulkEdit"} 
        onClose={() => setModal(null)} 
        selectedEvents={filtered.filter(e => sel.has(e.id))}
        onUpdateEvents={(updates) => {
          // Update all selected events with the provided changes
          setEvts(prev => prev.map(e => {
            if (sel.has(e.id)) {
              const updated = { ...e };
              if (updates.date) {
                // Convert date input (YYYY-MM-DD) to event date format (e.g., "Sat May 3, 2026")
                const d = new Date(updates.date);
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                updated.date = `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
              }
              if (updates.startTime) {
                // Parse start time and calculate end time based on existing duration
                const [hours, minutes] = updates.startTime.split(':').map(Number);
                const timeStr = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
                // Extract duration from existing time (e.g., "9:00 AM – 10:15 AM PT")
                const existingTimeParts = e.time.split(' – ');
                const endTime = existingTimeParts[1] ? existingTimeParts[1].split(' ')[0] + ' ' + existingTimeParts[1].split(' ')[1] : '';
                updated.time = `${timeStr} – ${endTime} PT`;
              }
              if (updates.type) updated.type = updates.type;
              if (updates.venue) updated.venue = updates.venue;
              if (updates.sub) updated.sub = updates.sub;
              return updated;
            }
            return e;
          }));
          setSel(new Set());
        }}
      />
    </div>
  );

  return (
    <div style={{ position: "relative", height: "100%", minHeight: 500 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {schedView}
      {overlay && createPortal(
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <WizardPanel mode={overlay === "wizard-new" ? "new" : "edit"} onClose={() => setOverlay(null)} onDone={scheduleName => { setOverlay(null); sf("sch", scheduleName); }} />
        </div>,
        document.body
      )}
    </div>
  );
}
