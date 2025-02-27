import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WikiPageProps {
  content: string
}

export default function WikiPage({ content }: WikiPageProps) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    setHtmlContent(marked(content))
  }, [content])

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Wiki Page</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </CardContent>
    </Card>
  )
}