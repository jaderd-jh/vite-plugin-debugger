import { access, copyFile, mkdir, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'tsup'

async function copyDir(from: string, to: string) {
  try {
    await access(to)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir(to, { recursive: true })
    } else {
      throw error
    }
  }

  const files = await readdir(from)
  await Promise.all(
    files.map(async file => {
      const srcPath = join(from, file)
      const destPath = join(to, file)

      const stats = await stat(srcPath)
      if (stats.isFile()) {
        await copyFile(srcPath, destPath)
        console.log(`Copied ${file} to ${to}`)
      } else if (stats.isDirectory()) {
        await copyDir(srcPath, destPath)
      }
    })
  )
}

export default defineConfig({
  entry: {
    eruda: 'src/plugins/eruda.ts',
    vconsole: 'src/plugins/vconsole.ts',
    index: 'src/index.ts',
  },
  target: 'esnext',
  clean: true,
  dts: true,
  format: ['esm'],
  async onSuccess() {
    await copyDir('src/precompiled', 'dist/precompiled')
  },
})
