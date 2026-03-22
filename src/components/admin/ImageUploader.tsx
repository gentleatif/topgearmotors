'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, ImagePlus } from 'lucide-react'

interface Props {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return
    setUploading(true)

    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const reader = new FileReader()
      const base64 = await new Promise<string>(res => {
        reader.onload = () => res(reader.result as string)
        reader.readAsDataURL(file)
      })

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64 }),
      })
      const data = await res.json()
      if (data.url) uploaded.push(data.url)
    }

    onChange([...images, ...uploaded])
    setUploading(false)
  }

  const remove = (url: string) => onChange(images.filter(i => i !== url))

  const moveLeft  = (idx: number) => {
    if (idx === 0) return
    const next = [...images]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        className="border-2 border-dashed border-dark-700 hover:border-gold-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors group"
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-dark-400">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
            <span className="text-sm">Uploading to Cloudinary…</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-dark-500 group-hover:text-dark-300 transition-colors">
            <ImagePlus className="w-8 h-8 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
            <span className="text-sm font-medium">Click or drag images here</span>
            <span className="text-xs">JPG, PNG, WEBP — max 10MB each</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative group rounded-lg overflow-hidden aspect-video border border-dark-700">
              <Image src={url} alt={`img ${i + 1}`} fill className="object-cover" />

              {/* Cover badge */}
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] bg-gold-500 text-dark-950 font-bold px-1.5 rounded">
                  Cover
                </span>
              )}

              {/* Actions */}
              <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveLeft(i)}
                    className="text-[10px] bg-gold-500 text-dark-950 font-bold px-2 py-1 rounded"
                  >
                    ← Cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(url)}
                  className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          ))}

          {/* Add more */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-video border-2 border-dashed border-dark-700 hover:border-gold-500/50 rounded-lg flex items-center justify-center transition-colors"
          >
            <Upload className="w-5 h-5 text-dark-500" />
          </button>
        </div>
      )}
    </div>
  )
}
