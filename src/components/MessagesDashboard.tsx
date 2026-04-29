import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Mail } from 'lucide-react';

const sentMessages = [
  {
    id: '019d497c-3156-7054-8d0e-4fa8fa3e30ec',
    type: 'Email',
    subject: 'Test Email',
    preview: 'This is a test',
    sender: 'Tyler Palmer',
    recipients: 2,
    delivered: 100,
    dateSent: 'Apr 1, 2026 10:39 AM'
  }
];

export default function MessagesDashboard() {
  const [activeTab, setActiveTab] = useState('Sent');

  return (
    <div className="px-4 mx-auto pt-4 max-w-full">
      {/* Action Header */}
      <header className="flex justify-end mb-4">
        <button 
          type="button" 
          className="flex items-center gap-2 bg-accent-background text-white px-6 py-2 rounded-full font-bold hover:bg-admin-action-text-hover transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>New message</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="relative mb-6">
        <div className="flex border-b border-neutral-border">
          {['Sent', 'Drafts (0)'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.startsWith('Sent') ? 'Sent' : 'Drafts')}
              className={`px-6 py-3 text-label font-semibold transition-all relative ${
                (activeTab === 'Sent' && tab.startsWith('Sent')) || (activeTab === 'Drafts' && tab.startsWith('Drafts'))
                  ? 'text-admin-action-text' 
                  : 'text-neutral-text-medium hover:text-admin-action-text'
              }`}
            >
              {tab}
              {((activeTab === 'Sent' && tab.startsWith('Sent')) || (activeTab === 'Drafts' && tab.startsWith('Drafts'))) && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-admin-action-border rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

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
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-neutral-background-medium/50">
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border w-[120px]">Type</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border w-[30%]">Subject/Message</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border w-[150px]">Sender</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border w-[120px] text-right">Recipients</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border w-[150px]">Delivered</th>
                <th className="px-4 py-3 text-label font-bold text-neutral-text-medium border-b border-neutral-border w-[180px]">Date sent</th>
                <th className="px-4 py-3 border-b border-neutral-border w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {sentMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-neutral-background-medium/30 transition-colors group">
                  <td className="px-4 py-4 border-b border-neutral-border text-sm text-neutral-text">
                    {msg.type}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border">
                    <div className="max-w-full">
                      <p className="text-sm font-bold text-neutral-text truncate">{msg.subject}</p>
                      <p className="text-xs text-neutral-text-medium truncate mt-0.5">{msg.preview}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-sm text-neutral-text">
                    {msg.sender}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-sm text-neutral-text text-right">
                    {msg.recipients}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border">
                    <div className="flex flex-col gap-1">
                      <div className="w-full bg-neutral-background-medium rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-accent-background h-full rounded-full transition-all duration-500" 
                          style={{ width: `${msg.delivered}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-neutral-text-medium">{msg.delivered}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-sm text-neutral-text-medium">
                    {msg.dateSent}
                  </td>
                  <td className="px-4 py-4 border-b border-neutral-border text-right">
                    <button className="p-2 rounded-full text-admin-action-text hover:bg-accent-background-weak transition-colors" title="View Details">
                      <ChevronRight className="w-5 h-5" />
                    </button>
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
