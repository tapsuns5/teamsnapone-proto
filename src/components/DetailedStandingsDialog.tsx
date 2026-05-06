import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  rank: number;
  w: number;
  l: number;
  t: number;
  gp: number;
  pts: number;
  pf: number;
  pa: number;
  pd: number;
}

interface GameResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  homeTeamRank: number;
  awayTeamRank: number;
}

interface DetailedStandingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  divisionName: string;
  teams: Team[];
}

export default function DetailedStandingsDialog({ isOpen, onClose, divisionName, teams }: DetailedStandingsDialogProps) {
  if (!isOpen) return null;

  const calculateWinPercentage = (w: number, l: number, t: number) => {
    const total = w + l + t;
    if (total === 0) return 0;
    return ((w + t / 2) / total) * 100;
  };

  const teamsWithWinPercentage = teams.map(team => ({
    ...team,
    winPercentage: calculateWinPercentage(team.w, team.l, team.t)
  }));

  // Mock H2H game data
  const mockGames: GameResult[] = [
    {
      id: '1',
      homeTeam: 'Marlins',
      awayTeam: 'Nationals',
      homeScore: 5,
      awayScore: 3,
      date: 'Jan 15, 2026',
      homeTeamRank: 1,
      awayTeamRank: 2
    },
    {
      id: '2',
      homeTeam: 'Braves',
      awayTeam: 'Mets',
      homeScore: 4,
      awayScore: 2,
      date: 'Jan 18, 2026',
      homeTeamRank: 3,
      awayTeamRank: 4
    },
    {
      id: '3',
      homeTeam: 'Marlins',
      awayTeam: 'Braves',
      homeScore: 6,
      awayScore: 1,
      date: 'Jan 22, 2026',
      homeTeamRank: 1,
      awayTeamRank: 3
    },
    {
      id: '4',
      homeTeam: 'Nationals',
      awayTeam: 'Phillies',
      homeScore: 7,
      awayScore: 0,
      date: 'Jan 25, 2026',
      homeTeamRank: 2,
      awayTeamRank: 5
    },
    {
      id: '5',
      homeTeam: 'Mets',
      awayTeam: 'Marlins',
      homeScore: 3,
      awayScore: 4,
      date: 'Feb 1, 2026',
      homeTeamRank: 4,
      awayTeamRank: 1
    }
  ];

  // Calculate H2H game results
  const getH2HResults = (teamName: string, opponentName: string): string[] => {
    const games = mockGames.filter(game => {
      const isTeamHome = game.homeTeam === teamName;
      const isTeamAway = game.awayTeam === teamName;
      const isOpponentHome = game.homeTeam === opponentName;
      const isOpponentAway = game.awayTeam === opponentName;
      
      if (!isTeamHome && !isTeamAway) return false;
      if (!isOpponentHome && !isOpponentAway) return false;
      
      return true;
    });

    return games.map(game => {
      const isTeamHome = game.homeTeam === teamName;
      const teamScore = isTeamHome ? game.homeScore : game.awayScore;
      const opponentScore = isTeamHome ? game.awayScore : game.homeScore;
      const result = teamScore > opponentScore ? 'W' : 'L';
      
      return `${result} ${teamScore}-${opponentScore} ${game.date}`;
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col">
      <div className="w-full h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-border sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-neutral-text">Detailed Standings - {divisionName}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-background-weak transition-colors"
          >
            <X className="w-5 h-5 text-neutral-text-medium" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Combined Standings Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Detailed Standings</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-spacing-0 border-separate text-body-dense rounded-2xl border border-neutral-border overflow-hidden [&_th]:border-r [&_th]:border-solid [&_th]:border-neutral-border [&_td]:border-r [&_td]:border-solid [&_td]:border-neutral-border">
                <thead className="bg-gray-100 [&_th]:border-b [&_th]:border-solid [&_th]:border-neutral-border">
                  {/* Group Header Row */}
                  <tr>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border min-w-[150px]">
                      Team
                    </th>
                    <th colSpan={5} className="p-3 text-center align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Standings
                    </th>
                    <th colSpan={6} className="p-3 text-center align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Overall
                    </th>
                    <th colSpan={1} className="p-3 text-center align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Tie Breakers
                    </th>
                  </tr>
                  {/* Column Header Row */}
                  <tr>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border min-w-[150px]">
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Rank
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Wins
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Losses
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Ties
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      Win %
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      GP
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      PTS
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      PF
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      PA
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      PD
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      PPG
                    </th>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                      H2H
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamsWithWinPercentage.map((team, index) => (
                    <tr key={team.id} className="hover:bg-neutral-background-weak border-b border-solid border-neutral-border last:border-0">
                      <td className="p-3 align-middle text-neutral-text font-semibold">{team.name}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.rank}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.w}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.l}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.t}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.winPercentage.toFixed(1)}%</td>
                      <td className="p-3 align-middle text-neutral-text">{team.gp}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.pts}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.pf}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.pa}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.pd}</td>
                      <td className="p-3 align-middle text-neutral-text">{team.gp > 0 ? (team.pts / team.gp).toFixed(2) : '0.00'}</td>
                      <td className="p-3 align-middle text-neutral-text">{index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* H2H Subtable */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Head-to-Head Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-spacing-0 border-separate text-body-dense rounded-2xl border border-neutral-border overflow-hidden [&_th]:border-r [&_th]:border-solid [&_th]:border-neutral-border [&_td]:border-r [&_td]:border-solid [&_td]:border-neutral-border">
                <thead className="bg-gray-100 [&_th]:border-b [&_th]:border-solid [&_th]:border-neutral-border">
                  <tr>
                    <th className="p-3 text-left align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border min-w-[200px]">
                      Team
                    </th>
                    {teams.map((team) => (
                      <th key={team.id} className="p-3 text-center align-middle font-semibold text-neutral-text bg-gray-100 border-b border-solid border-neutral-border">
                        #{team.rank} {team.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team1) => (
                    <tr key={team1.id} className="hover:bg-neutral-background-weak border-b border-solid border-neutral-border last:border-0">
                      <td className="p-3 align-middle text-neutral-text font-semibold">
                        #{team1.rank} {team1.name}
                      </td>
                      {teams.map((team2) => (
                        <td key={`${team1.id}-${team2.id}`} className="p-3 align-middle text-center text-neutral-text">
                          {team1.id === team2.id ? (
                            <span className="text-neutral-text-weak">-</span>
                          ) : (
                            <div className="text-xs">
                              {getH2HResults(team1.name, team2.name).map((result, idx) => (
                                <div key={idx} className="font-semibold">{result}</div>
                              ))}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
