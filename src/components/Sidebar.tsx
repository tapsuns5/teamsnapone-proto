import React from 'react';
import {
  LayoutGrid,
  BookOpen,
  CreditCard,
  MessageSquare,
  Users,
  Settings,
  ChevronDown,
  ChevronLeft,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { name: 'Registrations', route: '/registrations', icon: LayoutGrid },
  { name: 'Programs', route: '/programs', icon: BookOpen },
  { name: 'Financials', route: '/financials', icon: CreditCard },
  { name: 'Schedule', route: '/schedule', icon: CalendarIcon },
  {
    name: 'Communications',
    icon: MessageSquare,
    hasSubmenu: true,
    subItems: [
      { name: 'Team Chats', route: '/teamchats' },
      { name: 'Messages', route: '/messages' }
    ]
  },
  { name: 'Rostering', route: '/rostering', icon: Users },
  { name: 'Settings', route: '/settings', icon: Settings },
];

interface SidebarProps {
  activeItem: string;
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['Communications']);
  const navigate = useNavigate();

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev =>
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-neutral-background-weak h-screen border-r border-neutral-border relative w-[250px] transition-all group">
        <button
          type="button"
          className="rounded-full border border-neutral-border bg-white h-4 w-4 grid place-items-center absolute top-[20px] right-[-8px] z-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
        >
          <ChevronLeft className="w-3 h-3 text-neutral-icon-medium" />
        </button>

        <div className="flex flex-col h-screen">
          {/* Org Header */}
          <div className="px-1 pt-5 md:pt-2 mb-3">
            <button className="py-2 px-1 rounded-lg border border-transparent hover:bg-neutral-background-medium hover:border-neutral-border flex flex-col gap-2 items-center w-full px-2">
              <figure className="rounded-full overflow-hidden h-[80px] w-[80px] min-h-[80px] min-w-[80px] grid place-items-center border-none">
                <img
                  className="w-full"
                  alt="Tyler Palmer logo"
                  src="https://org.teamsnap.com/images/ts-one-logo.svg"
                  referrerPolicy="no-referrer"
                />
              </figure>
              <p className="text-display-sm font-semibold text-center">Tyler Palmer</p>
              <ChevronDown className="w-4 h-4 text-neutral-icon-medium mx-auto" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto sui-hide-scrollbar">
            <ul className="grid gap-1 px-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`group w-full px-3 h-[56px] lg:py-2 font-semibold flex items-center gap-2 rounded-md transition-colors cursor-pointer ${activeItem === item.name || item.subItems?.some(s => s.name === activeItem)
                          ? 'text-neutral-text'
                          : 'text-neutral-text hover:bg-accent-background-weak focus:bg-accent-background-weak'
                          }`}
                      >
                        <item.icon className={`w-5 h-5 text-neutral-icon-medium`} />
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${expandedMenus.includes(item.name) ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedMenus.includes(item.name) && (
                        <ul className="grid gap-1 mt-1">
                          {item.subItems?.map(sub => (
                            <li key={sub.name}>
                              <button
                                onClick={() => navigate(sub.route)}
                                className={`w-full pl-10 pr-3 h-[48px] font-semibold flex items-center rounded-md transition-colors cursor-pointer ${activeItem === sub.name
                                  ? 'bg-sidebar-active text-white'
                                  : 'text-neutral-text hover:bg-accent-background-weak'
                                  }`}
                              >
                                {sub.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => navigate(item.route as string)}
                      className={`group w-full px-3 h-[56px] lg:py-2 font-semibold flex items-center gap-2 rounded-md transition-colors cursor-pointer ${activeItem === item.name
                        ? 'bg-sidebar-active text-white'
                        : 'text-neutral-text hover:bg-accent-background-weak focus:bg-accent-background-weak'
                        }`}
                    >
                      <item.icon className={`w-5 h-5 ${activeItem === item.name ? 'text-white' : 'text-neutral-icon-medium'}`} />
                      <span className="flex-1 text-left">{item.name}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Logo */}
          <div className="p-4 mt-auto border-t border-neutral-border/50">
            <figure className="w-[140px] mx-auto">
              <img
                src="https://org.teamsnap.com/images/ts-one-logo.svg"
                alt="TeamSnap One logo"
                className="w-full transition-all cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
