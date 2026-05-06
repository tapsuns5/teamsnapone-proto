import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditProgramDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (programData: ProgramData) => void;
  initialData?: ProgramData;
}

interface ProgramData {
  programName: string;
  activeDates: string;
  sport: string;
  type: string;
  enableStandings: boolean;
  advancedTeamPermissions: boolean;
}

const SPORTS = [
  'Baseball',
  'Softball',
  'Basketball',
  'Football',
  'Soccer',
  'Volleyball',
  'Hockey',
  'Lacrosse',
  'Other'
];

const PROGRAM_TYPES = [
  'League',
  'Tournament',
  'Camp',
  'Clinic',
  'Training',
  'Other'
];

export default function EditProgramDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}: EditProgramDialogProps) {
  const [programData, setProgramData] = useState<ProgramData>({
    programName: '',
    activeDates: '',
    sport: '',
    type: '',
    enableStandings: false,
    advancedTeamPermissions: false,
  });

  useEffect(() => {
    if (initialData) {
      setProgramData(initialData);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave(programData);
    onClose();
  };

  const handleInputChange = (field: keyof ProgramData, value: string | boolean) => {
    setProgramData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-border">
          <h2 className="text-xl font-bold text-neutral-text">Edit Program</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-background-weak transition-colors"
          >
            <X className="w-5 h-5 text-neutral-text-medium" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Program Name */}
          <div>
            <label className="block text-sm font-semibold text-neutral-text mb-2">
              Program Name
            </label>
            <input
              type="text"
              value={programData.programName}
              onChange={(e) => handleInputChange('programName', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border focus:ring-1 focus:ring-admin-action-border"
              placeholder="Enter program name"
            />
          </div>

          {/* Active Dates */}
          <div>
            <label className="block text-sm font-semibold text-neutral-text mb-2">
              Active Dates
            </label>
            <input
              type="text"
              value={programData.activeDates}
              onChange={(e) => handleInputChange('activeDates', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border focus:ring-1 focus:ring-admin-action-border"
              placeholder="e.g., Aug 26 - Oct 21"
            />
          </div>

          {/* Sport */}
          <div>
            <label className="block text-sm font-semibold text-neutral-text mb-2">
              Sport
            </label>
            <select
              value={programData.sport}
              onChange={(e) => handleInputChange('sport', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border focus:ring-1 focus:ring-admin-action-border bg-white"
            >
              <option value="">Select sport...</option>
              {SPORTS.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-neutral-text mb-2">
              Type
            </label>
            <select
              value={programData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-border rounded-lg focus:outline-none focus:border-admin-action-border focus:ring-1 focus:ring-admin-action-border bg-white"
            >
              <option value="">Select type...</option>
              {PROGRAM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Enable Standings Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-neutral-text">
                Enable Standings
              </label>
              <p className="text-xs text-neutral-text-medium mt-1">
                Show standings and rankings for teams
              </p>
            </div>
            <button
              onClick={() => handleInputChange('enableStandings', !programData.enableStandings)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                programData.enableStandings ? 'bg-admin-action-background' : 'bg-neutral-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  programData.enableStandings ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Advanced Team Permissions */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-neutral-text">
                Advanced Team Permissions
              </label>
              <p className="text-xs text-neutral-text-medium mt-1">
                Configure detailed team access controls
              </p>
            </div>
            <button
              onClick={() => handleInputChange('advancedTeamPermissions', !programData.advancedTeamPermissions)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                programData.advancedTeamPermissions ? 'bg-admin-action-background' : 'bg-neutral-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  programData.advancedTeamPermissions ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-border bg-neutral-background-weak">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-neutral-border rounded-lg text-neutral-text font-semibold hover:bg-neutral-background-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-admin-action-background text-white rounded-lg font-semibold hover:bg-admin-action-text-hover transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
