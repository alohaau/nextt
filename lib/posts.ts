import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ✅ Тип поста
type Post = {
  slug: string
  title: string
  date: string
  readTime?: string
  category?: string
  image?: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

// ✅ Получение отсортированных данных
export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: Post[] = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      readTime: matterResult.data.readTime,
      category: matterResult.data.category,
      image: matterResult.data.image || '/default-post.jpg'
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// Получение всех идентификаторов постов для [slug].tsx
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

// Получение одного поста по slug
export function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const contentHtml = matterResult.content

  return {
    slug,
    contentHtml,
    ...matterResult.data
  }
}
