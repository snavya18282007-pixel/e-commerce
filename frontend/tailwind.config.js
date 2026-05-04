/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#7E102C',
        brandAccent: '#C94F4F',
        bgPremium: '#F5EFE7',
        surface: '#FFFFFF',
        textPrimary: '#1A1A1A',
        textSecondary: '#6B5B57',
        borderSubtle: '#E6DED3',
      },
      borderRadius: {
        'premium': '14px',
        'btn': '16px',
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'soft': '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-tap': 'scaleTap 0.2s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleTap: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    }
  },
  plugins: []
};
