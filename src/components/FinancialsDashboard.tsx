import React, { useState } from 'react';
import { Calendar, Plus, Download, ChevronLeft, ChevronRight, Info } from 'lucide-react';

export default function FinancialsDashboard() {
  const [activeTab, setActiveTab] = useState('Deposits');

  return (
    <div className="max-w-full overflow-x-hidden relative pt-4">
      <div className="px-4 mb-4">
        {/* Tabs */}
        <div className="relative mb-6">
          <div className="flex border-b border-neutral-border overflow-x-auto sui-hide-scrollbar">
            {['Deposits', 'Transactions', 'Scheduled', 'Overdue'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-label font-semibold transition-all relative whitespace-nowrap ${activeTab === tab
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

      <section className="pb-[100px]">
        <div className="px-4 mx-auto flex flex-col xl:flex-row gap-6 items-stretch">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Filters & Actions */}
            <section className="flex flex-col md:flex-row gap-4 mb-4 justify-between items-center">
              <div className="flex gap-2 flex-wrap items-center">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-border bg-white text-sm font-medium hover:border-admin-action-border transition-colors">
                  <Calendar className="w-4 h-4 text-neutral-icon-medium" />
                  <span>03/14/2026 - 04/13/2026</span>
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border text-label font-semibold transition-colors bg-white">
                  <Plus className="w-4 h-4" />
                  <span>Deposit status</span>
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-dashed border-neutral-border-medium hover:border-admin-action-border text-label font-semibold transition-colors bg-white">
                  <Plus className="w-4 h-4" />
                  <span>Deposit account</span>
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-border bg-white text-sm font-bold hover:bg-neutral-background-medium transition-colors">
                <Download className="w-4 h-4" />
                <span>Export all</span>
              </button>
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
                    <span className="font-medium">1 - 0 of 0</span>
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
                      <th className="px-4 py-3 border-b border-neutral-border w-10">
                        <input type="checkbox" className="rounded border-neutral-border" disabled />
                      </th>
                      <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border">
                        <div className="flex items-center gap-1">
                          Est. deposit date
                          <ChevronLeft className="w-4 h-4 rotate-270" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border">Deposit account</th>
                      <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border text-right">Net ($)</th>
                      <th className="px-4 py-3 border-b border-neutral-border w-10"></th>
                    </tr>
                  </thead>
                </table>

                {/* Empty State */}
                <div className="py-16 text-center">
                  <div className="mb-4">
                    <img
                      src="https://org.teamsnap.com/images/ts-one-logo.svg"
                      alt="No records"
                      className="w-[224px] mx-auto opacity-80"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback if the specific graphic isn't found
                        (e.target as HTMLImageElement).src = "https://picsum.photos/seed/finance/224/160";
                      }}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-text">No financial records at this time</h2>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Deposit Accounts */}
          <div className="xl:w-[330px] flex-shrink-0">
            <h1 className="text-lg font-bold mb-3">Deposit accounts</h1>
            <div className="rounded-3xl border border-neutral-border bg-neutral-background-weak p-4 shadow-sm min-h-[120px] flex flex-col">
              <button className="flex items-center gap-2 text-admin-action-text font-bold hover:underline mt-auto">
                <Plus className="w-5 h-5" />
                <span>Add account</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
