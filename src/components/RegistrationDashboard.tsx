import React, { useState } from 'react';
import { Plus, Search, Edit2, Copy, Share2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const registrations = [
  {
    id: '56991',
    name: 'Test New Registration',
    registered: 1,
    collected: 0,
    openDate: '04/01/2026',
    closeDate: '04/30/2026',
    status: 'Open'
  }
];

export default function RegistrationDashboard() {
  const [activeTab, setActiveTab] = useState('Open');

  return (
    <div className="max-w-full overflow-x-hidden relative pt-4 px-4">
      {/* Action Header */}
      <header className="flex justify-end min-h-[48px] mb-4">
        <button 
          type="button" 
          className="flex items-center gap-2 bg-accent-background text-white px-6 py-2 rounded-full font-bold hover:bg-admin-action-text-hover transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>New Registration</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="relative mb-6">
        <div className="flex border-b border-neutral-border">
          {['Open', 'Closed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-label font-semibold transition-all relative ${
                activeTab === tab 
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

      {/* Filters & Search */}
      <section className="mt-1 mb-4">
        <div className="flex flex-col md:flex-row gap-4 items-center flex-wrap py-2">
          <div className="flex-1 max-w-[400px]">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium group-focus-within:text-admin-action-text transition-colors" />
              <input 
                id="search"
                name="search"
                type="text" 
                placeholder="Search by registration or program name" 
                className="w-full pl-10 pr-4 py-2 bg-neutral-background-medium/30 border border-neutral-border rounded-lg focus:outline-none focus:bg-white focus:border-admin-action-border transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border text-label font-semibold transition-colors bg-white">
              <Plus className="w-4 h-4" />
              <span>Program</span>
            </button>
          </div>
        </div>
      </section>

      {/* Table Container */}
      <section className="rounded-3xl border border-neutral-border bg-neutral-background-weak pb-2 w-full shadow-sm overflow-hidden">
        <header className="flex flex-col md:flex-row items-center p-4 border-b border-neutral-border">
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 text-sm">
              <select className="bg-white border border-neutral-border rounded px-2 py-1 text-xs focus:outline-none focus:border-accent-background">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-text-medium">
              <button disabled className="p-1 rounded-full hover:bg-neutral-background-medium disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-medium">1 - 1 of 1</span>
              <button disabled className="p-1 rounded-full hover:bg-neutral-background-medium disabled:opacity-30">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-background-medium/50">
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border">Name</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border">Registered</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border text-right">Collected ($)</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border text-center">Open Date</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border text-center">Close Date</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border">Status</th>
                <th className="px-4 py-3 border-b border-neutral-border"></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-neutral-background-medium/30 transition-colors group">
                  <td className="px-4 py-4 border-b border-neutral-border">
                    <button className="text-admin-action-text font-semibold hover:underline text-left">
                      {reg.name}
                    </button>
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border">
                    <span className="font-medium">{reg.registered}</span>
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-right font-medium">
                    ${reg.collected.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-center text-neutral-text-medium">
                    {reg.openDate}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-center text-neutral-text-medium">
                    {reg.closeDate}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border">
                    <span className="text-label-sm flex h-[24px] w-fit items-center rounded-[24px] px-3 py-1 bg-positive-background font-medium">
                      Open
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full text-admin-action-text hover:bg-accent-background-weak transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full text-admin-action-text hover:bg-accent-background-weak transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full text-admin-action-text hover:bg-accent-background-weak transition-colors" title="Share">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
