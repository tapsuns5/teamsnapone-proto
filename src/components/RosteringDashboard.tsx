import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  ChevronDown, 
  GripVertical, 
  MoreVertical, 
  Columns, 
  RotateCcw,
  ChevronUp
} from 'lucide-react';

const participants = [
  { id: '1', name: 'Jack Jones', team: 'Unassigned', role: 'Player', dob: '', gender: 'male' }
];

const teams = [
  {
    id: 'team-1',
    name: "Tyler's Baseball Team",
    division: 'No Division',
    staffCount: 3,
    playerCount: 5,
    staff: [
      { name: 'Tyler Staff', role: 'Coach' },
      { name: 'Tyler Staf Palmer', role: 'Head Coach' },
      { name: 'Tyler Staff2 Palmer', role: 'Head Coach' }
    ],
    players: [
      { name: 'Tyler Palmer' },
      { name: 'Emily Palmer' },
      { name: 'Jack Jones' },
      { name: 'Jack Jones' },
      { name: 'Jack Jones' }
    ]
  }
];

export default function RosteringDashboard() {
  const [isTeamExpanded, setIsTeamExpanded] = useState(true);

  return (
    <div className="max-w-full overflow-x-hidden relative pt-4 px-4 pb-24">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="w-full">
          <h2 className="text-heading-md font-bold mb-1">Program</h2>
          <p className="text-sm text-neutral-text-medium mb-3">Choose a program to assign participants to teams and manage your rosters.</p>
          <div className="relative md:max-w-[250px]">
            <select className="w-full bg-white border border-neutral-border rounded-lg px-4 py-2.5 text-sm font-semibold appearance-none focus:outline-none focus:border-admin-action-border">
              <option>FTL Optimist Baseball Spring 2026</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
          </div>
        </div>
        <div className="flex items-start">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-neutral-border bg-white text-sm font-bold hover:bg-neutral-background-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-col xl:flex-row gap-4 h-full min-h-[600px]">
        
        {/* Left Pane - Participants */}
        <section className="flex-1 bg-neutral-background-weak rounded-3xl border border-neutral-border overflow-hidden flex flex-col shadow-sm">
          <header className="px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-neutral-border">
            <h3 className="text-lg font-bold whitespace-nowrap">Participants (1/13)</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium" />
                <input 
                  type="text" 
                  placeholder="Search participants" 
                  className="w-full pl-10 pr-4 py-1.5 bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm"
                />
              </div>
              <button className="p-2 rounded-full border border-admin-action-border text-admin-action-text bg-white hover:bg-admin-action-background-weak-hover transition-colors">
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Filters */}
          <div className="px-4 py-2 border-b border-neutral-border bg-white/50">
            <div className="flex flex-wrap gap-1.5 items-center">
              <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-border bg-white text-xs font-semibold hover:border-admin-action-border transition-colors">
                <span>Status</span>
                <span className="w-px h-3 bg-neutral-border mx-0.5"></span>
                <span className="text-admin-action-text">Unassigned</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {['Age', 'Gender', 'Role', 'Division', 'Team'].map(filter => (
                <button key={filter} className="flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-neutral-border-medium bg-white text-xs font-semibold hover:border-admin-action-border transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{filter}</span>
                </button>
              ))}
              <button className="text-xs font-bold text-admin-action-text px-2 hover:underline">Clear all</button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-neutral-background-medium/50 sticky top-0 z-10">
                  <th className="px-4 py-3 border-b border-neutral-border w-12">
                    <input type="checkbox" className="rounded border-neutral-border" />
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-neutral-text-medium border-b border-neutral-border border-r border-neutral-border">Name</th>
                  <th className="px-4 py-3 text-xs font-bold text-neutral-text-medium border-b border-neutral-border">Team</th>
                  <th className="px-4 py-3 text-xs font-bold text-neutral-text-medium border-b border-neutral-border">Role</th>
                  <th className="px-4 py-3 text-xs font-bold text-neutral-text-medium border-b border-neutral-border">DOB</th>
                  <th className="px-4 py-3 text-xs font-bold text-neutral-text-medium border-b border-neutral-border">Gender</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(p => (
                  <tr key={p.id} className="hover:bg-neutral-background-medium/30 group transition-colors">
                    <td className="px-4 py-3 border-b border-neutral-border">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-neutral-icon-medium opacity-0 group-hover:opacity-100 cursor-grab" />
                        <input type="checkbox" className="rounded border-neutral-border" />
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-neutral-border border-r border-neutral-border font-medium text-sm">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 border-b border-neutral-border">
                      <div className="relative max-w-[150px]">
                        <select className="w-full bg-transparent border border-neutral-border rounded px-2 py-1 text-xs appearance-none focus:outline-none focus:border-admin-action-border">
                          <option>{p.team}</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-icon-medium pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b border-neutral-border text-sm">{p.role}</td>
                    <td className="px-4 py-3 border-b border-neutral-border text-sm">{p.dob}</td>
                    <td className="px-4 py-3 border-b border-neutral-border text-sm">{p.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Pane - Teams */}
        <section className="flex-1 bg-white rounded-3xl border border-neutral-border overflow-hidden flex flex-col shadow-sm">
          <header className="px-4 py-3 flex justify-between items-center border-b border-neutral-border">
            <h3 className="text-lg font-bold">Teams (1)</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium" />
                <input 
                  type="text" 
                  placeholder="Search teams" 
                  className="pl-10 pr-4 py-1.5 bg-neutral-background-medium/30 border border-neutral-border rounded-lg focus:outline-none focus:bg-white focus:border-admin-action-border transition-all text-sm"
                />
              </div>
              <button className="p-2 rounded-full border border-neutral-border text-neutral-icon-medium hover:bg-neutral-background-medium transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="px-4 py-2 border-b border-neutral-border bg-neutral-background-medium/20">
            <div className="flex gap-1.5">
              {['Division', 'Team'].map(filter => (
                <button key={filter} className="flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-neutral-border-medium bg-white text-xs font-semibold hover:border-admin-action-border transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  <span>{filter}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 bg-neutral-background-medium/30 overflow-y-auto">
            <div className="grid gap-4">
              {teams.map(team => (
                <div key={team.id} className="bg-white rounded-2xl shadow-sm border border-neutral-border overflow-hidden">
                  <header 
                    className="p-4 flex justify-between items-start cursor-pointer hover:bg-neutral-background-medium/20 transition-colors"
                    onClick={() => setIsTeamExpanded(!isTeamExpanded)}
                  >
                    <div>
                      <h4 className="font-bold text-neutral-text">{team.name}</h4>
                      <p className="text-xs text-neutral-text-medium mb-1">{team.division}</p>
                      <div className="flex gap-3">
                        <span className="text-[10px] font-bold text-neutral-icon-medium uppercase tracking-wider">Staff: {team.staffCount}</span>
                        <span className="text-[10px] font-bold text-neutral-icon-medium uppercase tracking-wider">Players: {team.playerCount}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-full hover:bg-neutral-background-medium transition-colors">
                      {isTeamExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </header>

                  {isTeamExpanded && (
                    <div className="px-4 pb-4 border-t border-neutral-border/50 pt-3">
                      <div className="mb-4">
                        <p className="text-[11px] font-bold text-neutral-text-medium uppercase tracking-widest mb-2">Staff</p>
                        <div className="grid gap-1">
                          {team.staff.map((s, i) => (
                            <div key={i} className="flex items-center group py-1">
                              <GripVertical className="w-3.5 h-3.5 text-neutral-icon-medium opacity-0 group-hover:opacity-100 cursor-grab mr-1" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{s.name}</p>
                                <p className="text-[10px] text-neutral-text-medium">{s.role}</p>
                              </div>
                              <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-neutral-background-medium transition-all">
                                <MoreVertical className="w-3.5 h-3.5 text-neutral-icon-medium" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-neutral-text-medium uppercase tracking-widest mb-2">Players</p>
                        <div className="grid gap-1">
                          {team.players.map((p, i) => (
                            <div key={i} className="flex items-center group py-1">
                              <GripVertical className="w-3.5 h-3.5 text-neutral-icon-medium opacity-0 group-hover:opacity-100 cursor-grab mr-1" />
                              <p className="text-sm font-medium">{p.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Footer Stats */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-fit">
        <div className="bg-white border border-neutral-border rounded-full shadow-xl px-6 py-2 flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-[10px] text-neutral-text-medium uppercase font-bold">Unassigned</p>
              <p className="text-sm font-bold">1</p>
            </div>
            <div className="w-px h-8 bg-neutral-border"></div>
            <div className="text-center">
              <p className="text-[10px] text-neutral-text-medium uppercase font-bold">Assigned</p>
              <p className="text-sm font-bold">12</p>
            </div>
            <div className="w-px h-8 bg-neutral-border"></div>
            <div className="text-center">
              <p className="text-[10px] text-neutral-text-medium uppercase font-bold">Pending</p>
              <p className="text-sm font-bold">0</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button disabled className="bg-accent-background text-white px-6 py-2 rounded-full text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              Publish 0 changes
            </button>
            <button disabled className="p-2 rounded-full border border-neutral-border text-neutral-icon-disabled disabled:opacity-50">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
