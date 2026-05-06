import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, EyeOff, Settings as SettingsIcon, BarChart3 } from 'lucide-react';
import DetailedStandingsDialog from './DetailedStandingsDialog';

interface Team {
  id: string;
  name: string;
  rank: number;
  gp: number;
  pts: number;
  w: number;
  l: number;
  t: number;
  pf: number;
  pa: number;
  pd: number;
}

interface Division {
  id: string;
  name: string;
  hasEditButton: boolean;
  teams: Team[];
  hasTeams: boolean;
}

const mockDivisions: Division[] = [
  {
    id: 'no-division',
    name: 'No Division',
    hasEditButton: false,
    teams: [],
    hasTeams: false
  },
  {
    id: 'nl-east',
    name: 'NL East',
    hasEditButton: true,
    teams: [
      { id: '1', name: 'Marlins', rank: 1, gp: 3, pts: 9, w: 3, l: 0, t: 0, pf: 20, pa: 8, pd: 12 },
      { id: '2', name: 'Nationals', rank: 2, gp: 2, pts: 6, w: 2, l: 0, t: 0, pf: 20, pa: 2, pd: 18 },
      { id: '3', name: 'Braves', rank: 3, gp: 2, pts: 2, w: 1, l: 1, t: 0, pf: 8, pa: 13, pd: -5 },
      { id: '4', name: 'Mets', rank: 4, gp: 3, pts: 1, w: 1, l: 2, t: 0, pf: 14, pa: 22, pd: -8 },
      { id: '5', name: 'Phillies', rank: 5, gp: 4, pts: -4, w: 0, l: 4, t: 0, pf: 6, pa: 23, pd: -17 }
    ],
    hasTeams: true
  },
  {
    id: 'standings',
    name: 'Standings',
    hasEditButton: false,
    teams: [],
    hasTeams: false
  }
];

export default function StandingsTab() {
  const [expandedDivisions, setExpandedDivisions] = useState<string[]>(['no-division', 'nl-east', 'standings']);
  const [selectedDivisionForDetails, setSelectedDivisionForDetails] = useState<string | null>(null);

  const toggleDivision = (id: string) => {
    setExpandedDivisions(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const collapseAll = () => {
    setExpandedDivisions([]);
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header */}
      <header className="flex flex-wrap gap-2 my-2 items-center pt-1 md:flex-row-reverse">
        <div className="flex flex-col lg:flex-row lg:justify-end items-center gap-1 lg:gap-2">
          <span className="text-caption w-full md:w-auto text-neutral-text-medium">Ranking calculated by points</span>
          <div className="w-full flex gap-2 items-center md:w-auto">
            <button 
              onClick={collapseAll}
              className="px-4 py-2 h-[36px] rounded-full border-2 border-admin-action-border text-admin-action-text bg-white font-bold hover:bg-admin-action-background-weak-hover transition-colors text-sm flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              <span>Collapse all</span>
            </button>
            <button className="px-4 py-2 h-[36px] rounded-full border-2 border-admin-action-border text-admin-action-text bg-white font-bold hover:bg-admin-action-background-weak-hover transition-colors text-sm flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Division Cards */}
      <div className="flex flex-col gap-2">
        {mockDivisions.map((division) => (
          <div 
            key={division.id}
            className="rounded-[16px] border border-solid border-neutral-border bg-neutral-background-weak py-1 px-0"
          >
            {/* Division Header */}
            <div 
              className="cursor-pointer py-0 px-2"
              onClick={() => toggleDivision(division.id)}
            >
              <div className="flex flex-row items-center justify-between">
                <span className="select-none transition-transform duration-300 ease-in-out mr-1">
                  {expandedDivisions.includes(division.id) ? (
                    <ChevronDown className="w-6 h-6 text-neutral-icon-medium" />
                  ) : (
                    <ChevronUp className="w-6 h-6 text-neutral-icon-medium" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center w-full lg:min-h-[48px]">
                    <h2 className="text-heading-sm text-neutral-text font-semibold">{division.name}</h2>
                    <span className="flex lg:gap-1 items-center">
                      {division.hasTeams && (
                        <button 
                          onClick={() => setSelectedDivisionForDetails(division.id)}
                          className="grid place-content-center rounded-full border border-transparent text-admin-action-text hover:border-admin-action-border hover:bg-admin-action-background-weak-hover active:bg-admin-action-background-weak-pressed h-[48px] w-[48px] min-w-[48px]"
                        >
                          <BarChart3 className="w-5 h-5" />
                        </button>
                      )}
                      {division.hasEditButton && (
                        <button className="grid place-content-center rounded-full border border-transparent text-admin-action-text hover:border-admin-action-border hover:bg-admin-action-background-weak-hover active:bg-admin-action-background-weak-pressed h-[48px] w-[48px] min-w-[48px]">
                          <Edit2 className="w-5 h-5" />
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Division Content */}
            {expandedDivisions.includes(division.id) && (
              <div style={{ display: 'grid', gridTemplateRows: '1fr', transition: 'grid-template-rows 260ms' }}>
                <div style={{ overflow: 'hidden' }}>
                  {!division.hasTeams ? (
                    <p className="px-3 pt-1 pb-2 text-body-dense text-neutral-text-medium">
                      You do not have any active teams in this division. Add a team to this division to view standings.
                    </p>
                  ) : (
                    <div>
                      {/* Drag instruction */}
                      <div className="pb-1 pt-2">
                        <div className="w-full flex pt-0.5 px-3 justify-center bg-admin-action-background-weak-hover text-sm text-neutral-text">
                          Drag a row to change team rank. New scores added will reset ranking to program default.
                        </div>
                      </div>
                      
                      {/* Standings Table */}
                      <div className="px-2 py-1 overflow-x-auto">
                        <table className="w-full border-spacing-0 border-separate text-body-dense rounded-2xl border border-neutral-border overflow-hidden [&_th]:border-b [&_th]:border-solid [&_th]:border-neutral-border [&_tbody_tr:last-child_td]:border-b-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-neutral-border">
                          <thead className="bg-gray-100 [&_th]:border-b [&_th]:border-solid [&_th]:border-neutral-border">
                            <tr className="group/row hover:bg-neutral-background-weak">
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">Rank</div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border max-w-[200px]">
                                <div className="flex items-center gap-2">Team</div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">GP</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">PTS</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">W</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">L</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">T</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">PF</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">PA</span>
                                </div>
                              </th>
                              <th className="p-2 text-left align-middle font-semibold min-h-[44px] text-body-dense text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                                <div className="flex items-center gap-2">
                                  <span className="border-b border-dashed border-neutral-text-weak">PD</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {division.teams.map((team) => (
                              <tr key={team.id} className="group/row hover:bg-neutral-background-weak border-b border-solid border-neutral-border last:border-0">
                                <td className="p-2 align-middle text-neutral-text">{team.rank}</td>
                                <td className="p-2 align-middle max-w-[200px]">
                                  <span className="block truncate text-neutral-text" title={team.name}>{team.name}</span>
                                </td>
                                <td className="p-2 align-middle text-neutral-text">{team.gp}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.pts}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.w}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.l}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.t}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.pf}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.pa}</td>
                                <td className="p-2 align-middle text-neutral-text">{team.pd}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Standings Dialog */}
      {selectedDivisionForDetails && (
        <DetailedStandingsDialog
          isOpen={!!selectedDivisionForDetails}
          onClose={() => setSelectedDivisionForDetails(null)}
          divisionName={mockDivisions.find(d => d.id === selectedDivisionForDetails)?.name || ''}
          teams={mockDivisions.find(d => d.id === selectedDivisionForDetails)?.teams || []}
        />
      )}
    </div>
  );
}
