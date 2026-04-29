import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="gap-1 shadow-sm bg-neutral-background-weak border-b border-neutral-border sticky top-0 z-40 px-4 py-3 items-center justify-between flex">
      <div>
        <p className="text-heading-md font-bold">{title}</p>
      </div>
      <div className="ml-auto">
        <div className="flex gap-2 items-center">
          <button 
            className="place-content-center active:scale-95 text-admin-action-text hover:border-admin-action-border hover:bg-admin-action-background-weak-hover active:bg-admin-action-background-weak-pressed min-w-[32px] w-[48px] h-[48px] rounded-full border border-neutral-border grid" 
            type="button"
          >
            <HelpCircle className="w-5 h-5 mx-auto" />
          </button>
          <button type="button">
            <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-neutral-background-medium border border-neutral-border hover:bg-admin-action-background hover:text-white transition-colors font-bold text-sm">
              <span>TP</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
