// Simple in-memory RAG without external dependencies

let storedChunks: string[] = []

// Split text into chunks
export function chunkText(text: string, chunkSize: number = 500): string[] {
  const words = text.split(' ')
  const chunks: string[] = []
  
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '))
  }
  
  return chunks
}

// Store document chunks
export function storeDocument(text: string) {
  storedChunks = chunkText(text)
  return storedChunks.length
}

// Find most relevant chunks for a question
export function findRelevantChunks(question: string, topK: number = 3): string[] {
  const questionWords = question.toLowerCase().split(' ')
  
  const scored = storedChunks.map(chunk => {
    const chunkLower = chunk.toLowerCase()
    const score = questionWords.reduce((acc, word) => {
      return acc + (chunkLower.includes(word) ? 1 : 0)
    }, 0)
    return { chunk, score }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk)
}