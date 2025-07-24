import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export type Post = {
  slug: string;
  title: string;
  date: string;
  readTime?: string;
  category?: string;
  image?: string;
  excerpt?: string; 
}



export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    // Проверяем, что дата есть и она строка
    const data = matterResult.data as {
      title: string
      date: string
      readTime?: string
      category?: string
      image?: string
    }

    if (!data.date) {
      throw new Error(`Post ${slug} is missing a date in frontmatter`)
    }

    return {
  slug,
  title: data.title,
  date: data.date,
  readTime: data.readTime,
  category: data.category,
  image: data.image,
  excerpt: data.excerpt ?? matterResult.content.slice(0, 160).replace(/\n/g, ' ') + '...', // fallback если нет excerpt в frontmatter
}

  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}
