import { existsSync, promises as fs } from 'fs'
import { join } from 'path'

import App from './App.svelte'

async function main() {
  const templatePath = join(process.cwd(), 'ssg', 'template.index.html')
  const publicPath = join(process.cwd(), 'ssg', 'public')

  const template = await fs.readFile(templatePath, 'utf-8')
  const { html, head } = App.render()

  if (!existsSync(publicPath)) {
    await fs.mkdir(publicPath)
  }

  await fs.writeFile(
      join(publicPath, 'index.html'),
      template
          .replace('%svelte.head%', head)
          .replace('%svelte.html%', html)
  )
}

main()
