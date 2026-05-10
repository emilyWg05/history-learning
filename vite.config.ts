import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 如果是用户主页 (username.github.io) 使用 '/'
  // 如果是项目页 (username.github.io/repo-name) 改为 '/repo-name/'
  base: '/history-learning/',
  plugins: [tailwindcss(), react()],
})
