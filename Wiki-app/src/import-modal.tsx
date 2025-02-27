import { useState } from 'react'
import { Button, Input, Label } from "@/components/ui/button"
import { marked } from 'marked'

interface ImportModalProps {
  onImport: (pageName: string, content: string) => void
  onClose: () => void
}

export default function ImportModal({ onImport, onClose }: ImportModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [pageName, setPageName] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handlePageNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value)
  }

  const handleImport = () => {
    if (file && pageName) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        onImport(pageName, marked(content))
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Import Content</h2>
        <div className="mb-4">
          <Label htmlFor="page-name">Page Name</Label>
          <Input
            id="page-name"
            type="text"
            value={pageName}
            onChange={handlePageNameChange}
            className="mt-2"
            placeholder="Enter page name"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="file-upload">Upload File</Label>
          <Input
            id="file-upload"
            type="file"
            accept=".md,.txt"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleImport}>Import</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}