/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-background': '#fa6700',
        'accent-background-weak': '#fff7ed',
        'accent-text': '#fa6700',
        'admin-action-text': '#fa6700',
        'admin-action-text-hover': '#e65e00',
        'admin-action-text-pressed': '#cc5200',
        'admin-action-border': '#fa6700',
        'admin-action-background': '#fa6700',
        'admin-action-background-weak-hover': '#fff7ed',
        'admin-action-background-weak-pressed': '#ffedd5',
        'neutral-background-weak': '#ffffff',
        'neutral-background-medium': '#f3f4f6',
        'neutral-border': '#e5e7eb',
        'neutral-border-medium': '#d1d5db',
        'neutral-text': '#111827',
        'neutral-text-medium': '#4b5563',
        'neutral-text-inverse': '#ffffff',
        'neutral-icon': '#6b7280',
        'neutral-icon-medium': '#6b7280',
        'neutral-icon-disabled': '#9ca3af',
        'positive-background': '#bbf451',
        'positive-icon': '#bbf451',
        'action-text': '#fa6700',
        'action-icon': '#fa6700',
      },
      fontFamily: {
        sans: ['Urbanist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'display-xl': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'heading-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        'label-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400', textTransform: 'uppercase' }],
      },
      boxShadow: {
        '1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

