import { useState, lazy, Suspense } from 'react'
import WikiPage from './wiki-page'
import Navigation from './navigation'
import { Button } from '@/components/ui/button'
import { marked } from 'marked'

const ImportModal = lazy(() => import('./import-modal'))

interface PageContent {
  [key: string]: string
}

const initialPages: string[] = ['home', 'about', 'contact']
const initialPageContent: PageContent = {
  home: '# Home\nWelcome to the Wiki Home Page!',
  about: '# About\nThis is the About Page.',
  contact: '# Contact\nContact us at contact@example.com.',
}

export default function App() {
  const [pages, setPages] = useState<string[]>(initialPages)
  const [pageContent, setPageContent] = useState<PageContent>(initialPageContent)
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [showImportModal, setShowImportModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleImport = async (pageName: string, content: string) => {
    if (!pageName || !content) {
      setError('Page name and content are required for import.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      setPages((prevPages) => {
        if (!prevPages.includes(pageName)) {
          return [...prevPages, pageName]
        }
        return prevPages
      })

      setPageContent((prevContent) => ({
        ...prevContent,
        [pageName]: content,
      }))

      setShowImportModal(false)
    } catch (err) {
      setError('An error occurred while importing the content.')
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowImportModal(false)
    setError(null)
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation pages={pages} currentPage={currentPage} onChangePage={setCurrentPage} />
      <div className="p-8">
        <WikiPage content={pageContent[currentPage] || '# Page Not Found'} />
      </div>
      <Button onClick={() => setShowImportModal(true)} disabled={loading}>
        {loading ? 'Loading...' : 'Import Content'}
      </Button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {showImportModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <ImportModal onImport={handleImport} onClose={handleCloseModal} />
        </Suspense>
      )}
    </div>
  )
}