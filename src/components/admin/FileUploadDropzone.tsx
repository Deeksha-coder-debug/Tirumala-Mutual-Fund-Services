'use client';

import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Video, CheckCircle, AlertCircle, Loader2, X, Link as LinkIcon } from 'lucide-react';

interface FileUploadDropzoneProps {
  onUploadSuccess: (url: string, fileInfo: { name: string; type: string; size: number }) => void;
  currentUrl?: string;
  accept?: string;
  label?: string;
}

export default function FileUploadDropzone({
  onUploadSuccess,
  currentUrl,
  accept = 'image/*,video/*',
  label = 'Upload Image or Video',
}: FileUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentUrl || '');
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [fileName, setFileName] = useState('');
  const [useExternalUrl, setUseExternalUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setErrorMessage('');
    
    // Validate size (25MB limit)
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File exceeds maximum size limit of 25MB');
      return;
    }

    const isVideo = file.type.startsWith('video');
    setFileType(isVideo ? 'video' : 'image');
    setFileName(file.name);

    // Create local object URL for instant preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    // Upload to /api/upload
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload');
      }

      setPreviewUrl(data.url);
      onUploadSuccess(data.url, {
        name: file.name,
        type: file.type,
        size: file.size,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error uploading file. Please try again.');
      setPreviewUrl('');
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearSelection = () => {
    setPreviewUrl('');
    setFileName('');
    setFileType(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadSuccess('', { name: '', type: '', size: 0 });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block !text-slate-800 font-bold text-xs">
          {label} <span className="text-amber-600">*</span>
        </label>
        <button
          type="button"
          onClick={() => setUseExternalUrl(!useExternalUrl)}
          className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{useExternalUrl ? 'Upload File Directly' : 'Paste External URL / YouTube'}</span>
        </button>
      </div>

      {useExternalUrl ? (
        <div>
          <input
            type="url"
            placeholder="https://images.unsplash.com/... or https://youtube.com/..."
            value={previewUrl}
            onChange={(e) => {
              setPreviewUrl(e.target.value);
              onUploadSuccess(e.target.value, { name: 'External Link', type: 'url', size: 0 });
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />

          {previewUrl ? (
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-3 overflow-hidden shadow-sm">
              <div className="flex items-start gap-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300 flex items-center justify-center">
                  {fileType === 'video' || previewUrl.endsWith('.mp4') ? (
                    <video src={previewUrl} className="w-full h-full object-cover" muted autoPlay loop />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold !text-slate-900 truncate">
                    {fileType === 'video' ? <Video className="w-3.5 h-3.5 text-amber-600" /> : <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />}
                    <span className="truncate">{fileName || 'Uploaded Media'}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5">{previewUrl}</p>
                  
                  {isUploading ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading to server...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
                      <CheckCircle className="w-3 h-3" /> Ready & saved to /public/uploads/
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={clearSelection}
                  className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-slate-200 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-amber-500 bg-amber-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-amber-400 bg-slate-50/70 hover:bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 mx-auto mb-2 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold !text-slate-800">
                Click to browse or drag & drop files here
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Supports Images (JPG, PNG, WebP) and Videos (MP4, WebM) up to 25MB
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-2 text-xs text-red-600 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
