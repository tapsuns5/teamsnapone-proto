/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RegistrationDashboard from './components/RegistrationDashboard';
import ProgramsDashboard from './components/ProgramsDashboard';
import FinancialsDashboard from './components/FinancialsDashboard';
import TeamChatsDashboard from './components/TeamChatsDashboard';
import MessagesDashboard from './components/MessagesDashboard';
import RosteringDashboard from './components/RosteringDashboard';
import SettingsDashboard from './components/SettingsDashboard';
import SchedulesDashboard from './components/SchedulesDashboard';
import ProgramDetailView from './components/ProgramDetailView';

// mock program for detail view since we don't have a backend
const mockProgram = {
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
};

function ProgramDetailWrapper() {
  const navigate = useNavigate();
  return <ProgramDetailView program={mockProgram} onBack={() => navigate('/programs')} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const path = location.pathname;
  
  let activeNav = 'Registrations';
  if (path.startsWith('/programs')) activeNav = 'Programs';
  else if (path.startsWith('/financials')) activeNav = 'Financials';
  else if (path.startsWith('/teamchats')) activeNav = 'Team Chats';
  else if (path.startsWith('/messages')) activeNav = 'Messages';
  else if (path.startsWith('/rostering')) activeNav = 'Rostering';
  else if (path.startsWith('/schedule')) activeNav = 'Schedule';
  else if (path.startsWith('/settings')) activeNav = 'Settings';

  const isProgramDetail = path.match(/^\/programs\/[^/]+/);

  return (
    <div className="flex items-start min-h-screen">
      <Sidebar activeItem={activeNav} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {!isProgramDetail && <Header title={activeNav} />}
        <main className={`flex-1 overflow-y-auto bg-neutral-background-medium ${isProgramDetail ? 'pt-0' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/registrations" replace />} />
            <Route path="/registrations" element={<RegistrationDashboard />} />
            <Route path="/programs" element={<Navigate to="/programs/active" replace />} />
            <Route path="/programs/active" element={<ProgramsDashboard />} />
            <Route path="/programs/archived" element={<ProgramsDashboard />} />
            <Route path="/programs/:programId/*" element={<ProgramDetailWrapper />} />
            <Route path="/financials" element={<FinancialsDashboard />} />
            <Route path="/teamchats" element={<TeamChatsDashboard />} />
            <Route path="/messages" element={<MessagesDashboard />} />
            <Route path="/rostering" element={<RosteringDashboard />} />
            <Route path="/schedule" element={<SchedulesDashboard />} />
            <Route path="/settings/*" element={<SettingsDashboard />} />
            <Route path="*" element={
              <div className="p-8 text-center text-neutral-text-medium">
                Dashboard for {activeNav} is coming soon.
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

