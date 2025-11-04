module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7fdf6',
          100: '#eef9ec',
          200: '#d9f3d8',
          300: '#b3e7b1',
          400: '#7fd87e',
          500: '#39b64d',
          600: '#2f9c44',
          700: '#25793a',
          800: '#1b5a2c',
          900: '#10381a'
        }
      }
    }
  },
  plugins: [],
}