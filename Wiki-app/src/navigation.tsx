import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface NavigationProps {
  pages: string[]
  currentPage: string
  onChangePage: (page: string) => void
}

export default function Navigation({ pages, currentPage, onChangePage }: NavigationProps) {
  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.substring(1) || 'home'
      onChangePage(page)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [onChangePage])

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex space-x-4">
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => {
              window.location.hash = page
              onChangePage(page)
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </Button>
        ))}
      </div>
    </nav>
  )
}