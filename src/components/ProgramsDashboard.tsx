import React from 'react';
import { Plus, Edit2, Archive, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const programs = [
  {
    id: '85703',
    name: "FTL Optimist Baseball Spring 2026",
    status: 'Active',
    dateRange: 'Jan 1, 2026 - Dec 31, 2026',
    stats: {
      totalParticipants: 9,
      players: 6,
      staff: 3,
      teams: 1
    }
  }
];

export default function ProgramsDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const tabParam = pathParts[pathParts.length - 1];

  const tabParamMap: Record<string, string> = {
    active: 'Active',
    archived: 'Archived'
  };
  
  const activeTab = tabParamMap[(tabParam || '').toLowerCase()] || 'Active';

  const setActiveTab = (tab: string) => {
    navigate(`/programs/${tab.toLowerCase()}`);
  };

  return (
    <div className="max-w-full overflow-x-hidden relative pt-4">
      <div className="px-4 mb-4">
        {/* Action Header */}
        <header className="flex justify-end min-h-[48px] mb-4">
          <button
            type="button"
            className="flex items-center gap-2 bg-accent-background text-white px-6 py-2 rounded-full font-bold hover:bg-admin-action-text-hover transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Create Program</span>
          </button>
        </header>

        {/* Tabs */}
        <div className="relative mb-6">
          <div className="flex border-b border-neutral-border">
            {['Active', 'Archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-label font-semibold transition-all relative ${activeTab === tab
                    ? 'text-admin-action-text'
                    : 'text-neutral-text-medium hover:text-admin-action-text'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Program Cards */}
      <section className="pb-[100px]">
        <div className="px-4 mx-auto pb-12 max-w-[1200px]">
          <div className="grid gap-3 mb-4">
            {programs.map((program) => (
              <div key={program.id} className="rounded-xl shadow-sm border border-neutral-border bg-white px-4 py-4">
                <header className="flex justify-between items-start mb-2">
                  <h2 
                    className="text-lg font-bold text-admin-action-text hover:underline cursor-pointer"
                    onClick={() => navigate(`/programs/${program.id}`)}
                  >
                    {program.name}
                  </h2>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-full text-neutral-icon-medium hover:border-admin-action-border hover:bg-admin-action-background-weak-hover hover:text-admin-action-text transition-all" title="Edit">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full text-neutral-icon-disabled cursor-not-allowed" title="Archive unavailable while registration is open" disabled>
                      <Archive className="w-5 h-5" />
                    </button>
                  </div>
                </header>

                <div className="flex gap-4 mb-4 cursor-pointer" onClick={() => navigate(`/programs/${program.id}`)}>
                  <p className="text-sm text-neutral-text-medium flex gap-1.5 items-center font-medium">
                    <span className="h-2 w-2 bg-positive-background block rounded-full"></span>
                    {program.status}
                  </p>
                  <p className="flex items-center text-sm gap-1.5 text-neutral-text-medium font-medium">
                    <Calendar className="w-4 h-4" />
                    {program.dateRange}
                  </p>
                </div>

                <hr className="border-neutral-border mb-4" />

                <footer className="flex justify-between px-2 cursor-pointer" onClick={() => navigate(`/programs/${program.id}`)}>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-text-medium font-bold mb-1">Total Participants</p>
                    <p className="text-xl font-bold">{program.stats.totalParticipants}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-text-medium font-bold mb-1">Players</p>
                    <p className="text-xl font-bold">{program.stats.players}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-text-medium font-bold mb-1">Staff</p>
                    <p className="text-xl font-bold">{program.stats.staff}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-text-medium font-bold mb-1">Teams</p>
                    <p className="text-xl font-bold">{program.stats.teams}</p>
                  </div>
                </footer>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="mb-3">
            <div className="rounded-xl shadow-sm border border-neutral-border bg-white px-4 py-4">
              <header className="flex items-center mb-2 gap-2">
                <img
                  alt="TS+ logo"
                  className="h-[18px] w-[18px]"
                  src="https://org.teamsnap.com/images/ts-one-logo.svg"
                  referrerPolicy="no-referrer"
                />
                <a
                  className="text-admin-action-text font-bold flex items-center gap-1.5 text-sm hover:underline"
                  href="#"
                >
                  <span>Past seasons in TeamSnap</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </header>
              <p className="text-sm text-neutral-text-medium leading-relaxed">
                Your existing and historical information in TeamSnap remains safe and accessible anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


