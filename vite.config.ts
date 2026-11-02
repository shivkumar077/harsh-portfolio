import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

function localDevSyncPlugin(): Plugin {
  return {
    name: 'local-dev-sync',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/save-config', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filePath = path.resolve(process.cwd(), 'src/data/portfolioData.ts')
              const fileContent = `import type { SiteConfig } from '../types/portfolio';\n\n/**\n * Editfolio Master Configuration\n * Automatically saved via Editfolio Local Customizer\n */\nexport const portfolioData: SiteConfig = ${JSON.stringify(data, null, 2)};\n`
              fs.writeFileSync(filePath, fileContent, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Successfully updated src/data/portfolioData.ts on disk!' }))
            } catch (err: any) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        }
      })

      server.middlewares.use('/api/save-image', (req, res) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const { filename, base64 } = JSON.parse(body)
              const cleanName = (filename || 'profile.jpg').toLowerCase().replace(/[^a-z0-9_.-]/g, '-')
              const publicDir = path.resolve(process.cwd(), 'public')
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true })
              }
              const targetPath = path.resolve(publicDir, cleanName)
              const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
              fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, path: `/${cleanName}` }))
            } catch (err: any) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        }
      })

      server.middlewares.use('/api/save-video', (req, res) => {
        if (req.method === 'POST') {
          const url = new URL(req.url || '', 'http://localhost')
          const rawName = url.searchParams.get('name') || 'video.mp4'
          const cleanName = rawName.toLowerCase().replace(/[^a-z0-9_.-]/g, '-')
          const targetPath = path.resolve(process.cwd(), 'public', cleanName)
          const writeStream = fs.createWriteStream(targetPath)
          req.pipe(writeStream)
          writeStream.on('finish', () => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, path: `/${cleanName}` }))
          })
          writeStream.on('error', (err: any) => {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, error: err.message }))
          })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localDevSyncPlugin()],
})
