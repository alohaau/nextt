// В components/PostCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PostCard({ post }) {
  return (
    <motion.article 
      whileHover={{ y: -8 }}
      className="relative group overflow-hidden rounded-2xl shadow-2xl h-[400px]"
    >
      {/* Реальное изображение вместо градиента */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={post.image || '/default-cover.jpg'}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Контент */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        {/* Категория с анимацией */}
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-block mb-3 px-4 py-1 bg-amber-500 text-xs font-bold rounded-full"
        >
          {post.category}
        </motion.span>

        {/* Заголовок с эффектом "масштабирования" при hover */}
        <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-300 group-hover:text-amber-400">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Мета-данные */}
        <div className="flex items-center text-sm text-white/80 mb-4">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>

        {/* Кнопка с эффектом "скольжения" */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href={`/posts/${post.slug}`} 
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all"
            >
              Читать статью
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}