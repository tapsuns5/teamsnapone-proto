import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { WizardPanel } from './ScheduleTab';
import {
  Calendar as CalendarIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Filter,
  MoreVertical,
  Download,
  MapPin,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  GripVertical,
  ChevronDown,
  Users,
  Layout,
  CalendarRange,
  Trophy,
  History,
  Lock
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'Game' | 'Practice' | 'Other';
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  duration: number; // minutes
  venueId: string;
  fieldId: string;
  isDraft?: boolean;
  isInventorySlot?: boolean;
  isBlackout?: boolean;
}

interface Field {
  id: string;
  name: string;
  compatibility: string[];
}

interface Venue {
  id: string;
  name: string;
  fields: Field[];
}

const getRelativeDate = (offsetDays: number = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const INITIAL_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Central Sports Park',
    fields: [
      { id: 'f1', name: 'West Stadium', compatibility: ['12U', '14U'] },
      { id: 'f2', name: 'East Field', compatibility: ['10U', '12U'] },
      { id: 'f3', name: 'North Diamond', compatibility: ['8U', '10U'] },
      { id: 'f4', name: 'South Pitch', compatibility: ['8U'] },
      { id: 'f5', name: 'Multi-Sport Court', compatibility: ['All'] },
    ]
  },
  {
    id: 'v2',
    name: 'Brooke St. Park',
    fields: [
      { id: 'f6', name: 'Upper Field', compatibility: ['10U', '12U'] },
      { id: 'f7', name: 'Lower Field', compatibility: ['8U', '10U'] },
      { id: 'f8', name: 'Practice Area', compatibility: ['All'] },
    ]
  },
  {
    id: 'v3',
    name: 'Hilltop Complex',
    fields: [
      { id: 'f9', name: 'Grandstand', compatibility: ['14U'] },
      { id: 'f10', name: 'South Field', compatibility: ['12U'] },
      { id: 'f11', name: 'Annex Court', compatibility: ['8U', '10U'] },
    ]
  }
];

const INITIAL_EVENTS: Event[] = [
  // --- TODAY ---
  { id: 'e1', date: getRelativeDate(0), title: '10U White Sox vs 10U Padres', type: 'Game', startTime: '08:30', duration: 120, venueId: 'v1', fieldId: 'f1' },
  { id: 'e2', date: getRelativeDate(0), title: '10U Mariners vs 10U Rockies', type: 'Game', startTime: '11:00', duration: 120, venueId: 'v1', fieldId: 'f1' },
  { id: 'e5', date: getRelativeDate(0), title: '9U Tigers vs 9U Athletics', type: 'Game', startTime: '09:00', duration: 105, venueId: 'v1', fieldId: 'f2' },
  { id: 'e9', date: getRelativeDate(0), title: '8U Dodgers vs 8U Marlins', type: 'Game', startTime: '09:00', duration: 90, venueId: 'v1', fieldId: 'f3' },
  { id: 'e13', date: getRelativeDate(0), title: '8U Yankees vs 8U Red Sox', type: 'Game', startTime: '08:30', duration: 75, venueId: 'v1', fieldId: 'f4' },
  { id: 'e22', date: getRelativeDate(0), title: '8U Cubs Practice', type: 'Practice', startTime: '09:00', duration: 60, venueId: 'v1', fieldId: 'f4' },

  // --- TOMORROW ---
  { id: 'e3', date: getRelativeDate(1), title: '10U Orioles vs 10U White Sox', type: 'Game', startTime: '13:30', duration: 120, venueId: 'v1', fieldId: 'f1' },
  { id: 'e6', date: getRelativeDate(1), title: '9U Phillies vs 9U Rays', type: 'Game', startTime: '11:30', duration: 105, venueId: 'v1', fieldId: 'f2' },
  { id: 'e10', date: getRelativeDate(1), title: '8U Giants vs 8U Astros', type: 'Game', startTime: '10:45', duration: 90, venueId: 'v1', fieldId: 'f3' },

  // --- YESTERDAY ---
  { id: 'e14', date: getRelativeDate(-1), title: '8U Braves vs 8U Mets', type: 'Game', startTime: '10:00', duration: 75, venueId: 'v1', fieldId: 'f4' },
  { id: 'e4', date: getRelativeDate(-1), title: '10U Royals Practice', type: 'Practice', startTime: '16:00', duration: 90, venueId: 'v1', fieldId: 'f1' },

  // --- REST OF WEEK ---
  { id: 'e7', date: getRelativeDate(2), title: '9U Blue Jays vs 9U Tigers', type: 'Game', startTime: '14:00', duration: 105, venueId: 'v1', fieldId: 'f2' },
  { id: 'e11', date: getRelativeDate(2), title: '8U Cardinals vs 8U Dodgers', type: 'Game', startTime: '13:00', duration: 90, venueId: 'v1', fieldId: 'f3' },
  { id: 'e15', date: getRelativeDate(3), title: '9U Rangers vs 9U Brewers', type: 'Game', startTime: '11:30', duration: 75, venueId: 'v1', fieldId: 'f4' },
  { id: 'e8', date: getRelativeDate(4), title: '9U Diamondbacks Practice', type: 'Practice', startTime: '16:30', duration: 90, venueId: 'v1', fieldId: 'f2' },
  { id: 'e12', date: getRelativeDate(-2), title: '10U Pirates vs 10U Nationals', type: 'Game', startTime: '15:00', duration: 90, venueId: 'v1', fieldId: 'f3' },
  { id: 'e16', date: getRelativeDate(-3), title: '10U Reds vs 10U Twins', type: 'Game', startTime: '13:00', duration: 75, venueId: 'v1', fieldId: 'f4' },
  { id: 'e23', date: getRelativeDate(5), title: '9U Angels vs 9U Guardians', type: 'Game', startTime: '09:00', duration: 120, venueId: 'v2', fieldId: 'f6' },
  { id: 'e17', date: getRelativeDate(-4), title: '8U Dodgers Practice', type: 'Practice', startTime: '15:00', duration: 60, venueId: 'v1', fieldId: 'f4' },
  { id: 'e24', date: getRelativeDate(0), title: '10U White Sox Practice', type: 'Practice', startTime: '13:00', duration: 90, venueId: 'v2', fieldId: 'f7' },
  { id: 'e25', date: getRelativeDate(0), title: '10U Padres vs 10U Mariners', type: 'Game', startTime: '10:00', duration: 150, venueId: 'v3', fieldId: 'f9' },
  { id: 's1', date: getRelativeDate(0), title: '9U Open Slot', type: 'Game', startTime: '14:00', duration: 120, venueId: 'v1', fieldId: 'f2', isInventorySlot: true },
  { id: 's2', date: getRelativeDate(0), title: '10U Practice Block', type: 'Practice', startTime: '15:00', duration: 90, venueId: 'v2', fieldId: 'f7', isInventorySlot: true },
];

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

function getMonthName(date: Date) {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

function addMinutes(time: string, mins: number) {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}`;
}

const calculatePosition = (startTime: string, duration: number) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startOffset = (hours - 8) * 60 + minutes;
  const left = (startOffset / (HOURS.length * 60)) * 100;
  const width = (duration / (HOURS.length * 60)) * 100;
  return { left: `${left}%`, width: `${width}%` };
};

const calculateVerticalPosition = (startTime: string, duration: number) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startOffset = (hours - 8) * 60 + minutes;
  const top = (startOffset / (HOURS.length * 60)) * 100;
  const height = (duration / (HOURS.length * 60)) * 100;
  return { top: `${top}%`, height: `${height}%` };
};

export default function SchedulesDashboard() {
  const [overlay, setOverlay] = useState(null);
  const [activeTab, setActiveTab] = useState<'All Events' | 'Calendar' | 'Venue'>('All Events');
  const [calendarViewMode, setCalendarViewMode] = useState<'Month' | 'Week' | 'Day'>('Week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [venueData, setVenueData] = useState<Venue[]>(INITIAL_VENUES);
  const [isConfigSheetOpen, setIsConfigSheetOpen] = useState(false);
  const [dragStart, setDragStart] = useState<{ viewType: string, id?: string, date?: string, hour?: number, half?: number, dayIndex?: number } | null>(null);
  const [dragEnd, setDragEnd] = useState<{ hour?: number, half?: number, dayIndex?: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');
  const [isSlotMode, setIsSlotMode] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [manageSheetTab, setManageSheetTab] = useState<'Venues' | 'Availability' | 'Blackouts'>('Venues');
  const [enabledSubSlots, setEnabledSubSlots] = useState<Record<string, boolean>>({});
  const [selectedVenueId, setSelectedVenueId] = useState('v1');
  const [selectedFieldIdForManage, setSelectedFieldIdForManage] = useState<string>('all');
  const [isOverrideFormOpen, setIsOverrideFormOpen] = useState(false);
  const [provisionTitle, setProvisionTitle] = useState('');
  const [provisionType, setProvisionType] = useState<'Game' | 'Practice' | 'Other'>('Game');
  const [blackoutName, setBlackoutName] = useState('');
  const [blackoutDate, setBlackoutDate] = useState(formatDate(new Date()));
  const [blackoutEndDate, setBlackoutEndDate] = useState(formatDate(new Date()));
  const [blackoutStartTime, setBlackoutStartTime] = useState('08:00');
  const [blackoutEndTime, setBlackoutEndTime] = useState('21:00');
  const [blackoutRecurrence, setBlackoutRecurrence] = useState('None');
  const [blackoutImpact, setBlackoutImpact] = useState('Full Facility Closure');
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ hour: number; half?: number; date?: string } | null>(null);

  // Filters
  const [filterDivision, setFilterDivision] = useState('All Divisions');
  const [filterType, setFilterType] = useState('All Types');
  const [filterTeam, setFilterTeam] = useState('All Teams');
  const [searchQuery, setSearchQuery] = useState('');

  const calculateUtilization = (fieldId: string) => {
    const activeDateStr = formatDate(selectedDate);
    const fieldEvents = filteredEvents.filter(e => e.fieldId === fieldId && e.date === activeDateStr);
    const totalMinutes = fieldEvents.reduce((acc, e) => acc + e.duration, 0);
    const dayMinutes = HOURS.length * 60;
    return Math.round((totalMinutes / dayMinutes) * 100);
  };

  const TEAMS = [
    'Dodgers', 'Marlins', 'Yankees', 'Red Sox', 'Cubs', 'Giants', 'Astros', 'Braves', 'Mets', 'Cardinals',
    'Tigers', 'Athletics', 'Phillies', 'Rays', 'Blue Jays', 'Rangers', 'Brewers', 'Diamondbacks', 'Angels', 'Guardians',
    'White Sox', 'Padres', 'Mariners', 'Rockies', 'Orioles', 'Royals', 'Pirates', 'Nationals', 'Reds', 'Twins'
  ];
  const ALL_DIVISIONS = ['8U', '9U', '10U'];

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Blackouts ignore team/division filters for visibility
    if (e.isBlackout) return matchesSearch;

    const matchesDivision = filterDivision === 'All Divisions' || e.title.includes(filterDivision);
    const matchesType = filterType === 'All Types' || e.type === filterType;
    const matchesTeam = filterTeam === 'All Teams' || e.title.includes(filterTeam);
    return matchesSearch && matchesDivision && matchesType && matchesTeam;
  });

  const [provisionVenueId, setProvisionVenueId] = useState('v1');
  const [provisionFieldId, setProvisionFieldId] = useState('f1');
  const [provisionDivision, setProvisionDivision] = useState('12U');

  // Sync manage field selection when venue changes
  useEffect(() => {
    setSelectedFieldIdForManage('all');
  }, [selectedVenueId]);

  // Sync provision field selection when venue changes
  useEffect(() => {
    const venue = venueData.find(v => v.id === provisionVenueId);
    if (venue && venue.fields.length > 0) {
      // Only reset if current selection is not in the new venue
      if (!venue.fields.some(f => f.id === provisionFieldId)) {
        setProvisionFieldId(venue.fields[0].id);
      }
    }
  }, [provisionVenueId, venueData, provisionFieldId]);

  const toggleFieldCompatibility = (venueId: string, fieldId: string, division: string) => {
    setVenueData(prev => prev.map(v => {
      if (v.id !== venueId) return v;
      return {
        ...v,
        fields: v.fields.map(f => {
          if (f.id !== fieldId) return f;
          const compatibility = f.compatibility.includes(division)
            ? f.compatibility.filter(c => c !== division)
            : [...f.compatibility, division];
          return { ...f, compatibility };
        })
      };
    }));
  };

  const handleMouseDown = (viewType: string, params: { id?: string, date?: string, hour?: number, half?: number, dayIndex?: number }) => {
    setDragStart({ viewType, ...params });
    setDragEnd({ hour: params.hour, half: params.half, dayIndex: params.dayIndex });
    setIsDragging(true);
  };

  const handleMouseEnter = (params: { hour?: number, half?: number, dayIndex?: number }) => {
    if (isDragging) {
      setDragEnd(params);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragStart && dragEnd) {
      // Initialize provision state from drag location
      if (dragStart.id) {
        const venue = venueData.find(v => v.fields.some(f => f.id === dragStart.id));
        if (venue) {
          setProvisionVenueId(venue.id);
          setProvisionFieldId(dragStart.id);
        }
      }
      setIsConfigSheetOpen(true);
    }
    setIsDragging(false);
  };

  const getDayDragOverlay = (date: string) => {
    if (!dragStart || !dragEnd || dragStart.date !== date || dragStart.viewType === 'Month') return null;

    const startTotal = (dragStart.hour ?? 0) * 60 + (dragStart.half ?? 0) * 30;
    const endTotal = (dragEnd.hour ?? 0) * 60 + (dragEnd.half ?? 0) * 30;

    const actualStart = Math.min(startTotal, endTotal);
    const actualEnd = Math.max(startTotal, endTotal) + 30;

    const startOffset = actualStart - 8 * 60;
    const duration = actualEnd - actualStart;

    const top = (startOffset / (HOURS.length * 60)) * 100;
    const height = (duration / (HOURS.length * 60)) * 100;

    return (
      <div
        className="absolute left-1 right-1 bg-accent-background/20 border-2 border-accent-background border-dashed rounded-md z-20 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ top: `${top}%`, height: `${height}%` }}
      >
        <span className="text-[10px] font-black text-accent-text uppercase animate-pulse">Scheduling...</span>
      </div>
    );
  };

  const handleCreateSlot = () => {
    if (!dragStart || !dragEnd) return;

    const startTotal = (dragStart.hour ?? 0) * 60 + (dragStart.half ?? 0) * 30;
    const endTotal = (dragEnd.hour ?? 0) * 60 + (dragEnd.half ?? 0) * 30;
    const actualStart = Math.min(startTotal, endTotal);
    const actualEnd = Math.max(startTotal, endTotal) + 30;
    const duration = actualEnd - actualStart;

    const h = Math.floor(actualStart / 60);
    const m = actualStart % 60;
    const startTimeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    const newEvent: Event = {
      id: `ev-${Date.now()}`,
      title: provisionTitle || (isSlotMode ? 'Inventory Slot' : (homeTeam ? `${homeTeam} vs ${awayTeam}` : 'New Event')),
      type: provisionType,
      date: dragStart.date || formatDate(selectedDate),
      startTime: startTimeStr,
      duration: duration,
      venueId: provisionVenueId,
      fieldId: provisionFieldId,
      isInventorySlot: isSlotMode,
      isDraft: false
    };

    setEvents([...events, newEvent]);
    setIsConfigSheetOpen(false);
    setProvisionTitle('');
    setHomeTeam('');
    setAwayTeam('');
  };

  const handleCreateBlackout = () => {
    const venue = venueData.find(v => v.id === selectedVenueId);
    if (!venue) return;

    // Helper to calculate duration in minutes
    const getMinutes = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };
    const duration = getMinutes(blackoutEndTime) - getMinutes(blackoutStartTime);

    // Generate dates range
    const start = new Date(blackoutDate + 'T12:00:00');
    const end = new Date(blackoutEndDate + 'T12:00:00');
    const dateArray: string[] = [];
    let current = new Date(start);
    while (current <= end) {
      dateArray.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }

    // If recurrence is weekly, we'll repeat this for 4 weeks for demo purposes
    if (blackoutRecurrence === 'Weekly') {
      const extraDates: string[] = [];
      dateArray.forEach(d => {
        for (let i = 1; i <= 3; i++) {
          const rd = new Date(d + 'T12:00:00');
          rd.setDate(rd.getDate() + (i * 7));
          extraDates.push(formatDate(rd));
        }
      });
      dateArray.push(...extraDates);
    }

    const newBlackouts: Event[] = [];

    dateArray.forEach(date => {
      const fieldsToApply = selectedFieldIdForManage === 'all'
        ? venue.fields
        : [venue.fields.find(f => f.id === selectedFieldIdForManage)].filter(Boolean) as Field[];

      fieldsToApply.forEach(field => {
        newBlackouts.push({
          id: `bl-${Date.now()}-${Math.random()}`,
          title: blackoutName || 'Facility Blackout',
          type: 'Other',
          date: date,
          startTime: blackoutStartTime,
          duration: duration,
          venueId: selectedVenueId,
          fieldId: field.id,
          isBlackout: true
        });
      });
    });

    setEvents([...events, ...newBlackouts]);
    setIsOverrideFormOpen(false);
    setBlackoutName('');
  };

  const renderManageSheet = () => {
    if (!isManageSheetOpen) return null;
    return (
      <div className="fixed inset-0 z-[110] flex justify-end">
        <div className="absolute inset-0 bg-neutral-text/60 backdrop-blur-md" onClick={() => setIsManageSheetOpen(false)} />
        <div className="relative w-full max-w-4xl bg-white h-full shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 rounded-l-[48px] border-l border-white/20">
          <div className="p-8 border-b border-neutral-border flex items-center justify-between bg-neutral-background-weak/50 backdrop-blur-xl">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-[20px] bg-neutral-text text-white flex items-center justify-center shadow-2xl shadow-neutral-text/30 group">
                <Settings className="w-7 h-7 group-hover:rotate-90 transition-transform duration-700" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-neutral-text uppercase tracking-tight">Facility Intelligence</h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-background animate-pulse" />
                  <p className="text-sm text-neutral-text-medium font-bold italic opacity-60">Configuring Scheduling Constraints & Logic</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsManageSheetOpen(false)} className="w-12 h-12 flex items-center justify-center hover:bg-neutral-border-weak rounded-2xl transition-all hover:rotate-90">
              <Plus className="w-8 h-8 rotate-45 text-neutral-icon" />
            </button>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Sidebar nav for Sheet */}
            <div className="w-72 border-r border-neutral-border p-8 space-y-3 bg-neutral-background-weak/40">
              {(['Venues', 'Availability', 'Blackouts'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setManageSheetTab(tab)}
                  className={`w-full text-left px-6 py-4 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-4 group ${manageSheetTab === tab ? 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] text-accent-text ring-1 ring-neutral-border' : 'text-neutral-text-medium hover:bg-white/60 hover:translate-x-1'}`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${manageSheetTab === tab ? 'bg-accent-background text-white' : 'bg-neutral-background-medium group-hover:bg-neutral-border-weak'}`}>
                    {tab === 'Venues' && <MapPin className="w-4 h-4" />}
                    {tab === 'Availability' && <History className="w-4 h-4" />}
                    {tab === 'Blackouts' && <Lock className="w-4 h-4" />}
                  </div>
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-10 sui-hide-scrollbar bg-white">
              {manageSheetTab === 'Venues' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Registered Facilities</h4>
                    <button className="flex items-center gap-2 px-4 py-2 bg-neutral-text text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                      <Plus className="w-3 h-3" />
                      New Venue
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {venueData.map(v => (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVenueId(v.id)}
                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between min-h-[160px] ${selectedVenueId === v.id ? 'border-accent-background bg-accent-background/5' : 'border-neutral-border hover:border-neutral-icon-medium'}`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${selectedVenueId === v.id ? 'bg-accent-background text-white' : 'bg-neutral-background-medium group-hover:bg-neutral-border-weak'}`}>
                              <Trophy className="w-5 h-5" />
                            </div>
                            {selectedVenueId === v.id && <div className="w-4 h-4 rounded-full bg-accent-background flex items-center justify-center text-[8px] text-white shadow-lg">✓</div>}
                          </div>
                          <h3 className="font-black text-neutral-text uppercase tracking-tight">{v.name}</h3>
                          <p className="text-xs text-neutral-text-medium mt-1 uppercase font-bold tracking-tighter">{v.fields.length} Sub-venues (Fields)</p>
                        </div>
                        {selectedVenueId === v.id && (
                          <button className="mt-4 py-2 border border-accent-background border-dashed rounded-lg text-[9px] font-black text-accent-text uppercase hover:bg-accent-background hover:text-white transition-all">
                            + Add Sub-venue
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-neutral-border pt-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Sub-venue Infrastructure: {venueData.find(v => v.id === selectedVenueId)?.name}</h4>
                        <p className="text-[11px] text-neutral-text-medium font-bold opacity-60 uppercase">Configure granular division constraints per field</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {venueData.find(v => v.id === selectedVenueId)?.fields.map(field => (
                        <div key={field.id} className="p-6 bg-neutral-background-weak/30 border border-neutral-border rounded-3xl flex items-center justify-between group hover:border-accent-background/30 transition-all hover:bg-white">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-border flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all">
                              <Layout className="w-6 h-6 text-neutral-icon" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-neutral-text uppercase tracking-tight">{field.name}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {field.compatibility.map(c => (
                                  <span key={c} className="px-2 py-0.5 bg-accent-background/10 text-accent-text text-[9px] font-black rounded uppercase border border-accent-background/20">{c}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                            {ALL_DIVISIONS.map(div => {
                              const isActive = field.compatibility.includes(div);
                              return (
                                <button
                                  key={div}
                                  onClick={() => toggleFieldCompatibility(selectedVenueId, field.id, div)}
                                  className={`px-2 py-1 rounded text-[9px] font-black uppercase transition-all ${isActive ? 'bg-neutral-text text-white shadow-md scale-105' : 'bg-white border border-neutral-border text-neutral-text-medium hover:scale-105 opacity-40 hover:opacity-100'}`}
                                >
                                  {div}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {(manageSheetTab === 'Availability' || manageSheetTab === 'Blackouts') && (
                <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-neutral-background-weak rounded-2xl border border-neutral-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-border flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-neutral-icon" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-text-medium uppercase tracking-widest">Configuring Scope</p>
                        <p className="text-sm font-bold text-neutral-text uppercase">{venueData.find(v => v.id === selectedVenueId)?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedFieldIdForManage}
                        onChange={(e) => setSelectedFieldIdForManage(e.target.value)}
                        className="bg-white border border-neutral-border rounded-xl px-4 py-2 text-xs font-black uppercase tracking-tight outline-none focus:ring-2 focus:ring-accent-background/20"
                      >
                        <option value="all">Full Facility</option>
                        {venueData.find(v => v.id === selectedVenueId)?.fields.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {manageSheetTab === 'Availability' && (
                <div className="space-y-8 animate-in fade-in duration-500 pb-20">
                  <div>
                    <h4 className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em] mb-6">Weekly Operating Matrix</h4>
                    <div className="space-y-6">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                        const isWeekend = day === 'Saturday' || day === 'Sunday';
                        const defaultStart = isWeekend ? "08:00" : "17:00";
                        const defaultEnd = "21:00";

                        return (
                          <div key={day} className="p-8 bg-neutral-background-weak/40 rounded-[32px] border border-neutral-border group hover:bg-white hover:shadow-2xl hover:shadow-neutral-text/5 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-border flex items-center justify-center font-black text-neutral-text text-xs shadow-sm">
                                  {day.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="font-black text-neutral-text uppercase text-sm tracking-tight">{day}</div>
                              </div>
                              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-neutral-border shadow-sm">
                                <div className="w-8 h-4 bg-accent-background rounded-full relative cursor-pointer">
                                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                                </div>
                                <span className="text-[10px] font-black text-accent-text uppercase tracking-widest">Active</span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {/* Facility Hours */}
                              <div className="flex items-center gap-6 p-4 bg-white rounded-2xl border border-neutral-border/50">
                                <div className="w-40 flex items-center gap-3">
                                  <Clock className="w-4 h-4 text-neutral-icon opacity-40" />
                                  <span className="text-[10px] font-black text-neutral-text-medium uppercase tracking-tight">Facility Access</span>
                                </div>
                                <div className="flex-1 flex items-center gap-4">
                                  <input type="time" defaultValue={defaultStart} className="bg-neutral-background-weak border border-neutral-border rounded-xl px-4 py-2 text-xs font-bold text-neutral-text outline-none focus:ring-2 focus:ring-accent-background/20 transition-all" />
                                  <span className="text-neutral-icon opacity-30 font-bold text-[10px] uppercase">to</span>
                                  <input type="time" defaultValue={defaultEnd} className="bg-neutral-background-weak border border-neutral-border rounded-xl px-4 py-2 text-xs font-bold text-neutral-text outline-none focus:ring-2 focus:ring-accent-background/20 transition-all" />
                                </div>
                              </div>

                              {/* Game Sub-times */}
                              <div className={`flex items-center gap-6 p-4 rounded-2xl border transition-all duration-300 ${enabledSubSlots[`${day}-games`] ? 'bg-accent-background/5 border-accent-background/20' : 'bg-neutral-background-weak/40 border-neutral-border opacity-40 grayscale'}`}>
                                <div className="w-56 flex items-center justify-between pr-4 border-r border-neutral-border/20">
                                  <div className="flex items-center gap-3">
                                    <Trophy className={`w-4 h-4 ${enabledSubSlots[`${day}-games`] ? 'text-accent-text' : 'text-neutral-icon'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">Game Slots</span>
                                  </div>
                                  <button
                                    onClick={() => setEnabledSubSlots(prev => ({ ...prev, [`${day}-games`]: !prev[`${day}-games`] }))}
                                    className={`w-8 h-4 rounded-full relative transition-colors ${enabledSubSlots[`${day}-games`] ? 'bg-accent-background' : 'bg-neutral-icon-medium/40'}`}
                                  >
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${enabledSubSlots[`${day}-games`] ? 'right-0.5' : 'left-0.5'}`} />
                                  </button>
                                </div>
                                <div className="flex-1 flex items-center gap-4">
                                  <input
                                    type="time"
                                    defaultValue={defaultStart}
                                    disabled={!enabledSubSlots[`${day}-games`]}
                                    className="bg-white border border-neutral-border rounded-xl px-4 py-2 text-xs font-bold text-neutral-text outline-none focus:ring-2 focus:ring-accent-background/20 transition-all disabled:cursor-not-allowed"
                                  />
                                  <span className="text-neutral-icon opacity-30 font-bold text-[10px] uppercase">to</span>
                                  <input
                                    type="time"
                                    defaultValue={defaultEnd}
                                    disabled={!enabledSubSlots[`${day}-games`]}
                                    className="bg-white border border-neutral-border rounded-xl px-4 py-2 text-xs font-bold text-neutral-text outline-none focus:ring-2 focus:ring-accent-background/20 transition-all disabled:cursor-not-allowed"
                                  />
                                </div>
                              </div>

                              {/* Practice Sub-times */}
                              <div className={`flex items-center gap-6 p-4 rounded-2xl border transition-all duration-300 ${enabledSubSlots[`${day}-practices`] ? 'bg-orange-500/5 border-orange-500/20' : 'bg-neutral-background-weak/40 border-neutral-border opacity-40 grayscale'}`}>
                                <div className="w-56 flex items-center justify-between pr-4 border-r border-neutral-border/20">
                                  <div className="flex items-center gap-3">
                                    <Zap className={`w-4 h-4 ${enabledSubSlots[`${day}-practices`] ? 'text-orange-500' : 'text-neutral-icon'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-tight">Practice Blocks</span>
                                  </div>
                                  <button
                                    onClick={() => setEnabledSubSlots(prev => ({ ...prev, [`${day}-practices`]: !prev[`${day}-practices`] }))}
                                    className={`w-8 h-4 rounded-full relative transition-colors ${enabledSubSlots[`${day}-practices`] ? 'bg-orange-500' : 'bg-neutral-icon-medium/40'}`}
                                  >
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${enabledSubSlots[`${day}-practices`] ? 'right-0.5' : 'left-0.5'}`} />
                                  </button>
                                </div>
                                <div className="flex-1 flex items-center gap-4">
                                  <input
                                    type="time"
                                    defaultValue={defaultStart}
                                    disabled={!enabledSubSlots[`${day}-practices`]}
                                    className="bg-white border border-neutral-border rounded-xl px-4 py-2 text-xs font-bold text-neutral-text outline-none focus:ring-2 focus:ring-orange-500/20 transition-all disabled:cursor-not-allowed"
                                  />
                                  <span className="text-neutral-icon opacity-30 font-bold text-[10px] uppercase">to</span>
                                  <input
                                    type="time"
                                    defaultValue={defaultEnd}
                                    disabled={!enabledSubSlots[`${day}-practices`]}
                                    className="bg-white border border-neutral-border rounded-xl px-4 py-2 text-xs font-bold text-neutral-text outline-none focus:ring-2 focus:ring-orange-500/20 transition-all disabled:cursor-not-allowed"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {manageSheetTab === 'Blackouts' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {isOverrideFormOpen ? (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                      <div className="flex items-center justify-between border-b border-neutral-border pb-4">
                        <h4 className="text-sm font-black text-neutral-text uppercase tracking-tight">Configure New Override</h4>
                        <button
                          onClick={() => setIsOverrideFormOpen(false)}
                          className="text-xs font-bold text-neutral-text-medium hover:text-red-500 transition-colors uppercase tracking-widest"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Override Name</label>
                          <input
                            type="text"
                            value={blackoutName}
                            onChange={(e) => setBlackoutName(e.target.value)}
                            placeholder="e.g. Field Maintenance / Holiday Closure"
                            className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Start Date</label>
                            <div className="relative">
                              <CalendarRange className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon" />
                              <input
                                type="date"
                                value={blackoutDate}
                                onChange={(e) => setBlackoutDate(e.target.value)}
                                className="w-full pl-11 pr-4 py-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">End Date (Range)</label>
                            <div className="relative">
                              <CalendarRange className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon" />
                              <input
                                type="date"
                                value={blackoutEndDate}
                                onChange={(e) => setBlackoutEndDate(e.target.value)}
                                className="w-full pl-11 pr-4 py-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Start Time</label>
                            <input
                              type="time"
                              value={blackoutStartTime}
                              onChange={(e) => setBlackoutStartTime(e.target.value)}
                              className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">End Time</label>
                            <input
                              type="time"
                              value={blackoutEndTime}
                              onChange={(e) => setBlackoutEndTime(e.target.value)}
                              className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Recurrence</label>
                            <select
                              value={blackoutRecurrence}
                              onChange={(e) => setBlackoutRecurrence(e.target.value)}
                              className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text appearance-none"
                            >
                              <option value="None">One-time Event</option>
                              <option value="Daily">Daily (Demo: 1 Week)</option>
                              <option value="Weekly">Weekly (Demo: 4 Weeks)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Impact Level</label>
                            <select
                              value={blackoutImpact}
                              onChange={(e) => setBlackoutImpact(e.target.value)}
                              className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text appearance-none"
                            >
                              <option>Full Facility Closure</option>
                              <option>Selected Fields Only</option>
                              <option>Maintenance Window</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Affects Sub-Venues (Fields)</label>
                          <div className="grid grid-cols-3 gap-2">
                            {venueData.find(v => v.id === selectedVenueId)?.fields.map(field => (
                              <div key={field.id} className="p-3 border border-neutral-border rounded-lg flex items-center gap-3 hover:bg-neutral-background-weak cursor-pointer transition-colors bg-white">
                                <div className="w-4 h-4 rounded border-2 border-neutral-border flex items-center justify-center">
                                  <div className="w-2 h-2 bg-accent-background rounded-sm" />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-text uppercase">{field.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                          <button
                            onClick={handleCreateBlackout}
                            className="flex-1 py-4 bg-accent-background text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-accent-background/20 hover:scale-[1.01] active:scale-95 transition-all"
                          >
                            Save Impact Override
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Active Blackout Windows & Overrides</h4>
                        <button
                          onClick={() => setIsOverrideFormOpen(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-text text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                        >
                          <Plus className="w-3 h-3" />
                          Add Override
                        </button>
                      </div>
                      <div className="space-y-3">
                        {events.filter(e => e.isBlackout && e.venueId === selectedVenueId).length === 0 ? (
                          <div className="p-6 border-2 border-dashed border-neutral-border rounded-2xl bg-neutral-background-weak/20 flex flex-col items-center justify-center py-12 text-center">
                            <CalendarRange className="w-10 h-10 text-neutral-icon opacity-20 mb-4" />
                            <p className="font-black text-neutral-text-medium uppercase tracking-tight text-sm">No Active Overrides Detected</p>
                            <p className="text-xs text-neutral-text-medium opacity-60 mt-2">Facility follows standard operating hours for this period.</p>
                          </div>
                        ) : (
                          events.filter(e => e.isBlackout && e.venueId === selectedVenueId).reduce((acc, current) => {
                            // Deduplicate for list view (simplified for demo: grouped by title/date)
                            const key = `${current.title}-${current.date}`;
                            if (!acc.find(item => `${item.title}-${item.date}` === key)) {
                              acc.push(current);
                            }
                            return acc;
                          }, [] as Event[]).map(e => (
                            <div key={e.id} className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between group animate-in slide-in-from-right-4 duration-300">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                                  <History className="w-6 h-6" />
                                </div>
                                <div>
                                  <p className="text-xs font-black text-red-900 uppercase">{e.title}</p>
                                  <p className="text-[10px] text-red-700 font-bold uppercase opacity-60 tracking-tight">
                                    {e.date} • {e.startTime} - {addMinutes(e.startTime, e.duration)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => setEvents(events.filter(ev => ev.title !== e.title || ev.date !== e.date))}
                                className="p-2 text-red-900 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-red-200"
                              >
                                <Plus className="w-4 h-4 rotate-45" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="p-10 border-t border-neutral-border bg-neutral-background-weak/50 backdrop-blur-xl flex justify-end gap-4 shrink-0">
            <button onClick={() => setIsManageSheetOpen(false)} className="px-10 py-4 bg-neutral-background-medium text-neutral-text rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-neutral-border-weak">Cancel</button>
            <button onClick={() => setIsManageSheetOpen(false)} className="px-12 py-4 bg-neutral-text text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-neutral-text/30 hover:scale-[1.02] active:scale-95 transition-all">Confirm Config</button>
          </div>
        </div>
      </div>
    );
  };

  const renderConflictModal = () => {
    if (!isConflictModalOpen) return null;
    const conflictingEvents = filteredEvents;

    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-neutral-text/80 backdrop-blur-xl" onClick={() => setIsConflictModalOpen(false)} />
        <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-300">
          <div className="p-8 border-b border-neutral-border flex items-center justify-between bg-neutral-background-weak">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-red-500/20 shadow-xl animate-pulse">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-neutral-text uppercase tracking-tight">Conflict Resolution</h2>
                <p className="text-sm text-neutral-text-medium font-medium">Resolving {conflictingEvents.length} Scheduling Collisions</p>
              </div>
            </div>
            <button onClick={() => setIsConflictModalOpen(false)} className="p-2 hover:bg-neutral-border-weak rounded-full transition-colors">
              <Plus className="w-6 h-6 rotate-45 text-neutral-icon" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto sui-hide-scrollbar p-8 space-y-4">
            {conflictingEvents.map(e => {
              const venueName = venueData.find(v => v.id === e.venueId)?.name;
              const fieldName = venueData.find(v => v.id === e.venueId)?.fields.find(f => f.id === e.fieldId)?.name;

              return (
                <div key={e.id} className="group relative p-6 bg-white border-2 border-red-100 rounded-2xl hover:border-red-500 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Collision Detected</span>
                    </div>
                    <span className="text-[10px] font-black text-neutral-text-medium uppercase bg-neutral-background-weak px-2 py-1 rounded">{e.startTime} • {venueName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-black text-neutral-text uppercase tracking-tight leading-tight">{e.title}</h4>
                      <p className="text-xs text-neutral-text-medium font-bold uppercase tracking-tighter mt-1">Impacted Venue: {fieldName}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-neutral-background-medium text-neutral-text rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-border-weak transition-all">
                        Auto-Move
                      </button>
                      <button className="px-4 py-2 bg-neutral-text text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                        Swap Rules
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-8 border-t border-neutral-border bg-neutral-background-weak/30 flex justify-end shrink-0">
            <button
              onClick={() => setIsConflictModalOpen(false)}
              className="px-10 py-4 bg-neutral-text text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all w-full"
            >
              Close Resolver
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfigSheet = () => {
    if (!isConfigSheetOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex justify-end">
        <div className="absolute inset-0 bg-neutral-text/40 backdrop-blur-sm" onClick={() => setIsConfigSheetOpen(false)} />
        <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-neutral-text uppercase tracking-tight">Provisioning</h2>
              <p className="text-sm text-neutral-text-medium font-medium">Capacity Strategy & Execution</p>
            </div>
            <button onClick={() => setIsConfigSheetOpen(false)} className="p-2 hover:bg-neutral-background-medium rounded-full transition-colors">
              <Plus className="w-6 h-6 rotate-45 text-neutral-icon" />
            </button>
          </div>

          <div className="flex p-1 bg-neutral-background-weak border border-neutral-border rounded-xl mb-8">
            <button
              onClick={() => setIsSlotMode(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${!isSlotMode ? 'bg-white shadow-md text-accent-text ring-1 ring-neutral-border' : 'text-neutral-text-medium opacity-50'}`}
            >
              <Zap className={`w-3 h-3 ${!isSlotMode ? 'fill-accent-background' : ''}`} />
              Scheduled Event
            </button>
            <button
              onClick={() => setIsSlotMode(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isSlotMode ? 'bg-white shadow-md text-accent-text ring-1 ring-neutral-border' : 'text-neutral-text-medium opacity-50'}`}
            >
              <Layout className={`w-3 h-3 ${isSlotMode ? 'fill-accent-background' : ''}`} />
              Inventory Slot
            </button>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto sui-hide-scrollbar">
            {/* Context Summary */}
            {(dragStart || selectedDate) && (
              <div className="p-6 bg-neutral-text text-white rounded-[24px] shadow-2xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
                      <span className="text-[10px] font-black text-white/50 leading-none uppercase">{(dragStart?.date ? new Date(dragStart.date) : selectedDate).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-lg font-black text-white leading-none">{(dragStart?.date ? new Date(dragStart.date) : selectedDate).getDate()}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Target Window</p>
                      <h3 className="text-sm font-black uppercase tracking-tight">
                        {dragStart?.hour !== undefined ? `${dragStart.hour}:00 - ${addMinutes(`${dragStart.hour}:00`, 90)}` : 'Full Day Block'}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Status</p>
                    <span className="text-[10px] font-black bg-accent-background px-2 py-0.5 rounded text-white uppercase animate-pulse">Provisioning</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 relative z-10 pt-2 border-t border-white/10">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Facility Assignment</label>
                    <select
                      value={provisionVenueId}
                      onChange={(e) => setProvisionVenueId(e.target.value)}
                      className="w-full bg-white/10 border border-white/10 rounded-lg py-2 px-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-white/30 transition-all appearance-none"
                    >
                      {venueData.map(v => <option key={v.id} value={v.id} className="text-neutral-text font-bold">{v.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none">Operational Point</label>
                    <select
                      value={provisionFieldId}
                      onChange={(e) => setProvisionFieldId(e.target.value)}
                      className="w-full bg-white/10 border border-white/10 rounded-lg py-2 px-3 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-white/30 transition-all appearance-none"
                    >
                      {venueData.find(v => v.id === provisionVenueId)?.fields.map(f => <option key={f.id} value={f.id} className="text-neutral-text font-bold">{f.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">{isSlotMode ? 'Slot Description' : 'Event Title'}</label>
              <input
                type="text"
                value={provisionTitle}
                onChange={(e) => setProvisionTitle(e.target.value)}
                placeholder={isSlotMode ? "e.g. Saturday Morning Block" : "e.g. Minors Game 1"}
                className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold focus:ring-2 focus:ring-accent-background/10 transition-all text-neutral-text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Assignment Type</label>
                <select
                  value={provisionType}
                  onChange={(e) => setProvisionType(e.target.value as any)}
                  className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold appearance-none text-neutral-text"
                >
                  <option value="Game">Game Placeholder</option>
                  <option value="Practice">Practice Block</option>
                  <option value="Other">Facility Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Division Level</label>
                <select
                  value={provisionDivision}
                  onChange={(e) => setProvisionDivision(e.target.value)}
                  className="w-full p-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text outline-none focus:ring-2 focus:ring-accent-background/10 transition-all appearance-none"
                >
                  {ALL_DIVISIONS.map(div => <option key={div} value={div}>{div} National / Competitive</option>)}
                </select>
              </div>
            </div>

            {!isSlotMode && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Home Team</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon" />
                    <select
                      value={homeTeam}
                      onChange={(e) => setHomeTeam(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text appearance-none"
                    >
                      <option value="">Select Home Team</option>
                      {TEAMS.filter(t => t !== awayTeam).map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Away Team</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon" />
                    <select
                      value={awayTeam}
                      onChange={(e) => setAwayTeam(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-neutral-background-weak border border-neutral-border rounded-xl font-bold text-neutral-text appearance-none"
                    >
                      <option value="">Select Away Team</option>
                      {TEAMS.filter(t => t !== homeTeam).map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em]">Conflict Check</label>
              <div className="flex items-center gap-3 p-4 bg-positive-background/5 border border-positive-background/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-positive-background/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-positive-background" />
                </div>
                <span className="text-[11px] font-black text-positive-background uppercase tracking-tight">Validation Passed: Selection is conflict-free</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-border mt-auto flex gap-3">
            <button
              onClick={() => setIsConfigSheetOpen(false)}
              className="flex-1 py-4 bg-neutral-background-medium text-neutral-text rounded-xl text-sm font-black uppercase tracking-widest hover:bg-neutral-border-weak transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSlot}
              className="flex-1 py-4 bg-neutral-text text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-neutral-text/20"
            >
              {isSlotMode ? 'Create Slot' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    );
  };


  const hasConflict = (event: Event) => {
    return events.some(e =>
      e.id !== event.id &&
      e.date === event.date &&
      e.venueId === event.venueId &&
      e.fieldId === event.fieldId &&
      (
        (event.startTime >= e.startTime && event.startTime < addMinutes(e.startTime, e.duration)) ||
        (e.startTime >= event.startTime && e.startTime < addMinutes(event.startTime, event.duration))
      )
    );
  };


  const getEventColor = (event: Event) => {
    if (event.isBlackout) return 'bg-neutral-text border-black text-white ring-2 ring-red-500/50';
    if (hasConflict(event)) return 'bg-red-100 border-red-500 text-red-900 ring-2 ring-red-500 ring-inset';

    if (event.isInventorySlot) {
      const typeStyles = {
        'Game': 'border-lime-400 text-lime-700',
        'Practice': 'border-orange-400 text-orange-700',
        'Other': 'border-blue-400 text-blue-700'
      };
      return `bg-white ${typeStyles[event.type as keyof typeof typeStyles] || 'border-neutral-border'} border-dashed shadow-sm`;
    }

    switch (event.type) {
      case 'Game': return 'bg-[#d9f99d] border-[#a3e635] text-[#365314]';
      case 'Practice': return 'bg-[#ffedd5] border-[#fed7aa] text-[#7c2d12]';
      case 'Other': return 'bg-[#dbeafe] border-[#bfdbfe] text-[#1e3a8a]';
      default: return 'bg-white border-neutral-border';
    }
  };

  const renderMonthView = () => {
    const today = new Date();
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const firstDayIdx = startOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const prevMonthLastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();
    const grid = [];

    for (let i = firstDayIdx - 1; i >= 0; i--) {
      grid.push({ day: prevMonthLastDay - i, current: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({ day: i, current: true });
    }
    const remaining = 42 - grid.length;
    for (let i = 1; i <= remaining; i++) {
      grid.push({ day: i, current: false });
    }

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-neutral-border overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 border-b border-neutral-border bg-neutral-background-weak">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-xs font-bold text-neutral-text-medium uppercase tracking-widest">{day}</div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 overflow-y-auto sui-hide-scrollbar">
          {grid.map((cell, idx) => {
            const isToday = cell.current && cell.day === today.getDate() && selectedDate.getMonth() === today.getMonth() && selectedDate.getFullYear() === today.getFullYear();

            const dayStr = cell.current
              ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${cell.day.toString().padStart(2, '0')}`
              : '';
            const dateEvents = cell.current ? filteredEvents.filter(e => e.date === dayStr) : [];

            return (
              <div
                key={idx}
                className={`min-h-[140px] border-b border-r border-neutral-border/50 p-2 hover:bg-neutral-background-medium/10 transition-colors relative ${!cell.current ? 'bg-neutral-background-medium/20 opacity-40' : ''}`}
                onMouseDown={() => cell.current && handleMouseDown('Month', { dayIndex: idx })}
                onMouseEnter={() => cell.current && handleMouseEnter({ dayIndex: idx })}
              >
                {cell.current && isDragging && dragStart?.viewType === 'Month' && dragStart.dayIndex !== undefined && dragEnd?.dayIndex !== undefined && (
                  (idx >= Math.min(dragStart.dayIndex, dragEnd.dayIndex) && idx <= Math.max(dragStart.dayIndex, dragEnd.dayIndex)) && (
                    <div className="absolute inset-x-0 inset-y-0 bg-accent-background/10 border-2 border-accent-background/30 border-dashed z-0" />
                  )
                )}
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-bold ${isToday ? 'w-7 h-7 bg-accent-background text-white rounded-full grid place-items-center shadow-lg shadow-accent-background/30' : 'text-neutral-text'}`}>
                    {cell.day}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    {dateEvents.filter(e => !e.isInventorySlot).length > 0 && (
                      <span className="text-[9px] font-black text-neutral-text-medium bg-neutral-background-weak px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm border border-neutral-border/50">
                        {dateEvents.filter(e => !e.isInventorySlot).length} EVT
                      </span>
                    )}
                    {dateEvents.filter(e => e.isInventorySlot).length > 0 && (
                      <span className="text-[9px] font-black text-accent-text bg-accent-background/10 px-1.5 py-0.5 rounded uppercase tracking-tighter border border-accent-background/20 shadow-sm animate-pulse">
                        {dateEvents.filter(e => e.isInventorySlot).length} SLOTS
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  {dateEvents.slice(0, 4).map(e => (
                    <div key={e.id} className={`px-2 py-0.5 rounded text-[9px] font-bold truncate border ${e.isInventorySlot ? 'border-dashed opacity-70 italic' : ''} ${getEventColor(e)}`}>
                      {e.isInventorySlot ? 'OPEN SLOT' : e.title}
                    </div>
                  ))}
                  {dateEvents.length > 4 && (
                    <div className="text-[9px] font-bold text-neutral-icon-medium pl-1">
                      + {dateEvents.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    const weekDays = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        label: `${d.toLocaleString('default', { weekday: 'short' })} ${d.getDate()}`,
        date: formatDate(d),
        isToday: d.toDateString() === new Date().toDateString()
      };
    });

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-neutral-border overflow-hidden shadow-sm">
        <div className="flex border-b border-neutral-border bg-neutral-background-weak">
          <div className="w-20 border-r border-neutral-border" />
          <div className="flex-1 grid grid-cols-7">
            {weekDays.map(day => {
              const slotCount = filteredEvents.filter(e => e.date === day.date && e.isInventorySlot).length;
              return (
                <div key={day.label} className={`p-4 text-center ${day.isToday ? 'bg-accent-background/5' : ''}`}>
                  <div className={`text-sm font-black uppercase tracking-tight ${day.isToday ? 'text-accent-text' : 'text-neutral-text'}`}>
                    {day.label}
                  </div>
                  {slotCount > 0 && (
                    <div className="mt-1 flex justify-center">
                      <span className="text-[8px] font-black bg-accent-background text-white px-1.5 py-0.5 rounded tracking-widest shadow-sm shadow-accent-background/20 animate-pulse">
                        {slotCount} SLOTS OPEN
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto sui-hide-scrollbar flex">
          <div className="w-20 border-r border-neutral-border bg-neutral-background-weak">
            {HOURS.map(hour => (
              <div key={hour} className="h-24 p-2 text-[10px] font-bold text-neutral-icon-medium text-right uppercase">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7 relative">
            {weekDays.map((day, i) => (
              <div key={i} className="border-r border-neutral-border/30 relative flex flex-col"
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggedEvent) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    const slotHeight = rect.height / HOURS.length;
                    const slotIndex = Math.floor(y / slotHeight);
                    const hour = HOURS[slotIndex] || HOURS[0];
                    setDropIndicator({ hour, date: day.date });
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedEvent) {
                    // Calculate the time based on drop position
                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    const slotHeight = rect.height / HOURS.length;
                    const slotIndex = Math.floor(y / slotHeight);
                    const hour = HOURS[slotIndex] || HOURS[0];
                    const newStartTime = `${hour.toString().padStart(2, '0')}:00`;
                    setEvents(events.map(ev => {
                      if (ev.id === draggedEvent.id) {
                        return { ...ev, startTime: newStartTime, date: day.date };
                      }
                      return ev;
                    }));
                    setDraggedEvent(null);
                    setDropIndicator(null);
                  }
                }}
              >
                {HOURS.map(hour => (
                  <div key={hour} className="h-24 border-b border-neutral-border/30 flex flex-col relative">
                    {dropIndicator && dropIndicator.hour === hour && dropIndicator.date === day.date && (
                      <div className="absolute inset-0 bg-accent-background/20 z-10 pointer-events-none" />
                    )}
                    <div
                      className="flex-1 hover:bg-accent-background/5 transition-colors"
                      onMouseDown={() => handleMouseDown('Week', { date: day.date, hour, half: 0 })}
                      onMouseEnter={() => handleMouseEnter({ hour, half: 0 })}
                    />
                    <div
                      className="flex-1 hover:bg-accent-background/5 transition-colors border-t border-dashed border-neutral-border/10"
                      onMouseDown={() => handleMouseDown('Week', { date: day.date, hour, half: 1 })}
                      onMouseEnter={() => handleMouseEnter({ hour, half: 1 })}
                    />
                  </div>
                ))}
                {getDayDragOverlay(day.date)}
                {filteredEvents.filter(e => e.date === day.date).map(e => {
                  const pos = calculateVerticalPosition(e.startTime, e.duration);
                  return (
                    <div
                      key={e.id}
                      draggable={!e.isBlackout}
                      onDragStart={(ev) => {
                        if (!e.isBlackout) {
                          setDraggedEvent(e);
                          ev.dataTransfer.effectAllowed = 'move';
                        }
                      }}
                      onDragEnd={() => {
                        setDraggedEvent(null);
                        setDropIndicator(null);
                      }}
                      className={`absolute left-0.5 right-0.5 p-1 rounded border text-[8px] font-bold shadow-sm z-10 overflow-hidden ${e.isBlackout ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'} ${getEventColor(e)}`}
                      style={{ top: pos.top, height: pos.height }}
                    >
                      <div className="truncate uppercase">{e.title}</div>
                      <div className="opacity-70">{e.startTime}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayStr = formatDate(selectedDate);
    const dayEvents = filteredEvents.filter(e => e.date === dayStr);

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-neutral-border overflow-hidden shadow-sm">
        <div className="flex border-b border-neutral-border bg-neutral-background-weak">
          <div className="w-20 border-r border-neutral-border p-4 text-xs font-bold text-neutral-text-medium uppercase tracking-widest">Time</div>
          <div className="flex-1 p-4 text-sm font-bold text-accent-text">{selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div className="flex-1 overflow-y-auto sui-hide-scrollbar flex">
          <div className="w-20 border-r border-neutral-border bg-neutral-background-weak">
            {HOURS.map(hour => (
              <div key={hour} className="h-40 p-3 text-xs font-bold text-neutral-icon-medium text-right uppercase">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
            ))}
          </div>
          <div className="flex-1 relative bg-white flex flex-col"
            onDragOver={(e) => {
              e.preventDefault();
              if (draggedEvent) {
                const rect = e.currentTarget.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const slotHeight = rect.height / HOURS.length;
                const slotIndex = Math.floor(y / slotHeight);
                const hour = HOURS[slotIndex] || HOURS[0];
                setDropIndicator({ hour });
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedEvent) {
                // Calculate the time based on drop position
                const rect = e.currentTarget.getBoundingClientRect();
                const y = e.clientY - rect.top;
                const slotHeight = rect.height / HOURS.length;
                const slotIndex = Math.floor(y / slotHeight);
                const hour = HOURS[slotIndex] || HOURS[0];
                const newStartTime = `${hour.toString().padStart(2, '0')}:00`;
                setEvents(events.map(ev => {
                  if (ev.id === draggedEvent.id) {
                    return { ...ev, startTime: newStartTime, date: dayStr };
                  }
                  return ev;
                }));
                setDraggedEvent(null);
                setDropIndicator(null);
              }
            }}
          >
            {HOURS.map(hour => (
              <div key={hour} className="h-40 border-b border-neutral-border/30 relative flex flex-col">
                {dropIndicator && dropIndicator.hour === hour && (
                  <div className="absolute inset-0 bg-accent-background/20 z-10 pointer-events-none" />
                )}
                <div
                  className="flex-1 hover:bg-accent-background/5 transition-colors relative"
                  onMouseDown={() => handleMouseDown('Day', { date: dayStr, hour, half: 0 })}
                  onMouseEnter={() => handleMouseEnter({ hour, half: 0 })}
                >
                  <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-neutral-border/10 pointer-events-none" />
                </div>
                <div
                  className="flex-1 hover:bg-accent-background/5 transition-colors"
                  onMouseDown={() => handleMouseDown('Day', { date: dayStr, hour, half: 1 })}
                  onMouseEnter={() => handleMouseEnter({ hour, half: 1 })}
                />
              </div>
            ))}
            {getDayDragOverlay(dayStr)}
            {dayEvents.map(e => {
              const pos = calculateVerticalPosition(e.startTime, e.duration);
              return (
                <div
                  key={e.id}
                  draggable={!e.isBlackout}
                  onDragStart={(ev) => {
                    if (!e.isBlackout) {
                      setDraggedEvent(e);
                      ev.dataTransfer.effectAllowed = 'move';
                    }
                  }}
                  onDragEnd={() => {
                    setDraggedEvent(null);
                    setDropIndicator(null);
                  }}
                  className={`absolute left-2 right-2 p-2 rounded border text-[10px] font-bold shadow-sm z-10 overflow-hidden ${e.isBlackout ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'} ${getEventColor(e)}`}
                  style={{ top: pos.top, height: pos.height }}
                >
                  <div className="font-bold truncate">{e.title}</div>
                  <div className="text-[9px] opacity-70">{e.startTime} - {addMinutes(e.startTime, e.duration)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const grouped = filteredEvents.reduce((acc, ev) => {
      (acc[ev.date] = acc[ev.date] || []).push(ev);
      return acc;
    }, {} as Record<string, Event[]>);

    return (
      <div className="flex-1 overflow-auto bg-white rounded-xl border border-neutral-border shadow-sm hide-scrollbar">
        <table className="w-full border-spacing-0 border-separate text-sm">
          <thead className="bg-neutral-background-weak sticky top-0 z-20">
            <tr>
              <th className="p-3 text-left font-bold border-b border-neutral-border w-[120px]">Time</th>
              <th className="p-3 text-left font-bold border-b border-neutral-border">Event</th>
              <th className="p-3 text-left font-bold border-b border-neutral-border">Venue / Field</th>
              <th className="p-3 text-right font-bold border-b border-neutral-border pr-6 w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).sort().map(([date, evs]: [string, Event[]]) => [
              <tr key={date} className="sticky top-[45px] z-10">
                <td colSpan={4} className="bg-neutral-background-weak/80 backdrop-blur-sm border-b border-neutral-border px-4 py-2 font-black text-neutral-text text-[11px] uppercase tracking-widest">
                  {new Date(date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>,
              ...evs.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(ev => (
                <tr key={ev.id} className="hover:bg-neutral-background-weak transition-colors group">
                  <td className="p-4 align-top tabular-nums font-bold text-neutral-text-medium border-b border-neutral-border/50">
                    {ev.startTime}
                  </td>
                  <td className="p-4 align-top border-b border-neutral-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${ev.type === 'Game' ? 'bg-accent-background' : ev.type === 'Practice' ? 'bg-orange-500' : 'bg-neutral-icon'}`} />
                      <div>
                        <p className="font-bold text-neutral-text uppercase tracking-tight">{ev.title}</p>
                        <p className="text-[10px] font-black text-neutral-text-medium uppercase opacity-60 tracking-tighter">{ev.type} · {ev.duration} min</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-top border-b border-neutral-border/50">
                    <p className="font-bold text-neutral-text uppercase tracking-tight">{venueData.find(v => v.id === ev.venueId)?.name}</p>
                    <p className="text-[10px] font-black text-neutral-text-medium uppercase opacity-60 tracking-tighter">{venueData.find(v => v.id === ev.venueId)?.fields.find(f => f.id === ev.fieldId)?.name}</p>
                  </td>
                  <td className="p-4 align-top text-right border-b border-neutral-border/50 pr-4">
                    <button className="p-2 rounded-lg hover:bg-neutral-border-weak text-neutral-icon-medium transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ])}
          </tbody>
        </table>
      </div>
    );
  };

  const renderVenueGrid = () => (
    <div className="flex-1 overflow-auto sui-hide-scrollbar border border-neutral-border rounded-xl shadow-sm bg-neutral-background-weak">
      <div className="min-w-fit">
        <div className="flex sticky top-0 z-40 bg-white border-b border-neutral-border shadow-sm">
          <div className="w-56 pl-4 py-4 flex items-center bg-neutral-background-weak/50">
            <span className="text-[10px] font-black text-neutral-text-medium uppercase tracking-[0.2em] whitespace-nowrap">Venue / Sub-venue</span>
          </div>
          <div className="flex flex-1 border-l border-neutral-border">
            {HOURS.map(hour => (
              <div key={hour} className="flex-1 min-w-[120px] p-4 text-center border-r border-neutral-border group hover:bg-neutral-background-weak transition-colors">
                <span className="text-sm font-bold text-neutral-text tabular-nums uppercase">
                  {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {venueData.map(venue => (
          <div key={venue.id} className="contents">
            <div className="flex sticky top-[53px] z-30 bg-neutral-background-medium border-b border-neutral-border">
              <div className="w-56 pl-4 py-2.5 flex items-center gap-2 bg-neutral-background-medium backdrop-blur-md">
                <div className="w-5 h-5 rounded bg-neutral-text text-white flex items-center justify-center">
                  <MapPin className="w-3 h-3" />
                </div>
                <span className="font-black text-neutral-text uppercase text-[11px] tracking-tight">{venue.name}</span>
                <span className="text-[9px] text-neutral-text-medium ml-auto font-black px-1.5 py-0.5 rounded bg-white/50 border border-neutral-border/30">{venue.fields.length}F</span>
              </div>
              <div className="flex-1 bg-neutral-background-medium/20 border-l border-neutral-border" />
            </div>

            {venue.fields.map(field => {
              const util = calculateUtilization(field.id);
              return (
                <div key={field.id} className="flex gap-0 border-b border-neutral-border group min-h-[64px] bg-white">
                  <div className="w-56 pl-4 py-2.5 flex flex-col justify-center gap-1 group-hover:bg-neutral-background-weak transition-colors relative">
                    <span className="font-bold text-neutral-text text-[13px] leading-tight truncate">{field.name}</span>
                    <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                      {field.compatibility.map(c => (
                        <span key={c} className="text-[8px] px-1 py-0.5 rounded bg-neutral-background-medium text-neutral-text-medium font-bold tabular-nums">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex relative bg-white group-hover:bg-neutral-background-weak/10 transition-colors cursor-crosshair border-l border-neutral-border" onMouseLeave={() => !isDragging && setDragStart(null)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (draggedEvent) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const slotWidth = rect.width / HOURS.length;
                        const slotIndex = Math.floor(x / slotWidth);
                        const hour = HOURS[slotIndex] || HOURS[0];
                        setDropIndicator({ hour });
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedEvent) {
                        // Calculate the time based on drop position
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const slotWidth = rect.width / HOURS.length;
                        const slotIndex = Math.floor(x / slotWidth);
                        const hour = HOURS[slotIndex] || HOURS[0];
                        const newStartTime = `${hour.toString().padStart(2, '0')}:00`;
                        setEvents(events.map(ev => {
                          if (ev.id === draggedEvent.id) {
                            return { ...ev, startTime: newStartTime, venueId: venue.id, fieldId: field.id, date: formatDate(selectedDate) };
                          }
                          return ev;
                        }));
                        setDraggedEvent(null);
                        setDropIndicator(null);
                      }
                    }}
                  >
                    {HOURS.map(hour => (
                      <div key={hour} className="flex-1 min-w-[120px] border-r border-neutral-border/50 last:border-r-0 relative flex">
                        {dropIndicator && dropIndicator.hour === hour && (
                          <div className="absolute inset-0 bg-accent-background/20 z-10 pointer-events-none" />
                        )}
                        <div
                          className="flex-1 h-full hover:bg-accent-background/5 transition-colors"
                          onMouseDown={() => handleMouseDown('Venue', { id: field.id, hour, half: 0 })}
                          onMouseEnter={() => handleMouseEnter({ hour, half: 0 })}
                        />
                        <div
                          className="flex-1 h-full border-l border-dashed border-neutral-border/30 hover:bg-accent-background/5 transition-colors"
                          onMouseDown={() => handleMouseDown('Venue', { id: field.id, hour, half: 1 })}
                          onMouseEnter={() => handleMouseEnter({ hour, half: 1 })}
                        />
                      </div>
                    ))}
                    {dragStart?.viewType === 'Venue' && dragStart.id === field.id && dragStart.hour !== undefined && dragEnd?.hour !== undefined && (
                      (() => {
                        const startTotal = (dragStart.hour ?? 0) * 60 + (dragStart.half ?? 0) * 30;
                        const endTotal = (dragEnd.hour ?? 0) * 60 + (dragEnd.half ?? 0) * 30;
                        const actualStart = Math.min(startTotal, endTotal);
                        const actualEnd = Math.max(startTotal, endTotal) + 30;
                        const startOffset = actualStart - 8 * 60;
                        const duration = actualEnd - actualStart;
                        const left = (startOffset / (HOURS.length * 60)) * 100;
                        const width = (duration / (HOURS.length * 60)) * 100;
                        return (
                          <div
                            className="absolute top-1 bottom-1 bg-accent-background/20 border-2 border-accent-background border-dashed rounded-md z-20 pointer-events-none flex items-center justify-center"
                            style={{ left: `${left}%`, width: `${width}%` }}
                          >
                            <div className="bg-accent-background text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-widest animate-pulse">
                              Blocking Slot...
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {filteredEvents
                      .filter(e => e.venueId === venue.id && e.fieldId === field.id && e.date === formatDate(selectedDate))
                      .map(event => {
                        const pos = calculatePosition(event.startTime, event.duration);
                        const isConflicted = hasConflict(event);
                        return (
                          <div
                            key={event.id}
                            draggable={!event.isBlackout}
                            onDragStart={(e) => {
                              if (!event.isBlackout) {
                                setDraggedEvent(event);
                                e.dataTransfer.effectAllowed = 'move';
                              }
                            }}
                            onDragEnd={() => {
                              setDraggedEvent(null);
                              setDropIndicator(null);
                            }}
                            className={`absolute top-1 bottom-1 p-1.5 rounded-md border text-[10px] font-bold shadow-sm flex flex-col justify-between overflow-hidden transition-all hover:z-30 hover:scale-[1.01] 
                            ${event.isBlackout ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
                            ${getEventColor(event)} 
                            ${event.isDraft ? 'opacity-90 ring-2 ring-accent-background/50' : ''}`}
                            style={{ left: pos.left, width: pos.width }}
                          >
                            <div className="flex justify-between items-start gap-1">
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1 leading-none mb-1">
                                  {event.isBlackout ? (
                                    <div className="flex items-center gap-1.5">
                                      <Lock className="w-2.5 h-2.5 text-red-400" />
                                      <span className="truncate uppercase tracking-tighter text-white">{event.title}</span>
                                    </div>
                                  ) : event.isInventorySlot ? (
                                    <div className="flex items-center gap-1.5">
                                      <Layout className="w-2.5 h-2.5" />
                                      <span className="truncate uppercase tracking-tighter italic opacity-60">OPEN {event.type} SLOT</span>
                                    </div>
                                  ) : (
                                    <>
                                      {event.isDraft && <Zap className="w-2.5 h-2.5 text-accent-background fill-accent-background" />}
                                      <span className="truncate uppercase tracking-tighter">{event.title}</span>
                                    </>
                                  )}
                                </div>
                                {isConflicted && !event.isInventorySlot && !event.isBlackout && (
                                  <span className="text-[8px] text-red-600 flex items-center gap-0.5 font-black">
                                    <AlertCircle className="w-2.5 h-2.5" />
                                    CONFLICT
                                  </span>
                                )}
                              </div>
                            </div>
                            {!event.isBlackout && (
                              <div className={`mt-auto text-[9px] tabular-nums pt-0.5 flex justify-between ${event.isInventorySlot ? 'border-t border-neutral-border/50 text-[8px] opacity-40' : 'border-t border-black/5'}`}>
                                <span>{event.startTime} - {addMinutes(event.startTime, event.duration)}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  );



  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}, ${end.getFullYear()}`;
  };

  const handlePrev = () => {
    const newDate = new Date(selectedDate);
    if (activeTab === 'Calendar') {
      if (calendarViewMode === 'Month') newDate.setMonth(selectedDate.getMonth() - 1);
      else if (calendarViewMode === 'Week') newDate.setDate(selectedDate.getDate() - 7);
      else newDate.setDate(selectedDate.getDate() - 1);
    } else {
      newDate.setDate(selectedDate.getDate() - 1);
    }
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    if (activeTab === 'Calendar') {
      if (calendarViewMode === 'Month') newDate.setMonth(selectedDate.getMonth() + 1);
      else if (calendarViewMode === 'Week') newDate.setDate(selectedDate.getDate() + 7);
      else newDate.setDate(selectedDate.getDate() + 1);
    } else {
      newDate.setDate(selectedDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden p-6 gap-6" onMouseUp={handleMouseUp}>
      {renderConfigSheet()}
      {renderManageSheet()}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-neutral-text tracking-tight uppercase">Schedules</h1>
          <div className="mt-4">
            {/* Tabs */}
            <div className="relative mb-4">
              <div className="flex border-b border-neutral-border">
                <button
                  onClick={() => setActiveTab('All Events')}
                  className={`px-6 py-3 text-label font-semibold transition-all relative ${activeTab === 'All Events'
                      ? 'text-admin-action-text'
                      : 'text-neutral-text-medium hover:text-admin-action-text'
                    }`}
                >
                  All Events
                  {activeTab === 'All Events' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('Calendar')}
                  className={`px-6 py-3 text-label font-semibold transition-all relative ${activeTab === 'Calendar'
                      ? 'text-admin-action-text'
                      : 'text-neutral-text-medium hover:text-admin-action-text'
                    }`}
                >
                  Calendar
                  {activeTab === 'Calendar' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('Venue')}
                  className={`px-6 py-3 text-label font-semibold transition-all relative ${activeTab === 'Venue'
                      ? 'text-admin-action-text'
                      : 'text-neutral-text-medium hover:text-admin-action-text'
                    }`}
                >
                  Venue
                  {activeTab === 'Venue' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsManageSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border rounded-lg text-sm font-bold text-neutral-text hover:bg-neutral-background-medium transition-colors uppercase tracking-tight shadow-sm"
          >
            <Settings className="w-4 h-4" />
            Manage
          </button>
          
          <DD right w={230} trigger={
            <button className="flex items-center gap-2 px-6 py-2 bg-accent-background text-white rounded-lg text-sm font-bold hover:bg-accent-background/90 transition-all shadow-md shadow-accent-background/20 uppercase tracking-tight">
              <Plus className="w-5 h-5" strokeWidth={3} />
              <span>ADD EVENT</span>
            </button>
          }>
            <DDLbl>Auto-schedule</DDLbl>
            <DDItem hi onClick={() => setOverlay("wizard-new")}>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-accent-text" fill="currentColor" />
                <span className="font-bold text-accent-text text-xs">Create game schedule</span>
              </div>
            </DDItem>
            <DDItem onClick={() => setOverlay("wizard-edit")}>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-neutral-icon" />
                <span className="text-xs">Edit existing schedule</span>
              </div>
            </DDItem>
            <DDSep />
            <DDLbl>Add individually</DDLbl>
            <DDItem onClick={() => alert("Add game")}>Add game</DDItem>
            <DDItem onClick={() => alert("Add practice")}>Add practice</DDItem>
            <DDItem onClick={() => alert("Add other event")}>Add other event</DDItem>
            <DDSep />
            <DDLbl>Import</DDLbl>
            <DDItem onClick={() => alert("Import games")}>Import games</DDItem>
            <DDItem onClick={() => alert("Import practices")}>Import practices</DDItem>
          </DD>
        </div>
      </div>

      {overlay && createPortal(
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <WizardPanel mode={overlay === "wizard-new" ? "new" : "edit"} onClose={() => setOverlay(null)} onDone={() => setOverlay(null)} />
        </div>,
        document.body
      )}

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-xl border border-neutral-border shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-neutral-background-weak rounded-lg p-1 border border-neutral-border/50">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-5 flex items-center gap-3 min-w-[220px] justify-center">
                <CalendarIcon className="w-4 h-4 text-accent-text" />
                <span className="text-sm font-black text-neutral-text uppercase tracking-tight">
                  {activeTab === 'Calendar' 
                    ? (calendarViewMode === 'Month' ? getMonthName(selectedDate) :
                        calendarViewMode === 'Week' ? getWeekRange(selectedDate) :
                          selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }))
                    : selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                  }
                </span>
              </div>
              <button
                onClick={handleNext}
                className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 text-xs font-black text-accent-text hover:bg-accent-background/5 rounded-lg transition-colors uppercase tracking-widest border border-accent-background/20"
            >
              Today
            </button>

            {/* Month/Week/Day view controls in same row as date changer */}
            {activeTab === 'Calendar' && (
              <div className="flex p-1 bg-neutral-border-weak/30 rounded-lg border border-neutral-border w-fit">
                {(['Month', 'Week', 'Day'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setCalendarViewMode(mode)}
                    className={`px-4 py-2 text-[10px] font-black rounded-md transition-all uppercase ${calendarViewMode === mode ? 'bg-white shadow-sm text-accent-text' : 'text-neutral-text-medium hover:text-neutral-text'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative flex items-center">
            <select
              value={filterDivision}
              onChange={(e) => setFilterDivision(e.target.value)}
              className="appearance-none flex items-center gap-1.5 px-4 py-1.5 pl-[32px] pr-8 rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border text-label font-semibold transition-colors bg-white cursor-pointer outline-none focus:border-admin-action-border shadow-none"
            >
              <option value="All Divisions">Divisions</option>
              {ALL_DIVISIONS.map(d => <option key={d} value={d}>{d} Division</option>)}
            </select>
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
          </div>

          <div className="relative flex items-center">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none flex items-center gap-1.5 px-4 py-1.5 pl-[32px] pr-8 rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border text-label font-semibold transition-colors bg-white cursor-pointer outline-none focus:border-admin-action-border shadow-none"
            >
              <option value="All Types">Event type</option>
              <option value="Game">Game</option>
              <option value="Practice">Practice</option>
              <option value="Other">Other</option>
            </select>
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
          </div>

          <div className="relative flex items-center">
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="appearance-none flex items-center gap-1.5 px-4 py-1.5 pl-[32px] pr-8 rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border text-label font-semibold transition-colors bg-white cursor-pointer outline-none focus:border-admin-action-border shadow-none"
            >
              <option value="All Teams">Teams</option>
              {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium pointer-events-none" />
          </div>

          {(filterDivision !== 'All Divisions' || filterType !== 'All Types' || filterTeam !== 'All Teams' || searchQuery !== '') && (
            <button
              onClick={() => {
                setFilterDivision('All Divisions');
                setFilterType('All Types');
                setFilterTeam('All Teams');
                setSearchQuery('');
              }}
              className="ml-auto text-xs font-black text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <Plus className="w-3 h-3 rotate-45" />
              Reset Filters
            </button>
          )}

          {/* Conflict notifier in filter area */}
          {events.some(hasConflict) && (
            <div className="flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-xl ml-4">
              <div className="w-6 h-6 rounded-full bg-red-500 grid place-items-center shadow-sm">
                <AlertCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-[9px] text-red-500/70 font-black uppercase tracking-widest leading-none mb-0.5">Attention Required</p>
                <span className="text-xs font-black text-red-500 uppercase tracking-tight">{filteredEvents.length} VENUE CONFLICTS</span>
              </div>
              <button
                onClick={() => setIsConflictModalOpen(true)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
              >
                VIEW & RESOLVE
              </button>
            </div>
          )}
        </div>

        {activeTab === 'All Events' ? renderListView() : 
         activeTab === 'Venue' ? renderVenueGrid() : (
          calendarViewMode === 'Month' ? renderMonthView() :
            calendarViewMode === 'Week' ? renderWeekView() :
              renderDayView()
        )}
        {renderConflictModal()}
      </div>
    </div>
  );
}

// --- Helper Components for Dropdown ---
const G100 = "#f1f1f1", G200 = "#e4e4e4", G300 = "#d1d1d1", G400 = "#a3a3a3", G700 = "#404040";

function DD({ trigger, children, right = false, w = 190 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const close = () => setOpen(false);
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div style={{ position: "absolute", [right ? "right" : "left"]: 0, top: "calc(100% + 4px)", background: "#fff", border: `1px solid ${G200}`, borderRadius: 12, boxShadow: "0 8px 28px rgba(0,0,0,.15)", zIndex: 100, minWidth: w, overflow: "hidden", padding: "4px 0" }}>
          {children && React.Children.map(children, c => c && typeof c === "object" ? React.cloneElement(c as React.ReactElement, { _close: close }) : c)}
        </div>
      )}
    </div>
  );
}

function DDLbl({ children }) { return <div style={{ padding: "8px 16px 4px", fontSize: 10, fontWeight: 800, color: G400, textTransform: "uppercase", letterSpacing: ".08em" }}>{children}</div>; }

function DDItem({ children, onClick, hi = false, _close }: any) {
  return (
    <div
      onClick={() => { onClick?.(); _close?.(); }}
      style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: hi ? "#000" : G700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
      onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </div>
  );
}

function DDSep() { return <div style={{ height: 1, background: G100, margin: "4px 0" }} />; }
