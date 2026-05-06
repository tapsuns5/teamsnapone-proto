import React, { useState, useRef } from 'react';
import { ChevronRight, HelpCircle, Calendar, Archive, ChevronDown, Edit2, Plus, Search, Download, Upload, User, Users, Briefcase, Settings, ChevronLeft, X, CheckCircle2, Check } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import ScheduleTab from './ScheduleTab';
import EditProgramDialog from './EditProgramDialog';
import StandingsTab from './StandingsTab';

interface ProgramDetailViewProps {
  program: {
    id: string;
    name: string;
    status: string;
    dateRange: string;
  };
  onBack: () => void;
}

const participants = [
  { id: '1', name: 'Emily Palmer', dob: '3/19/1994', age: 32, initials: 'EP', noContact: false, gender: '', team: 'Marlins', role: '8U · Player', tags: ['+ 1 more'] },
  { id: '2', name: 'Jack Jones', dob: '--', age: null, initials: 'JJ', noContact: true, gender: 'male', team: 'Unassigned', role: 'Player', tags: ['+ 2 more'] },
  { id: '3', name: 'Jack Jones', dob: '--', age: null, initials: 'JJ', noContact: true, gender: 'male', team: 'Marlins', role: 'Player', tags: ['+ 2 more'] },
  { id: '4', name: 'Tyler Palmer', dob: '9/20/1991', age: 34, initials: 'TP', noContact: false, gender: '', team: 'Marlins', role: '8U · Player', tags: ['+ 2 more'] },
  { id: '5', name: 'Tyler Staff', dob: '9/20/1991', age: 34, initials: 'TS', noContact: false, gender: '', team: "Tyler's Baseball Team", role: 'Coach', tags: [] },
  { id: '6', name: 'Tyler StaffPalmer', dob: '--', age: null, initials: 'TS', noContact: true, gender: '', team: "Tyler's Baseball Team", role: 'Head Coach', tags: [] },
  { id: '7', name: 'Tyler 2nd User', dob: '--', age: null, initials: 'TU', noContact: false, gender: '', team: 'Marlins', role: 'Player', tags: [] },
  { id: '8', name: 'Tyler Staf Palmer', dob: '9/20/1991', age: 34, initials: 'TP', noContact: false, gender: '', team: "Tyler's Baseball Team", role: 'Head Coach', tags: [] },
  { id: '9', name: 'Tyler Staff2 Palmer', dob: '--', age: null, initials: 'TP', noContact: true, gender: '', team: "Tyler's Baseball Team", role: 'Head Coach', tags: [] },
  { id: '10', name: 'Tyler Staff5 Palmer', dob: '--', age: null, initials: 'TP', noContact: true, gender: '', team: 'Unassigned', role: 'Coach', tags: [] },
  { id: '11', name: 'Tyler Staff52 Palmer', dob: '--', age: null, initials: 'TP', noContact: true, gender: '', team: 'Unassigned', role: 'Coach', tags: [] },
  { id: '12', name: 'Tyler User Palmer', dob: '9/20/2009', age: 16, initials: 'TP', noContact: false, gender: 'male', team: 'Marlins', role: 'Player', tags: [] },
];

const divisions = [
  {
    id: 'no-division',
    name: 'No Division',
    teamsCount: 1,
    playersCount: 4,
    staffCount: 4,
    teams: [
      { id: '34451', name: "Tyler's Baseball Team", players: 4, staff: 4 }
    ]
  },
  {
    id: '8u',
    name: '8U',
    teamsCount: 10,
    playersCount: 120,
    staffCount: 30,
    teams: [
      { id: '42610', name: 'Dodgers', players: 12, staff: 3 },
      { id: '42611', name: 'Marlins', players: 12, staff: 3 },
      { id: '42612', name: 'Yankees', players: 12, staff: 3 },
      { id: '42613', name: 'Red Sox', players: 12, staff: 3 },
      { id: '42614', name: 'Cubs', players: 12, staff: 3 },
      { id: '42615', name: 'Giants', players: 12, staff: 3 },
      { id: '42616', name: 'Astros', players: 12, staff: 3 },
      { id: '42617', name: 'Braves', players: 12, staff: 3 },
      { id: '42618', name: 'Mets', players: 12, staff: 3 },
      { id: '42619', name: 'Cardinals', players: 12, staff: 3 }
    ]
  },
  {
    id: '9u',
    name: '9U',
    teamsCount: 10,
    playersCount: 120,
    staffCount: 30,
    teams: [
      { id: '42620', name: 'Tigers', players: 12, staff: 3 },
      { id: '42621', name: 'Athletics', players: 12, staff: 3 },
      { id: '42622', name: 'Phillies', players: 12, staff: 3 },
      { id: '42623', name: 'Rays', players: 12, staff: 3 },
      { id: '42624', name: 'Blue Jays', players: 12, staff: 3 },
      { id: '42625', name: 'Rangers', players: 12, staff: 3 },
      { id: '42626', name: 'Brewers', players: 12, staff: 3 },
      { id: '42627', name: 'Diamondbacks', players: 12, staff: 3 },
      { id: '42628', name: 'Angels', players: 12, staff: 3 },
      { id: '42629', name: 'Guardians', players: 12, staff: 3 }
    ]
  },
  {
    id: '10u',
    name: '10U',
    teamsCount: 10,
    playersCount: 120,
    staffCount: 30,
    teams: [
      { id: '42630', name: 'White Sox', players: 12, staff: 3 },
      { id: '42631', name: 'Padres', players: 12, staff: 3 },
      { id: '42632', name: 'Mariners', players: 12, staff: 3 },
      { id: '42633', name: 'Rockies', players: 12, staff: 3 },
      { id: '42634', name: 'Orioles', players: 12, staff: 3 },
      { id: '42635', name: 'Royals', players: 12, staff: 3 },
      { id: '42636', name: 'Pirates', players: 12, staff: 3 },
      { id: '42637', name: 'Nationals', players: 12, staff: 3 },
      { id: '42638', name: 'Reds', players: 12, staff: 3 },
      { id: '42639', name: 'Twins', players: 12, staff: 3 }
    ]
  }
];

export default function ProgramDetailView({ program, onBack }: ProgramDetailViewProps) {
  const { '*': tabParam } = useParams();
  const navigate = useNavigate();
  
  const tabParamMap: Record<string, string> = {
    teams: 'Teams',
    participants: 'Participants',
    schedule: 'Schedule',
    standings: 'Standings',
  };
  const activeTab = tabParamMap[(tabParam || '').toLowerCase()] || 'Teams';

  const setActiveTab = (tab: string) => {
    navigate(`/programs/${program.id}/${tab.toLowerCase()}`);
  };
  const [expandedDivisions, setExpandedDivisions] = useState<string[]>(['no-division', '8u', '9u', '10u']);
  const [groupByDivision, setGroupByDivision] = useState(true);
  
  const [isImportDropdownOpen, setIsImportDropdownOpen] = useState(false);
  const [isImportWizardOpen, setIsImportWizardOpen] = useState(false);
  const [importRequiredFieldsOpen, setImportRequiredFieldsOpen] = useState(true);
  const [importOptionalFieldsOpen, setImportOptionalFieldsOpen] = useState(false);
  
  const [importStep, setImportStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showMatchedGenders, setShowMatchedGenders] = useState(false);
  const [showAllPreviewRows, setShowAllPreviewRows] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
  const [primaryContact1Email, setPrimaryContact1Email] = useState('');
  const [primaryContact2Email, setPrimaryContact2Email] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [enableStandings, setEnableStandings] = useState(() => {
    // Load from localStorage on component mount
    const saved = localStorage.getItem(`program-${program.id}-standings`);
    return saved ? JSON.parse(saved) : false;
  });

  const getEmailError = (email: string) => {
    if (!email) return null;
    if (email.includes('iclould.com')) return 'Unsupported domain';
    
    const hasAtSymbol = email.includes('@');
    const hasDot = email.includes('.');
    
    if (!hasAtSymbol || !hasDot) {
      return 'Invalid email address';
    }
    
    const parts = email.split('.');
    const tld = parts[parts.length - 1].toLowerCase();
    const mistypedTlds = ['con', 'cmo', 'xom', 'ocm'];
    
    if (mistypedTlds.includes(tld)) {
      return 'Invalid email address';
    }
    
    return null;
  };

  const email1Error = getEmailError(primaryContact1Email);
  const email2Error = getEmailError(primaryContact2Email);

  const previewData = [
    { playerFirst: 'John', playerLast: 'Doe', contactFirst: 'Jane', contactLast: 'Doe', relation: 'Parent' },
    { playerFirst: 'Mike', playerLast: 'Smith', contactFirst: 'Robert', contactLast: 'Smith', relation: 'Parent' },
    { playerFirst: 'Sarah', playerLast: 'Johnson', contactFirst: 'Emily', contactLast: 'Johnson', relation: 'Guardian' },
    { playerFirst: 'Tom', playerLast: 'Williams', contactFirst: 'Richard', contactLast: 'Williams', relation: 'Parent' },
    { playerFirst: 'Emma', playerLast: 'Brown', contactFirst: 'Susan', contactLast: 'Brown', relation: 'Parent' },
    { playerFirst: 'James', playerLast: 'Davis', contactFirst: 'Michael', contactLast: 'Davis', relation: 'Parent' },
    { playerFirst: 'Lucas', playerLast: 'Miller', contactFirst: 'Karen', contactLast: 'Miller', relation: 'Guardian' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleEditProgram = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProgram = (programData: any) => {
    // Save standings setting to localStorage
    localStorage.setItem(`program-${program.id}-standings`, JSON.stringify(programData.enableStandings));
    setEnableStandings(programData.enableStandings);
    // Here you would typically save the other program data as well
    console.log('Program data saved:', programData);
  };

  const toggleDivision = (id: string) => {
    setExpandedDivisions(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-full bg-neutral-background-medium">
      {/* Breadcrumb Bar */}
      <div className="bg-neutral-background-weak border-b border-neutral-border px-4 py-3 flex items-center gap-2 sticky top-0 z-40 shadow-sm">
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <button 
                onClick={onBack}
                className="text-neutral-text hover:underline font-medium"
              >
                Programs
              </button>
            </li>
            <li className="text-neutral-text-weak flex items-center">
              <ChevronRight className="w-5 h-5" />
            </li>
          </ol>
        </nav>
        <div className="ml-auto flex items-center gap-2">
           <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full border border-neutral-border text-admin-action-text hover:bg-admin-action-background-weak-hover transition-all">
             <HelpCircle className="w-5 h-5" />
           </button>
           <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-neutral-background-medium border border-neutral-border font-bold text-sm">
             TP
           </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="px-4 py-6 mx-auto max-w-[1200px]">
          {/* Header */}
          <header className="mb-4 flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-display-xl font-bold mb-2">{program.name}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 bg-positive-background text-neutral-text font-bold text-xs rounded-md">
                  {program.status}
                </span>
                <p className="flex items-center gap-1 text-label text-neutral-text-medium">
                  <Calendar className="w-4 h-4" />
                  {program.dateRange}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full border border-neutral-border bg-white text-neutral-icon-disabled cursor-not-allowed">
                <Archive className="w-5 h-5" />
              </button>
              <button className="px-6 py-2 h-[48px] rounded-full border-2 border-admin-action-border text-admin-action-text bg-white font-bold hover:bg-admin-action-background-weak-hover transition-colors">
                Rostering
              </button>
              <button 
                onClick={handleEditProgram}
                className="px-6 py-2 h-[48px] rounded-full bg-admin-action-background text-white font-bold hover:bg-admin-action-text-hover transition-colors shadow-sm"
              >
                Edit program
              </button>
            </div>
          </header>

          {/* Tabs */}
          <div className="mb-6 relative">
            <div className="flex border-b border-neutral-border overflow-x-auto hide-scrollbar">
              {['Teams', 'Participants', 'Schedule', ...(enableStandings ? ['Standings'] : [])].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-label font-bold transition-all relative flex-shrink-0 ${
                    activeTab === tab 
                      ? 'text-admin-action-text border-b-4 border-admin-action-border' 
                      : 'text-neutral-text-medium hover:text-admin-action-text'
                  }`}
                >
                  <span className="px-3 py-1.5 hover:bg-admin-action-background-weak-hover hover:rounded-2xl transition-all">
                    {tab}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'Teams' && (
            <div className="animate-in fade-in duration-300">
              {/* Teams Filters & Actions */}
              <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-border bg-white text-label font-bold hover:border-admin-action-border transition-colors">
                    <span>Status</span>
                    <div className="h-4 w-px bg-neutral-border mx-1" />
                    <span className="text-admin-action-text">Active</span>
                    <ChevronDown className="w-4 h-4 text-admin-action-text" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setGroupByDivision(!groupByDivision)}
                      className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors focus:outline-none ${groupByDivision ? 'bg-positive-background' : 'bg-neutral-border'}`}
                    >
                      <span className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform ${groupByDivision ? 'translate-x-[22px]' : 'translate-x-[4px]'}`} />
                    </button>
                    <span className="text-label font-medium text-neutral-text">Group by Division</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-full bg-admin-action-background text-white text-sm font-bold hover:bg-admin-action-text-hover transition-colors">
                    Add/Manage Divisions
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full
                   bg-admin-action-background text-white text-sm font-bold hover:bg-admin-action-text-hover transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Teams</span>
                  </button>
                </div>
              </div>

              {/* Teams Content */}
              <div className="grid gap-3 pb-20">
                {divisions.map((division) => (
                  <div 
                    key={division.id} 
                    className="rounded-xl overflow-x-auto pt-0 shadow-sm border border-solid border-neutral-border bg-white"
                    data-state={expandedDivisions.includes(division.id) ? 'open' : 'closed'}
                  >
                    <table className="w-full border-spacing-0 border-separate text-sm">
                      <thead 
                        className="cursor-pointer"
                        onClick={() => toggleDivision(division.id)}
                      >
                        <tr className="group/row hover:bg-neutral-background-weak">
                          <th className="p-2 text-left align-middle text-label font-semibold min-h-[44px] w-[40%] border-b border-solid border-neutral-border bg-neutral-background-weak">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1 items-center mb-0.5">
                                <h5 className="text-heading-sm font-bold m-0">{division.name}</h5>
                                <div className="flex gap-0.5 items-center">
                                  {division.id === 'no-division' ? (
                                    <HelpCircle className="w-4 h-4 text-neutral-icon-medium" />
                                  ) : (
                                    <button className="grid place-content-center rounded-full border border-transparent hover:border-admin-action-border hover:bg-admin-action-background-weak-hover hover:text-admin-action-text active:bg-admin-action-background-weak-pressed h-[32px] w-[32px] min-w-[32px] text-neutral-icon-medium transition-all">
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-label text-neutral-text-medium m-0">{division.teamsCount} {division.teamsCount === 1 ? 'TEAM' : 'TEAMS'}</p>
                            </div>
                          </th>
                          <th className="p-2 align-middle text-label font-semibold min-h-[44px] w-[100px] text-right border-b border-solid border-neutral-border bg-neutral-background-weak">
                            <div className="flex items-center justify-end gap-2">
                              <p className="text-[10px] uppercase font-bold text-neutral-text-medium m-0">Players</p>
                              <h4 className="text-heading-md font-bold m-0">{division.playersCount}</h4>
                            </div>
                          </th>
                          <th className="p-2 align-middle text-label font-semibold min-h-[44px] w-[100px] text-right border-b border-solid border-neutral-border bg-neutral-background-weak">
                            <div className="flex items-center justify-end gap-2">
                              <p className="text-[10px] uppercase font-bold text-neutral-text-medium m-0">Staff</p>
                              <h4 className="text-heading-md font-bold m-0">{division.staffCount}</h4>
                            </div>
                          </th>
                          <th className="p-2 text-left align-middle text-label font-semibold min-h-[44px] border-b border-solid border-neutral-border bg-neutral-background-weak">
                            <div className="flex items-center gap-2">
                              <div className="w-full flex justify-end items-center">
                                <ChevronDown className={`w-6 h-6 text-neutral-icon-medium transition-transform duration-200 ${expandedDivisions.includes(division.id) ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {expandedDivisions.includes(division.id) && (
                        <tbody className="animate-in slide-in-from-top-2">
                          {division.teams.map((team) => (
                            <tr 
                              key={team.id} 
                              className="group/row hover:bg-neutral-background-weak border-b border-solid border-neutral-border last:border-0"
                            >
                              <td className="p-2 align-middle w-[40%] max-w-0 border-b border-solid border-neutral-border">
                                <div className="flex gap-1 items-center min-w-0 pl-2">
                                  <span className="truncate font-medium text-label" title={team.name}>{team.name}</span>
                                </div>
                              </td>
                              <td className="p-2 align-middle w-[100px] text-right font-medium border-b border-solid border-neutral-border">{team.players}</td>
                              <td className="p-2 align-middle w-[100px] text-right font-medium border-b border-solid border-neutral-border">{team.staff}</td>
                              <td className="p-2 align-middle border-b border-solid border-neutral-border">
                                <div className="flex gap-1 items-center justify-end pr-2">
                                  <button className="grid place-content-center rounded-full border border-transparent text-neutral-icon-medium hover:border-admin-action-border hover:bg-admin-action-background-weak-hover hover:text-admin-action-text active:bg-admin-action-background-weak-pressed h-[32px] w-[32px] min-w-[32px] transition-all">
                                    <Edit2 className="w-5 h-5" />
                                  </button>
                                  <button className="grid place-content-center rounded-full border border-transparent text-neutral-icon-medium hover:border-admin-action-border hover:bg-admin-action-background-weak-hover hover:text-admin-action-text active:bg-admin-action-background-weak-pressed h-[32px] w-[32px] min-w-[32px] transition-all">
                                    <Archive className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                      {expandedDivisions.includes(division.id) && (
                        <tfoot className="border-t border-solid border-neutral-border">
                          <tr className="group/row hover:bg-neutral-background-weak">
                            <td className="p-2 align-middle pt-4 pb-4 pl-4" colSpan={4}>
                              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-border text-admin-action-text bg-white font-bold hover:bg-admin-action-background-weak-hover transition-colors text-sm">
                                <Plus className="w-4 h-4" />
                                <span>Teams</span>
                              </button>
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Participants' && (
            <div className="animate-in fade-in duration-300 pb-20">
              {/* Participants Toolbar */}
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex gap-2 items-center flex-wrap">
                  <div className="flex-1 max-w-[300px] relative">
                    <Search className="w-4 h-4 text-neutral-icon-medium absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search by Name, Email, Phone" 
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-border bg-white text-sm focus:outline-none focus:border-admin-action-border focus:ring-1 focus:ring-admin-action-border transition-shadow"
                    />
                  </div>
                  <div className="flex ml-auto gap-2">
                    <div className="relative">
                      <button 
                        onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        className="px-4 py-1.5 rounded-lg bg-admin-action-background text-white text-sm font-bold hover:bg-admin-action-text-hover transition-colors"
                      >
                        Add
                      </button>
                      
                      {isAddDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 w-40 z-50 overflow-hidden rounded-xl bg-white py-1 shadow-sm border border-neutral-border animate-in fade-in slide-in-from-top-2">
                          <button 
                            onClick={() => {
                              setIsAddDropdownOpen(false);
                              setIsAddPlayerModalOpen(true);
                            }}
                            className="w-full text-left relative cursor-default select-none py-2 px-3 tracking-wide outline-none text-label flex items-center gap-1 font-semibold hover:bg-admin-action-background-weak-hover hover:text-admin-action-text transition-colors"
                          >
                            Add Player
                          </button>
                          <button 
                            onClick={() => setIsAddDropdownOpen(false)}
                            className="w-full text-left relative cursor-default select-none py-2 px-3 tracking-wide outline-none text-label flex items-center gap-1 font-semibold hover:bg-admin-action-background-weak-hover hover:text-admin-action-text transition-colors"
                          >
                            Add Staff
                          </button>
                        </div>
                      )}
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-border bg-white text-label font-bold text-admin-action-text hover:bg-admin-action-background-weak-hover transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export All</span>
                    </button>
                    
                    <div className="relative hidden md:block">
                      <button 
                        onClick={() => setIsImportDropdownOpen(!isImportDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-border bg-white text-label font-bold text-admin-action-text hover:bg-admin-action-background-weak-hover transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Import</span>
                      </button>
                      
                      {isImportDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 w-40 z-50 overflow-hidden rounded-xl bg-white py-1 shadow-sm border border-neutral-border animate-in fade-in slide-in-from-top-2">
                          <button 
                            onClick={() => {
                              setIsImportDropdownOpen(false);
                              setIsImportWizardOpen(true);
                            }}
                            className="w-full text-left relative cursor-default select-none py-2 px-3 tracking-wide outline-none text-label flex items-center gap-1 font-semibold hover:bg-admin-action-background-weak-hover hover:text-admin-action-text transition-colors"
                          >
                            Import Players
                          </button>
                          <button 
                            onClick={() => setIsImportDropdownOpen(false)}
                            className="w-full text-left relative cursor-default select-none py-2 px-3 tracking-wide outline-none text-label flex items-center gap-1 font-semibold hover:bg-admin-action-background-weak-hover hover:text-admin-action-text transition-colors"
                          >
                            Import Staff
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button className="rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border px-3 py-1 flex items-center gap-1 bg-white text-label font-semibold transition-colors">
                      <User className="w-4 h-4" />
                      Gender
                    </button>
                    <button className="rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border px-3 py-1 flex items-center gap-1 bg-white text-label font-semibold transition-colors">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </button>
                    <button className="rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border px-3 py-1 flex items-center gap-1 bg-white text-label font-semibold transition-colors">
                      <Users className="w-4 h-4" />
                      Teams
                    </button>
                    <button className="rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border px-3 py-1 flex items-center gap-1 bg-white text-label font-semibold transition-colors">
                      <Briefcase className="w-4 h-4" />
                      Roles
                    </button>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-neutral-text-medium whitespace-nowrap">Sort By:</label>
                      <div className="relative w-[180px]">
                        <select className="w-full appearance-none bg-white border border-neutral-border rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-neutral-text focus:outline-none focus:border-admin-action-border cursor-pointer">
                          <option>First Name: A to Z</option>
                          <option>Last Name: A to Z</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-icon-medium absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-full text-admin-action-text hover:bg-admin-action-background-weak-hover transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Participants Table */}
              <div className="shadow-sm rounded-xl overflow-hidden bg-white border border-neutral-border">
                {/* Pagination Header */}
                <div className="flex items-center justify-end px-4 py-3 gap-4 border-b border-neutral-border bg-white">
                  <div className="flex items-center gap-2 text-sm">
                    <select className="bg-white border border-neutral-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-admin-action-border cursor-pointer">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-text-medium">
                    <button className="text-neutral-icon-disabled cursor-not-allowed">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-neutral-text">1 - 12 of 12</span>
                    <button className="text-neutral-icon-disabled cursor-not-allowed">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-background-weak border-b border-neutral-border">
                      <tr>
                        <th className="w-[48px] p-3 text-center align-middle">
                          <input type="checkbox" className="rounded border-neutral-border text-admin-action-background focus:ring-admin-action-border cursor-pointer" />
                        </th>
                        <th className="p-3 font-semibold text-neutral-text whitespace-nowrap">Participant (12)</th>
                        <th className="p-3 font-semibold text-neutral-text whitespace-nowrap">Date of Birth (Age)</th>
                        <th className="p-3 font-semibold text-neutral-text whitespace-nowrap">Team</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-border">
                      {participants.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-background-weak transition-colors">
                          <td className="p-3 text-center align-middle">
                            <input type="checkbox" className="rounded border-neutral-border text-admin-action-background focus:ring-admin-action-border cursor-pointer" />
                          </td>
                          <td className="p-3">
                            <div className="flex gap-3 items-center">
                              <div className="w-[40px] h-[40px] rounded-full bg-neutral-background-medium flex items-center justify-center font-bold text-neutral-text shrink-0">
                                {p.initials}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <a href="#" className="font-semibold text-admin-action-text hover:underline">{p.name}</a>
                                  {p.noContact && (
                                    <span className="px-2 py-0.5 bg-warning-background text-neutral-text font-bold text-[10px] uppercase rounded-md whitespace-nowrap">
                                      No contact account
                                    </span>
                                  )}
                                </div>
                                {p.gender && <span className="text-[10px] text-neutral-text-medium uppercase font-semibold">{p.gender}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            {p.dob !== '--' ? (
                              <span>{p.dob} <span className="text-neutral-text-medium">({p.age})</span></span>
                            ) : (
                              <span className="text-neutral-text-medium">--</span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-medium text-neutral-text">{p.team}</span>
                                <span className="text-xs text-neutral-text-medium">{p.role}</span>
                              </div>
                              {p.tags && p.tags.length > 0 && (
                                <button className="text-admin-action-text font-semibold text-xs hover:underline whitespace-nowrap ml-auto">
                                  {p.tags[0]}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-end px-4 py-3 gap-4 border-t border-neutral-border bg-white">
                  <div className="flex items-center gap-2 text-sm">
                    <select className="bg-white border border-neutral-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-admin-action-border cursor-pointer">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-text-medium">
                    <button className="text-neutral-icon-disabled cursor-not-allowed">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-neutral-text">1 - 12 of 12</span>
                    <button className="text-neutral-icon-disabled cursor-not-allowed">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Schedule' && (
            <div className="animate-in fade-in duration-300" style={{ minHeight: 600 }}>
              <ScheduleTab hideHeader={true} />
            </div>
          )}

          {activeTab === 'Standings' && enableStandings && (
            <div className="animate-in fade-in duration-300">
              <StandingsTab />
            </div>
          )}
        </div>
      </div>
      
      {/* Import Wizard Modal */}
      {isImportWizardOpen && (
        <div className="fixed inset-0 pointer-events-auto z-[1010] bg-black/25">
          <div className="fixed left-[50%] top-[50%] z-[1010] w-full translate-x-[-50%] translate-y-[-50%] bg-white shadow-lg overflow-auto max-w-screen h-screen rounded-none pb-4 max-h-screen">
            <section>
              <header className="flex justify-between items-center p-3 bg-neutral-background-weak shadow-sm border-b border-neutral-border">
                <button 
                  onClick={() => setIsImportWizardOpen(false)}
                  className="grid place-content-center rounded-full border border-admin-action-border text-admin-action-text hover:bg-admin-action-background-weak-hover h-[48px] w-[48px] min-w-[48px] bg-white transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
                <h1 className="text-heading-lg font-bold">Import Players</h1>
                <div className="w-[48px]"></div>
              </header>
              <nav className="px-3 py-6">
                <ul className="flex gap-[100px] justify-center">
                  <li className="group relative" data-active={importStep === 1} data-complete={importStep > 1}>
                    <span className={`h-[2px] w-[100px] block absolute right-[16px] top-[7px] group-first:hidden ${importStep > 1 ? 'bg-admin-action-background' : 'bg-neutral-border-medium'}`}></span>
                    <span className={`w-4 h-4 rounded-full mx-auto mb-1 grid place-content-center ${importStep >= 1 ? 'bg-admin-action-background' : 'border-2 border-neutral-border-medium bg-white'}`}>
                      {importStep === 1 ? <span className="w-2 h-2 rounded-full bg-white block mx-auto"></span> : <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </span>
                    <p className={`text-[12px] font-bold absolute whitespace-nowrap left-[50%] -translate-x-1/2 mt-1 ${importStep >= 1 ? 'text-admin-action-text' : 'text-neutral-text-medium'}`}>Upload File</p>
                  </li>
                  <li className="group relative" data-active={importStep === 2} data-complete={importStep > 2}>
                    <span className={`h-[2px] w-[100px] block absolute right-[16px] top-[7px] group-first:hidden ${importStep > 2 ? 'bg-admin-action-background' : importStep === 2 ? 'bg-admin-action-background' : 'bg-neutral-border-medium'}`}></span>
                    <span className={`w-4 h-4 rounded-full mx-auto mb-1 grid place-content-center ${importStep >= 2 ? 'bg-admin-action-background' : 'border-2 border-neutral-border-medium bg-white'}`}>
                      {importStep === 2 ? <span className="w-2 h-2 rounded-full bg-white block mx-auto"></span> : importStep > 2 ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
                    </span>
                    <p className={`text-[12px] font-bold absolute whitespace-nowrap left-[50%] -translate-x-1/2 mt-1 ${importStep >= 2 ? 'text-admin-action-text' : 'text-neutral-text-medium'}`}>Map Fields</p>
                  </li>
                  <li className="group relative" data-active={importStep === 3} data-complete={importStep > 3}>
                    <span className={`h-[2px] w-[100px] block absolute right-[16px] top-[7px] group-first:hidden ${importStep > 3 ? 'bg-admin-action-background' : importStep === 3 ? 'bg-admin-action-background' : 'bg-neutral-border-medium'}`}></span>
                    <span className={`w-4 h-4 rounded-full mx-auto mb-1 grid place-content-center ${importStep >= 3 ? 'bg-admin-action-background' : 'border-2 border-neutral-border-medium bg-white'}`}>
                      {importStep === 3 ? <span className="w-2 h-2 rounded-full bg-white block mx-auto"></span> : importStep > 3 ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
                    </span>
                    <p className={`text-[12px] font-bold absolute whitespace-nowrap left-[50%] -translate-x-1/2 mt-1 ${importStep >= 3 ? 'text-admin-action-text' : 'text-neutral-text-medium'}`}>Map Values</p>
                  </li>
                  <li className="group relative" data-active={importStep === 4} data-complete={importStep > 4}>
                    <span className={`h-[2px] w-[100px] block absolute right-[16px] top-[7px] group-first:hidden ${importStep > 4 ? 'bg-admin-action-background' : importStep === 4 ? 'bg-admin-action-background' : 'bg-neutral-border-medium'}`}></span>
                    <span className={`w-4 h-4 rounded-full mx-auto mb-1 grid place-content-center ${importStep >= 4 ? 'bg-admin-action-background' : 'border-2 border-neutral-border-medium bg-white'}`}>
                      {importStep === 4 ? <span className="w-2 h-2 rounded-full bg-white block mx-auto"></span> : importStep > 4 ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
                    </span>
                    <p className={`text-[12px] font-bold absolute whitespace-nowrap left-[50%] -translate-x-1/2 mt-1 ${importStep >= 4 ? 'text-admin-action-text' : 'text-neutral-text-medium'}`}>Preview</p>
                  </li>
                  <li className="group relative" data-active={importStep === 5} data-complete={importStep > 5}>
                    <span className={`h-[2px] w-[100px] block absolute right-[16px] top-[7px] group-first:hidden ${importStep > 5 ? 'bg-admin-action-background' : importStep === 5 ? 'bg-admin-action-background' : 'bg-neutral-border-medium'}`}></span>
                    <span className={`w-4 h-4 rounded-full mx-auto mb-1 grid place-content-center ${importStep >= 5 ? 'bg-admin-action-background' : 'border-2 border-neutral-border-medium bg-white'}`}>
                      {importStep === 5 ? <span className="w-2 h-2 rounded-full bg-white block mx-auto"></span> : importStep > 5 ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
                    </span>
                    <p className={`text-[12px] font-bold absolute whitespace-nowrap left-[50%] -translate-x-1/2 mt-1 ${importStep >= 5 ? 'text-admin-action-text' : 'text-neutral-text-medium'}`}>Summary</p>
                  </li>
                </ul>
              </nav>

              <div className="max-w-[750px] px-3 pb-3 mx-auto mt-8">
                <div className="flex flex-col">
                  {importStep === 1 && (
                    <section className="flex gap-5 mb-2 flex-col md:flex-row">
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="border border-solid rounded-lg border-neutral-border bg-white shadow-sm overflow-hidden">
                          <header 
                            className="p-3 pl-2 flex gap-1 items-center cursor-pointer hover:bg-neutral-background-weak transition-colors"
                            onClick={() => setImportRequiredFieldsOpen(!importRequiredFieldsOpen)}
                          >
                            <button className={`grid place-content-center rounded-full border border-transparent text-neutral-icon-medium hover:border-admin-action-border hover:bg-admin-action-background-weak-hover h-8 w-8 transition-transform duration-200 ${importRequiredFieldsOpen ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-5 h-5" />
                            </button>
                            <h3 className="text-heading-sm font-bold m-0">Required Fields</h3>
                          </header>
                          {importRequiredFieldsOpen && (
                            <div className="p-4 pt-1 pb-4 pl-12 animate-in slide-in-from-top-2">
                              <ul className="grid gap-2 list-disc text-sm text-neutral-text pl-4">
                                <li>Player First Name</li>
                                <li>Player Last Name</li>
                                <li>Primary Contact 1 First Name</li>
                                <li>Primary Contact 1 Last Name</li>
                                <li>Primary Contact 1 Email</li>
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="border border-solid rounded-lg border-neutral-border bg-white shadow-sm overflow-hidden">
                          <header 
                            className="p-3 pl-2 flex gap-1 items-center cursor-pointer hover:bg-neutral-background-weak transition-colors"
                            onClick={() => setImportOptionalFieldsOpen(!importOptionalFieldsOpen)}
                          >
                            <button className={`grid place-content-center rounded-full border border-transparent text-neutral-icon-medium hover:border-admin-action-border hover:bg-admin-action-background-weak-hover h-8 w-8 transition-transform duration-200 ${importOptionalFieldsOpen ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-5 h-5" />
                            </button>
                            <h3 className="text-heading-sm font-bold m-0">Optional Fields</h3>
                          </header>
                          {importOptionalFieldsOpen && (
                            <div className="p-4 pt-1 pb-4 pl-12 animate-in slide-in-from-top-2">
                              <ul className="grid gap-2 list-disc text-sm text-neutral-text pl-4">
                                <li>Gender</li>
                                <li>Date of Birth</li>
                                <li>Player Email</li>
                                <li>Phone Number</li>
                                <li>Team Name</li>
                              </ul>
                            </div>
                          )}
                        </div>

                        <footer className="mt-2">
                          <p className="text-sm font-bold text-neutral-text">Any additional or invalid fields will be removed during the import process.</p>
                        </footer>
                      </div>

                      <div className="flex-1">
                        <div className="p-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-border-medium bg-neutral-background-weak min-h-[450px] sticky top-3">
                          <div className="text-center flex flex-col items-center max-w-xs mx-auto">
                            <Upload className="w-6 h-6 text-neutral-text mb-3" />
                            <p className="mb-4 text-label font-bold text-neutral-text">Drop your CSV file here or</p>
                            <input 
                              type="file" 
                              accept=".csv" 
                              className="hidden" 
                              ref={fileInputRef} 
                              onChange={handleFileUpload}
                            />
                            <button 
                              onClick={() => fileInputRef.current?.click()}
                              className="px-6 py-2 rounded-full border border-admin-action-border text-admin-action-text bg-white font-bold hover:bg-admin-action-background-weak-hover transition-colors text-sm w-full mb-8"
                            >
                              Browse your files to upload
                            </button>
                            
                            {uploadedFile && (
                              <div className="flex flex-col gap-1 justify-center mt-2 w-full animate-in fade-in zoom-in duration-200">
                                <span className="flex items-center justify-center gap-1 text-sm text-neutral-text-medium font-medium">
                                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(0)} KB)
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                </span>
                              </div>
                            )}
                            
                            <div className="w-full h-px bg-neutral-border my-6"></div>
                            
                            <p className="text-xs text-neutral-text-medium mb-4">Format the CSV file to match the template for optimal results.</p>
                            <button className="text-admin-action-text font-bold text-sm hover:underline">
                              Download the template
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                  
                  {importStep === 2 && (
                    <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                        <h2 className="text-heading-md font-bold mb-1">Map System Fields</h2>
                        <p className="text-sm text-neutral-text-medium">Choose the header from your CSV that matches each Required system field.</p>
                      </div>
                      
                      <div className="border border-neutral-border rounded-lg bg-white overflow-hidden shadow-sm">
                        <div className="flex border-b border-neutral-border bg-neutral-background-weak">
                          <button className="px-6 py-3 text-sm font-bold border-b-2 border-admin-action-border text-admin-action-text bg-white">
                            Required (5)
                          </button>
                          <button className="px-6 py-3 text-sm font-bold border-b-2 border-transparent text-neutral-text hover:text-admin-action-text hover:bg-neutral-background-weak-hover transition-colors">
                            Optional (5)
                          </button>
                        </div>
                        
                        <div className="p-0">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-neutral-background-weak border-b border-neutral-border text-xs uppercase text-neutral-text-medium font-semibold">
                              <tr>
                                <th className="px-4 py-3 w-1/2">Required fields</th>
                                <th className="px-4 py-3 w-1/2">Your headers</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-border">
                              <tr>
                                <td className="px-4 py-3 font-medium text-neutral-text flex items-center gap-2">
                                  Player First Name <span className="text-red-500">*</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                      <option>First Name</option>
                                      <option>Last Name</option>
                                      <option>Email</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-neutral-text flex items-center gap-2">
                                  Player Last Name <span className="text-red-500">*</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                      <option>Last Name</option>
                                      <option>First Name</option>
                                      <option>Email</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-neutral-text flex items-center gap-2">
                                  Primary Contact 1 First Name <span className="text-red-500">*</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                      <option>Parent First Name</option>
                                      <option>First Name</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-neutral-text flex items-center gap-2">
                                  Primary Contact 1 Last Name <span className="text-red-500">*</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                      <option>Parent Last Name</option>
                                      <option>Last Name</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-neutral-text flex items-center gap-2">
                                  Primary Contact 1 Email <span className="text-red-500">*</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                      <option>Parent Email</option>
                                      <option>Email</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </section>
                  )}
                  
                  {importStep === 3 && (
                    <section className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                      <h3 className="text-heading-sm font-bold mb-2">Team Name</h3>
                      <div className="rounded bg-neutral-background-strong border border-solid border-neutral-border p-3 mb-6">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-neutral-background-weak border-b border-neutral-border text-xs font-semibold">
                            <tr>
                              <th className="px-3 py-3 w-1/2">Value in CSV field</th>
                              <th className="px-3 py-3 w-1/2">Value in TeamSnap</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-border bg-white">
                            <tr className="hover:bg-neutral-background-weak-hover">
                              <td className="px-3 py-3 font-medium text-neutral-text">Force (U9 Boys)</td>
                              <td className="px-3 py-3">
                                <div className="relative">
                                  <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                    <option>Skip all rows with this value</option>
                                    <option>Force (10U Boys)</option>
                                  </select>
                                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                </div>
                              </td>
                            </tr>
                            <tr className="hover:bg-neutral-background-weak-hover">
                              <td className="px-3 py-3 font-medium text-neutral-text">Rebels (4th Grade)</td>
                              <td className="px-3 py-3">
                                <div className="relative">
                                  <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                    <option>Skip all rows with this value</option>
                                    <option>Rebels (5th Grade)</option>
                                  </select>
                                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-heading-sm font-bold mb-2">Player Gender</h3>
                      <div className="rounded bg-neutral-background-strong border border-solid border-neutral-border p-3 mb-4">
                        <div className="rounded shadow-sm border border-solid border-transparent bg-green-100 text-green-900 p-2 mb-3">
                          <p className="text-sm font-medium">All your values have been automatically matched with your data.</p>
                        </div>
                        <table className="w-full text-sm text-left">
                          <thead className="bg-neutral-background-weak border-b border-neutral-border text-xs font-semibold">
                            <tr>
                              <th className="px-3 py-3 w-1/2">Value in CSV field</th>
                              <th className="px-3 py-3 w-1/2">Value in TeamSnap</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-border bg-white">
                            <tr>
                              <td className="px-3 py-3 text-center" colSpan={2}>
                                <p className="text-sm font-bold mt-2 mb-1">Imported values that exactly match your existing data have been automatically mapped for you.</p>
                                <button 
                                  onClick={() => setShowMatchedGenders(!showMatchedGenders)}
                                  className="text-admin-action-text font-bold text-sm hover:underline"
                                >
                                  {showMatchedGenders ? 'Hide fields that have been automatically matched' : 'Show fields that have been automatically matched'}
                                </button>
                              </td>
                            </tr>
                            {showMatchedGenders && (
                              <>
                                <tr className="hover:bg-neutral-background-weak-hover bg-neutral-background-weak">
                                  <td className="px-3 py-3 font-medium text-neutral-text">M</td>
                                  <td className="px-3 py-3">
                                    <div className="relative">
                                      <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                        <option>Male</option>
                                      </select>
                                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                    </div>
                                  </td>
                                </tr>
                                <tr className="hover:bg-neutral-background-weak-hover bg-neutral-background-weak">
                                  <td className="px-3 py-3 font-medium text-neutral-text">F</td>
                                  <td className="px-3 py-3">
                                    <div className="relative">
                                      <select className="w-full appearance-none bg-white border border-neutral-border text-neutral-text text-sm rounded-lg focus:ring-admin-action-border focus:border-admin-action-border block px-3 py-2 pr-8">
                                        <option>Female</option>
                                      </select>
                                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}
                  
                  {importStep === 4 && (
                    <section className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                      <article className="rounded bg-neutral-background-weak p-3 mb-6 w-full">
                        <div className="mb-4">
                          <h3 className="text-heading-sm font-bold mb-1">Preview Summary</h3>
                          <div className="flex gap-2 justify-between mb-2">
                            <p className="flex-1 text-sm">Total new records to import</p>
                            <p className="text-sm font-bold">2</p>
                            <div className="w-[100px]"></div>
                          </div>
                          <div className="mb-2">
                            <h4 className="font-semibold mb-1 text-sm">Team Name:</h4>
                            <div className="flex gap-2 justify-between mb-0.5">
                              <p className="flex-1 text-sm">New unassigned records</p>
                              <p className="text-sm font-bold">2</p>
                              <div className="w-[100px]"></div>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-between items-center mb-2">
                            <p className="flex-1 text-sm font-medium">Skipped or invalid rows</p>
                            <p className="text-sm font-bold text-red-600">3</p>
                            <div className="w-[100px]">
                              <button type="button" className="text-sm font-bold text-admin-action-text hover:underline">Export</button>
                            </div>
                          </div>
                        </div>

                        <h4 className="font-bold mb-2 text-sm text-neutral-text">Linked Contacts Preview</h4>
                        <div className="mb-6 bg-white rounded border border-neutral-border overflow-hidden">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-neutral-background-weak border-b border-neutral-border text-xs font-semibold">
                              <tr>
                                <th className="px-3 py-2">Player First</th>
                                <th className="px-3 py-2">Player Last</th>
                                <th className="px-3 py-2">Contact First</th>
                                <th className="px-3 py-2">Contact Last</th>
                                <th className="px-3 py-2">Relation</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-border">
                              {(showAllPreviewRows ? previewData : previewData.slice(0, 5)).map((row, idx) => (
                                <tr key={idx} className="hover:bg-neutral-background-weak-hover">
                                  <td className="px-3 py-2">{row.playerFirst}</td>
                                  <td className="px-3 py-2">{row.playerLast}</td>
                                  <td className="px-3 py-2">{row.contactFirst}</td>
                                  <td className="px-3 py-2">{row.contactLast}</td>
                                  <td className="px-3 py-2">{row.relation}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {previewData.length > 5 && (
                            <div className="p-2 border-t border-neutral-border text-center bg-neutral-background-weak">
                              <button 
                                onClick={() => setShowAllPreviewRows(!showAllPreviewRows)}
                                className="text-sm font-bold text-admin-action-text hover:underline"
                              >
                                {showAllPreviewRows ? 'Show Less' : `Show all ${previewData.length} records`}
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="mb-3 text-red-600 font-bold text-sm">3 row(s) in your file were either skipped manually or had errors that blocked import. Export the file to review the issues, fix them, and try again.</p>
                        
                        <div className="mb-4 bg-white rounded border border-neutral-border overflow-hidden">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-neutral-background-weak border-b border-neutral-border text-xs font-semibold">
                              <tr>
                                <th className="px-3 py-2 w-1/2">Invalid Email</th>
                                <th className="px-3 py-2 w-1/2">Reason</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-border">
                              <tr>
                                <td className="px-3 py-2 text-neutral-text font-medium text-red-600">john.doe@gmail.con</td>
                                <td className="px-3 py-2 text-neutral-text">Invalid TLD (.con instead of .com)</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 text-neutral-text font-medium text-red-600">jane.smith@iclould.com</td>
                                <td className="px-3 py-2 text-neutral-text">Possible typo (iclould.com)</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 text-neutral-text font-medium text-red-600">mike_j@yahoo.cmo</td>
                                <td className="px-3 py-2 text-neutral-text">Invalid TLD (.cmo instead of .com)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <p className="font-bold mb-1 text-sm">Imported team assignments are private until you publish them. Use the Rostering page to publish rosters when you're ready to share them in the mobile app and notify participants.</p>
                        </div>
                      </article>
                    </section>
                  )}
                  
                  {isImporting && (
                    <section className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-admin-action-background mb-6"></div>
                      <h3 className="text-heading-sm font-bold text-neutral-text mb-2">Importing your data...</h3>
                      <p className="text-sm text-neutral-text-medium">Please wait while we process the records.</p>
                    </section>
                  )}

                  {importStep === 5 && !isImporting && (
                    <section className="flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300">
                      <article className="rounded bg-neutral-background-weak p-3 mb-6 w-full max-w-[540px] pr-6">
                        <CheckCircle2 className="w-12 h-12 mx-auto block mb-2 text-green-600" />
                        <h3 className="text-heading-sm font-bold mb-1 text-center">Summary</h3>
                        <div className="mb-4 mt-4">
                          <div className="flex gap-2 justify-between mb-1">
                            <p className="flex-1 text-sm">Imported:</p>
                            <p className="text-sm font-bold">2</p>
                            <div className="w-[100px]"></div>
                          </div>
                          <div className="flex gap-2 justify-between mb-1 items-center">
                            <p className="flex-1 text-sm">Skipped rows:</p>
                            <p className="text-sm font-bold text-red-600">3</p>
                            <button type="button" className="text-sm font-bold text-admin-action-text hover:underline w-[100px] text-left">Export</button>
                          </div>
                        </div>
                        <p className="font-bold text-sm">Imported team assignments are private until you publish them. Use the Rostering page to publish rosters when you're ready to share them in the mobile app and notify participants.</p>
                      </article>
                      
                      <div className="grid gap-3 w-full max-w-[540px]">
                        <button 
                          onClick={() => { setIsImportWizardOpen(false); setImportStep(1); }}
                          className="w-full px-6 py-3 rounded-full font-bold text-sm bg-admin-action-background text-white hover:bg-admin-action-text-hover transition-colors"
                        >
                          View Players
                        </button>
                        <button 
                          onClick={() => setImportStep(1)}
                          className="w-full px-6 py-3 rounded-full font-bold text-sm border-2 border-neutral-border bg-white text-neutral-text hover:bg-neutral-background-weak-hover transition-colors"
                        >
                          Import More Players
                        </button>
                        <button 
                          className="w-full px-6 py-3 rounded-full font-bold text-sm border-2 border-neutral-border bg-white text-neutral-text hover:bg-neutral-background-weak-hover transition-colors"
                        >
                          View rosters
                        </button>
                      </div>
                    </section>
                  )}
                  
                  {importStep < 5 && !isImporting && (
                    <div className="flex justify-end mt-4 pt-4 border-t border-neutral-border gap-3">
                      {importStep > 1 && (
                        <button 
                          onClick={() => setImportStep(importStep - 1)}
                          className="flex items-center gap-2 px-6 py-2 rounded-lg border border-neutral-border bg-white text-admin-action-text font-bold hover:bg-neutral-background-weak-hover text-sm transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          if (importStep === 4) {
                            setIsImporting(true);
                            setTimeout(() => {
                              setIsImporting(false);
                              setImportStep(5);
                            }, 2500);
                          } else {
                            setImportStep(importStep + 1);
                          }
                        }}
                        disabled={importStep === 1 && !uploadedFile}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-colors ${
                          (importStep === 1 && !uploadedFile)
                            ? 'bg-neutral-border-medium text-white cursor-not-allowed opacity-50'
                            : 'bg-admin-action-background text-white hover:bg-admin-action-text-hover'
                        }`}
                      >
                        <span>{importStep === 4 ? 'Complete Import' : 'Next'}</span>
                        {importStep !== 4 && <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Add Player Modal */}
      {isAddPlayerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsAddPlayerModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-neutral-icon hover:bg-admin-action-background-weak-hover hover:text-admin-action-text transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <header className="px-6 py-4 flex-shrink-0 border-b border-neutral-border">
              <h2 className="text-xl font-bold">Add Player</h2>
            </header>
            
            <div className="flex-1 overflow-y-auto sui-hide-scrollbar p-6">
              <p className="text-sm text-neutral-text-medium mb-6">
                Participants and their contacts will get an email notification when added to a new team. New users will be prompted to create an account, and existing users can log into the mobile app to access their new team details.
              </p>
              
              <form className="flex flex-col gap-8">
                {/* Player Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Player information</h3>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-neutral-text mb-1">
                        First name<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-neutral-text mb-1">
                        Last name<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input type="text" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-neutral-text mb-1">Date of birth</label>
                    <div className="relative">
                      <input type="text" placeholder="mm/dd/yyyy" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm" />
                      <Calendar className="w-4 h-4 text-neutral-icon-medium absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-neutral-text mb-1">Division/Team</label>
                    <div className="relative">
                      <select className="w-full appearance-none px-4 py-2 border border-neutral-border rounded-lg bg-white text-sm focus:outline-none focus:border-admin-action-border text-neutral-text-medium cursor-pointer">
                        <option value="">Select a team</option>
                        <option value="marlins">Marlins (8U)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-neutral-icon-medium absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact information</h3>
                  
                  <div className="bg-neutral-background-weak rounded-xl p-4 border border-neutral-border mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="font-bold text-sm">Primary contact</h4>
                      <HelpCircle className="w-4 h-4 text-admin-action-text" />
                    </div>
                    
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-neutral-text mb-1">
                          First name<span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input type="text" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-neutral-text mb-1">
                          Last name<span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input type="text" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm bg-white" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-1 text-neutral-text">
                        Email<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input 
                        type="email" 
                        value={primaryContact1Email}
                        onChange={(e) => setPrimaryContact1Email(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-sm bg-white ${email1Error ? 'border-red-500 focus:border-red-500 text-neutral-text' : 'border-neutral-border focus:border-admin-action-border'}`} 
                      />
                      {email1Error && (
                        <p className="text-red-500 text-sm mt-1">{email1Error}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-neutral-text mb-1">Phone number</label>
                      <input type="tel" placeholder="(555) 555-5555" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm bg-white" />
                    </div>
                  </div>

                  <div className="bg-neutral-background-weak rounded-xl p-4 border border-neutral-border">
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="font-bold text-sm">Primary contact 2</h4>
                    </div>
                    
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-neutral-text mb-1">First name</label>
                        <input type="text" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-neutral-text mb-1">Last name</label>
                        <input type="text" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm bg-white" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-1 text-neutral-text">
                        Email
                      </label>
                      <input 
                        type="email" 
                        value={primaryContact2Email}
                        onChange={(e) => setPrimaryContact2Email(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none text-sm bg-white ${email2Error ? 'border-red-500 focus:border-red-500 text-neutral-text' : 'border-neutral-border focus:border-admin-action-border'}`} 
                      />
                      {email2Error && (
                        <p className="text-red-500 text-sm mt-1">{email2Error}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-neutral-text mb-1">Phone number</label>
                      <input type="tel" placeholder="(555) 555-5555" className="w-full px-4 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm bg-white" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <footer className="px-6 py-4 flex-shrink-0 border-t border-neutral-border flex justify-end gap-3 bg-white">
              <button 
                type="button"
                className="px-6 py-2 rounded-full border-2 border-admin-action-border text-admin-action-text font-bold hover:bg-admin-action-background-weak-hover transition-colors"
              >
                Save and add another
              </button>
              <button 
                type="button"
                onClick={() => setIsAddPlayerModalOpen(false)}
                className="px-6 py-2 rounded-full bg-admin-action-background text-white font-bold hover:bg-admin-action-text-hover transition-colors shadow-sm"
              >
                Save
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Edit Program Dialog */}
      <EditProgramDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveProgram}
        initialData={{
          programName: program.name,
          activeDates: program.dateRange,
          sport: 'Baseball', // Default value
          type: 'League', // Default value
          enableStandings: enableStandings,
          advancedTeamPermissions: false, // Default value
        }}
      />
    </div>
  );
}

