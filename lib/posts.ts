import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Разбираем front matter
  const matterResult = matter(fileContents)

  // Конвертируем markdown в HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...matterResult.data
  }
}
