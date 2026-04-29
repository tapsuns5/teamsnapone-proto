import React from 'react';
import { Search, Filter, MessageSquare, Settings, Volume2, VolumeX, X, Send, Plus, MoreHorizontal, User, Smile, Reply, Trash2 } from 'lucide-react';

const joinedChats = [
  {
    id: '1',
    teamName: "13U - AA",
    programName: "2025-26 Travel Program | 13",
    lastMessage: "This is a test message",
    date: "Last Friday",
    icon: "🏀",
    color: "bg-orange-100"
  },
  {
    id: '2',
    teamName: "Red",
    programName: "2025 Winter Basketball | 6-7",
    lastMessage: "Happening now - Game vs. Blue",
    date: "11/06/2025",
    icon: "🏀",
    color: "bg-orange-100",
    statusColor: "text-rose-600",
    active: true
  }
];

const otherChats = [
  {
    id: '3',
    teamName: "Varsity",
    programName: "Lacrosse | No Division",
    icon: "🥍",
    color: "bg-blue-100"
  },
  {
    id: '4',
    teamName: "JV",
    programName: "Lacrosse | No Division",
    icon: "🥍",
    color: "bg-blue-100"
  },
  {
    id: '5',
    teamName: "Bears",
    programName: "NFL Flag | 8U",
    icon: "🏈",
    color: "bg-orange-100"
  }
];

const initialMembers = [
  { id: 'm1', name: 'Sarah Johnson', role: 'COACH', initials: 'SJ', color: 'bg-teal-600', muted: false },
  { id: 'm2', name: 'Mike Thompson', role: 'PARENT', initials: 'MT', color: 'bg-purple-600', muted: false },
  { id: 'm3', name: 'Lisa Chen', role: 'PARENT', initials: 'LC', color: 'bg-rose-600', muted: true },
  { id: 'm4', name: 'David Wilson', role: 'PARENT', initials: 'DW', color: 'bg-indigo-600', muted: false },
  { id: 'm5', name: 'Jennifer Adams', role: 'PARENT', initials: 'JA', color: 'bg-amber-600', muted: false },
  { id: 'm6', name: 'Emily Palmer', role: 'PARENT', initials: 'EP', color: 'bg-blue-600', muted: false },
];

const initialMessages = [
  {
    id: 'msg1',
    senderId: 'm1',
    senderName: 'Sarah Johnson',
    initials: 'SJ',
    color: 'bg-teal-600',
    text: 'Thanks for the heads up! See you all there.',
    timestamp: '10/21/2025',
    isDeleted: false
  },
  {
    id: 'msg2',
    senderId: 'm6',
    senderName: 'Emily Palmer',
    initials: 'EP',
    color: 'bg-blue-600',
    text: 'Hi',
    timestamp: '04/03/2026',
    isDeleted: false
  }
];

export default function TeamChatsDashboard() {
  const [activeChatId, setActiveChatId] = React.useState('2');
  const [showSettings, setShowSettings] = React.useState(false);
  const [members, setMembers] = React.useState(initialMembers);
  const [messages, setMessages] = React.useState(initialMessages);
  const [chatEnabled, setChatEnabled] = React.useState(true);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  const toggleMute = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, muted: !m.muted } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, isDeleted: true } : msg));
    setOpenMenuId(null);
  };

  const activeChat = joinedChats.find(c => c.id === activeChatId) || joinedChats[0];

  return (
    <div className="md:px-3 lg:px-4 mx-auto sm:py-4 px-0 sm:px-4 h-[calc(100vh-65px)] sm:h-[calc(100vh-140px)] font-sans">
      <section className="bg-white overflow-hidden flex shadow-sm relative h-full rounded-2xl border border-neutral-border">
        {/* Left Pane - Chat List */}
        <nav className="hidden md:flex w-[40%] max-w-[350px] h-full flex-col border-r border-neutral-border bg-white">
          <div className="text-[17px] font-bold px-4 py-4 border-b border-neutral-border text-neutral-text">Team Chats</div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search and Filter */}
            <div className="flex gap-2 px-4 py-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-neutral-background-medium/30 border border-neutral-border rounded-xl focus:outline-none focus:bg-white focus:border-admin-action-border transition-all text-[15px]"
                />
              </div>
              <button className="p-2.5 rounded-xl text-neutral-icon-medium hover:bg-neutral-background-medium/50 transition-colors border border-neutral-border">
                <Filter className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Joined Chats Section */}
              <div className="px-4 py-2 text-[11px] font-bold text-neutral-icon-medium uppercase tracking-wider">
                Joined Team Chats
              </div>
              
              {joinedChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full p-4 border-l-4 cursor-pointer transition-all ${
                    activeChatId === chat.id 
                      ? 'bg-admin-action-background-light border-admin-action-border' 
                      : 'border-transparent hover:bg-neutral-background-medium/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center text-2xl shadow-sm border border-black/5`}>
                      {chat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h3 className={`text-[15px] font-bold truncate ${activeChatId === chat.id ? 'text-admin-action-text' : 'text-neutral-text'}`}>
                          {chat.teamName}
                        </h3>
                        <span className="text-[11px] text-neutral-icon-medium whitespace-nowrap ml-2">{chat.date}</span>
                      </div>
                      <p className="text-[13px] text-neutral-text-medium truncate mb-1">{chat.programName}</p>
                      <p className={`text-[12px] truncate font-medium ${chat.statusColor || (activeChatId === chat.id ? 'text-admin-action-text' : 'text-neutral-icon-medium')}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Other Chats Section */}
              <div className="px-4 py-2 mt-4 text-[11px] font-bold text-neutral-icon-medium uppercase tracking-wider">
                Other Team Chats
              </div>
              {otherChats.map((chat) => (
                <div
                  key={chat.id}
                  className="w-full p-4 hover:bg-neutral-background-medium/20 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${chat.color} flex items-center justify-center text-2xl opacity-70`}>
                      {chat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold truncate text-neutral-text">{chat.teamName}</h3>
                      <p className="text-[13px] text-neutral-text-medium truncate">{chat.programName}</p>
                    </div>
                    <button className="text-sm font-bold text-admin-action-text hover:underline px-2 py-1">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Pane - Chat View */}
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Chat Header */}
          <header className="px-6 py-4 flex items-center justify-between border-b border-neutral-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${activeChat.color} flex items-center justify-center text-xl shadow-sm border border-black/5`}>
                {activeChat.icon}
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-neutral-text leading-tight">{activeChat.teamName}</h2>
                <p className="text-[12px] text-neutral-text-medium">{activeChat.programName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2.5 rounded-xl transition-all border ${
                  showSettings 
                    ? 'bg-neutral-background-medium border-neutral-border text-neutral-text' 
                    : 'text-neutral-icon-medium hover:bg-neutral-background-medium/50 border-neutral-border'
                }`}
              >
                <Settings className={`w-5 h-5 ${showSettings ? 'animate-spin-slow' : ''}`} />
              </button>
              <button className="px-4 py-2 text-[14px] font-bold text-admin-action-text hover:bg-admin-action-background-light rounded-xl transition-colors border border-admin-action-border whitespace-nowrap">
                Leave team chat
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-8 bg-[#f8f9fb] transition-opacity duration-300 ${!chatEnabled ? 'opacity-40 pointer-events-none grayscale-[20%]' : 'opacity-100'}`}>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-neutral-border"></div>
              <div className="text-[12px] font-bold text-neutral-text-medium tracking-wide">
                10/21/2025
              </div>
            </div>

            {/* Practice Reminder Node */}
            <div className="max-w-[340px] mx-auto bg-amber-50 rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-amber-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                   <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Practice</span>
                 </div>
                 <span className="text-[11px] font-medium text-amber-600">TIME & LOCATION</span>
              </div>
              <div className="p-4 flex gap-4">
                <div className="text-center min-w-[60px]">
                  <div className="text-[11px] font-bold text-neutral-text-medium uppercase">Thu</div>
                  <div className="text-2xl font-black text-neutral-text">10/23</div>
                </div>
                <div>
                  <div className="font-bold text-[15px] text-neutral-text pb-1">Practice</div>
                  <div className="text-[13px] text-neutral-text-medium">1:30 PM – 2:30 PM</div>
                  <div className="text-[13px] text-neutral-text-medium">Kanata Youth Centre</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-100/30 border-t border-amber-100 flex justify-end">
                <button className="text-[12px] font-bold text-admin-action-text hover:underline">VIEW EVENT</button>
              </div>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className="group flex gap-3 relative">
                {msg.isDeleted ? (
                  <div className="flex-1 flex flex-col items-center py-4">
                    <div className="bg-[#f0f2f5] px-8 py-2.5 rounded-full border border-neutral-border text-[13px] text-neutral-text-medium font-medium shadow-inner">
                      This message was deleted...
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center text-[10px] text-white font-bold shrink-0`}>
                      {msg.initials}
                    </div>
                    <div className="flex flex-col gap-1 relative">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#f0f2f5] px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm border border-neutral-border max-w-[400px]">
                          <p className="text-[14px] text-neutral-text leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                        
                        {/* Hover Actions */}
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity duration-200">
                          <button className="p-2 text-neutral-icon-medium hover:bg-[#f0f2f5] rounded-full transition-colors">
                            <Smile className="w-5 h-5" />
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => setOpenMenuId(openMenuId === msg.id ? null : msg.id)}
                              className={`p-2 rounded-full transition-colors flex items-center justify-center ${openMenuId === msg.id ? 'bg-[#f0f2f5] text-neutral-text' : 'text-neutral-icon-medium hover:bg-[#f0f2f5]'}`}
                            >
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                            
                            {/* Context Menu */}
                            {openMenuId === msg.id && (
                              <div className="absolute left-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl border border-neutral-border z-10 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
                                <button className="w-full px-4 py-2 text-left text-[14px] text-neutral-text hover:bg-neutral-background-medium flex items-center gap-2 transition-colors">
                                  <Reply className="w-4 h-4" />
                                  Reply
                                </button>
                                <button 
                                  onClick={() => deleteMessage(msg.id)}
                                  className="w-full px-4 py-2 text-left text-[14px] text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium border-t border-neutral-background-medium mt-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-1">
                        <span className="text-[11px] font-bold text-neutral-text">{msg.senderName}</span>
                        <span className="text-[10px] text-neutral-text-medium">• {msg.timestamp}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Chat Settings Popover */}
          {showSettings && (
            <div className="absolute top-[80px] right-6 w-[360px] bg-white rounded-2xl shadow-2xl border border-neutral-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="px-5 py-4 flex items-center justify-between border-b border-neutral-border">
                <h3 className="font-bold text-[16px] text-neutral-text">Chat Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-neutral-background-medium rounded-lg transition-colors">
                  <X className="w-5 h-5 text-neutral-icon-medium" />
                </button>
              </div>
              
              <div className="px-5 py-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[15px] text-neutral-text mb-0.5">Enable Team Chat</h4>
                  <p className="text-[12px] text-neutral-text-medium leading-tight">Allow members to send messages in this chat</p>
                </div>
                <button 
                  onClick={() => setChatEnabled(!chatEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${chatEnabled ? 'bg-admin-action-background-strong' : 'bg-neutral-background-medium'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${chatEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="bg-neutral-background-medium/30 px-5 py-2 text-[11px] font-bold text-neutral-icon-medium uppercase tracking-wider">
                Team Members
              </div>

              <div className="max-h-[350px] overflow-y-auto">
                {members.map((member) => (
                  <div key={member.id} className="px-5 py-3 flex items-center justify-between hover:bg-neutral-background-medium/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center text-[11px] text-white font-bold`}>
                        {member.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-neutral-text">{member.name}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-neutral-background-medium text-neutral-icon-medium rounded uppercase tracking-wide">
                            {member.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleMute(member.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all border ${
                        member.muted 
                          ? 'bg-amber-100 border-amber-300 text-amber-700' 
                          : 'bg-white border-neutral-border text-neutral-text hover:bg-neutral-background-medium'
                      }`}
                    >
                      {member.muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      {member.muted ? 'Muted' : 'Mute'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Input or Disabled Notice */}
          <footer className="p-4 bg-white border-t border-neutral-border min-h-[81px] flex items-center justify-center">
            {chatEnabled ? (
              <div className="flex items-center gap-2 max-w-[900px] mx-auto w-full">
                <button className="p-2.5 text-neutral-icon-medium hover:bg-neutral-background-medium rounded-full transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message"
                    className="w-full bg-[#f0f2f5] border-none rounded-full px-6 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-admin-action-border/20 transition-all shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-icon-medium">0 / 5000</div>
                </div>
                <button className="p-2.5 bg-admin-action-background-strong text-white rounded-full hover:bg-admin-action-background-strong/90 transition-all shadow-md active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-neutral-icon-medium font-bold text-[14px] animate-in fade-in slide-in-from-bottom-2">
                <MessageSquare className="w-5 h-5" />
                Admin has disabled chat for this team
              </div>
            )}
          </footer>
        </div>
      </section>
    </div>
  );
}
