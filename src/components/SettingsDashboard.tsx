import React from 'react';
import { Upload, X, Mail } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SettingsDashboard() {
  const { '*': tabParam } = useParams();
  const navigate = useNavigate();

  const tabParamMap: Record<string, string> = {
    general: 'General',
    admin: 'Admin',
    divisions: 'Divisions',
    venues: 'Venues'
  };
  
  const activeTab = tabParamMap[(tabParam || '').toLowerCase()] || 'General';

  const setActiveTab = (tab: string) => {
    navigate(`/settings/${tab.toLowerCase()}`);
  };

  return (
    <div className="max-w-full overflow-x-hidden relative pt-4 px-4 pb-24">
      {/* Tabs */}
      <div className="relative mb-6">
        <div className="flex border-b border-neutral-border overflow-x-auto sui-hide-scrollbar">
          {['General', 'Admin', 'Divisions', 'Venues'].map((tab) => (
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

      {/* Settings Form Container */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-border overflow-hidden">
          <form className="p-6">
            <fieldset className="mb-8">
              <legend className="text-lg font-bold mb-4">General</legend>

              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-neutral-text mb-1.5">
                  Name<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Tyler Palmer"
                  className="w-full px-4 py-2 bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm"
                />
              </div>

              {/* Logo Upload */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-neutral-text mb-1">Logo</label>
                <p className="text-xs text-neutral-text-medium mb-4">Logo appears in email headers and registration landing page.</p>

                <div className="relative min-h-[380px] grid place-content-center rounded-2xl border-2 border-dashed border-neutral-border-medium bg-neutral-background-weak hover:border-admin-action-border transition-colors p-8">
                  <div className="text-center flex flex-col items-center">
                    <figure className="w-32 h-32 rounded-full overflow-hidden mb-3 bg-neutral-background-medium border border-neutral-border">
                      <img
                        src="https://org.teamsnap.com/images/ts-one-logo.svg"
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </figure>
                    <button type="button" className="text-sm font-bold text-red-500 hover:underline mb-4 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      Remove image
                    </button>

                    <div className="w-full max-w-[280px] h-px bg-neutral-border mb-4"></div>

                    <p className="text-sm font-semibold text-neutral-text mb-3">Drop your logo here or</p>
                    <button type="button" className="px-6 py-2 rounded-full border border-admin-action-border text-admin-action-text font-bold hover:bg-admin-action-background hover:text-white transition-all active:scale-95">
                      Browse your files to upload
                    </button>

                    <div className="w-full max-w-[280px] h-px bg-neutral-border my-6"></div>

                    <p className="text-xs text-neutral-text-medium">
                      Recommended: Round, Square, PNG or JPG, max 2MB
                    </p>
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/png, image/jpeg" />
                </div>
              </div>

              {/* Contact Email */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-neutral-text mb-1.5">General contact email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-icon-medium" />
                  <input
                    type="email"
                    placeholder="email@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border text-sm"
                  />
                </div>
                <p className="text-xs text-neutral-text-medium mt-2">
                  Use this address as a reply to when sending emails to recipients.
                </p>
              </div>
            </fieldset>

            <footer className="flex justify-end pt-4 border-t border-neutral-border">
              <button type="submit" className="bg-accent-background text-white px-8 py-2 rounded-full font-bold hover:bg-admin-action-text-hover transition-colors shadow-sm">
                Save
              </button>
            </footer>
          </form>
        </div>
      </section>
    </div>
  );
}
