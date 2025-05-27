/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // 만약 /app 디렉토리 사용 시
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
