import React, { useState, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  altValue?: string;
  onChangeAlt?: (alt: string) => void;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export function compressAndResizeImage(
  file: File,
  maxWidth = 800,
  maxHeight = 600,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate that the file is an image
    if (!file.type.startsWith('image/')) {
      reject(new Error('Por favor, selecione apenas arquivos de imagem.'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string); // Fallback to original base64 if canvas context fails
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function ImageUploader({
  value,
  onChange,
  label,
  altValue = '',
  onChangeAlt,
  maxWidth = 800,
  maxHeight = 600,
  quality = 0.75
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setLoading(true);
    try {
      const base64Data = await compressAndResizeImage(file, maxWidth, maxHeight, quality);
      onChange(base64Data);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar imagem.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase text-neutral-400">
        {label}
      </label>

      {error && (
        <div className="flex items-center space-x-1.5 text-red-400 bg-red-950/20 border border-red-900/40 p-2.5 rounded-xl text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Drop zone / Upload area */}
        <div 
          className={`relative md:col-span-8 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 transition-all duration-300 min-h-[140px] text-center cursor-pointer ${
            dragActive 
              ? 'border-brand-accent bg-brand-accent/5' 
              : 'border-neutral-800 bg-[#161616]/40 hover:border-neutral-700'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {loading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-brand-accent border-t-transparent mx-auto"></div>
              <p className="text-[11px] text-neutral-400 font-sans">Processando e compactando imagem...</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="p-2 bg-neutral-900 rounded-full inline-block text-neutral-400">
                <Upload className="h-4 w-4" />
              </div>
              <p className="text-xs text-neutral-300 font-medium">
                Arrastar e soltar imagem ou <span className="text-brand-accent">clique para buscar</span>
              </p>
              <p className="text-[10px] text-neutral-500">
                JPG, PNG ou WebP. Redimensionamento e compressão automáticos aplicados.
              </p>
            </div>
          )}
        </div>

        {/* Live Preview Area */}
        <div className="md:col-span-4 flex flex-col justify-between p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-xl min-h-[140px]">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase text-neutral-500">Pré-visualização</span>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              {value ? (
                <>
                  <img 
                    src={value || null} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-1 right-1 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors shadow-lg"
                    title="Excluir imagem"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <div className="text-neutral-600 flex flex-col items-center space-y-1">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-[10px]">Nenhuma foto</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="text-[9px] font-mono uppercase text-neutral-500">Ou use link existente</span>
            <input
              type="text"
              placeholder="https://exemplo.com/foto.jpg"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-[#161616] border border-neutral-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white font-mono placeholder-neutral-600"
            />
          </div>
        </div>
      </div>

      {onChangeAlt && (
        <div className="pt-1">
          <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-0.5">
            Texto ALT (Descrição de Acessibilidade & SEO)
          </label>
          <input
            type="text"
            placeholder="Ex: Professor Sabino ensinando dedilhado de violão acústico para aluno iniciante"
            value={altValue}
            onChange={(e) => onChangeAlt(e.target.value)}
            className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-600"
          />
        </div>
      )}
    </div>
  );
}
