"use client";

import { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  AlertCircle, 
  CheckCircle,
  RotateCcw,
  Maximize2,
  Crop,
  Download
} from 'lucide-react';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  dimensions: { width: number; height: number };
  size: number;
  aspectRatio: string;
}

interface ImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  minDimensions?: { width: number; height: number };
  supportedFormats?: string[];
  className?: string;
}

export default function ImageUpload({
  onImagesChange,
  maxFiles = 10,
  maxSizePerFile = 10,
  minDimensions = { width: 300, height: 300 },
  supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className = ""
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;
    
    // Common aspect ratios
    if (ratioWidth === 16 && ratioHeight === 9) return '16:9';
    if (ratioWidth === 9 && ratioHeight === 16) return '9:16';
    if (ratioWidth === 1 && ratioHeight === 1) return '1:1';
    if (ratioWidth === 4 && ratioHeight === 3) return '4:3';
    if (ratioWidth === 3 && ratioHeight === 4) return '3:4';
    
    return `${ratioWidth}:${ratioHeight}`;
  };

  const validateImage = (file: File): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> => {
    return new Promise((resolve) => {
      // Check file type
      if (!supportedFormats.includes(file.type)) {
        resolve({ 
          valid: false, 
          error: `Unsupported file format: ${file.type}. Supported formats: ${supportedFormats.join(', ')}` 
        });
        return;
      }

      // Check file size
      if (file.size > maxSizePerFile * 1024 * 1024) {
        resolve({ 
          valid: false, 
          error: `File size exceeds limit (${(file.size / 1024 / 1024).toFixed(1)}MB > ${maxSizePerFile}MB)` 
        });
        return;
      }

      // Check image dimensions
      const img = new Image();
      img.onload = () => {
        if (img.width < minDimensions.width || img.height < minDimensions.height) {
          resolve({ 
            valid: false, 
            error: `Image dimensions too small (${img.width}x${img.height} < ${minDimensions.width}x${minDimensions.height})` 
          });
        } else {
          resolve({ 
            valid: true, 
            dimensions: { width: img.width, height: img.height } 
          });
        }
      };
      img.onerror = () => {
        resolve({ valid: false, error: 'Unable to read image file' });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const processFiles = useCallback(async (files: FileList) => {
    setUploading(true);
    setErrors([]);

    const newErrors: string[] = [];
    const newImages: UploadedImage[] = [];

    // Check total file limit
    if (uploadedImages.length + files.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files can be uploaded`);
      setErrors(newErrors);
      setUploading(false);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const validation = await validateImage(file);
        
        if (validation.valid && validation.dimensions) {
          const preview = URL.createObjectURL(file);
          const aspectRatio = calculateAspectRatio(validation.dimensions.width, validation.dimensions.height);
          
          newImages.push({
            id: `${Date.now()}-${i}`,
            file,
            preview,
            dimensions: validation.dimensions,
            size: file.size,
            aspectRatio
          });
        } else {
          newErrors.push(`${file.name}: ${validation.error}`);
        }
      } catch (error) {
        newErrors.push(`${file.name}: Error processing file`);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
    setUploading(false);
  }, [uploadedImages, maxFiles, onImagesChange, supportedFormats, maxSizePerFile, minDimensions, validateImage]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (id: string) => {
    const image = uploadedImages.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    const updatedImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const clearAll = () => {
    uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
    onImagesChange([]);
    setErrors([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getAspectRatioRecommendation = (aspectRatio: string): string => {
    switch (aspectRatio) {
      case '16:9': return 'Suitable for landscape videos (YouTube, TV)';
      case '9:16': return 'Suitable for portrait videos (TikTok, Instagram Stories)';
      case '1:1': return 'Suitable for square videos (Instagram Post)';
      case '4:3': return 'Suitable for standard video format';
      default: return 'Custom ratio';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card 
        className={`relative border-2 border-dashed transition-all duration-200 ${
          dragActive 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <div className="mb-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              dragActive ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              <Upload className={`w-8 h-8 ${
                dragActive ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Upload Image Files
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Drag files here, or click to select files
          </p>

          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <p>Supported formats: JPG, PNG, WEBP</p>
            <p>Max file size: {maxSizePerFile}MB</p>
            <p>Min dimensions: {minDimensions.width}×{minDimensions.height}px</p>
            <p>Max upload: {maxFiles} files</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || uploadedImages.length >= maxFiles}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
            
            {uploadedImages.length > 0 && (
              <Button
                variant="outline"
                onClick={clearAll}
                className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={supportedFormats.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </Card>

      {/* Upload Status */}
      {uploading && (
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            Processing files, please wait...
          </AlertDescription>
        </Alert>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>
            <div className="text-red-700 dark:text-red-300">
              <p className="font-medium mb-2">Failed uploads:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Uploaded Images ({uploadedImages.length}/{maxFiles})
            </h4>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <CheckCircle className="w-3 h-3 mr-1" />
              Ready
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative group">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                    <img
                      src={image.preview}
                      alt={`Uploaded image ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 text-gray-900 hover:bg-white"
                        onClick={() => setEditingImage(image.id)}
                      >
                        <Crop className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 text-gray-900 hover:bg-white"
                        onClick={() => window.open(image.preview, '_blank')}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {image.file.name}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {image.aspectRatio}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span>{image.dimensions.width}×{image.dimensions.height}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{formatFileSize(image.size)}</span>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      {getAspectRatioRecommendation(image.aspectRatio)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Batch Processing Suggestions */}
      {uploadedImages.length > 1 && (
        <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <p className="font-medium mb-2">Batch Processing Suggestions:</p>
            <ul className="text-sm space-y-1">
              <li>• Ensure all images have similar style and theme</li>
              <li>• Recommend using same aspect ratio for consistent video effects</li>
              <li>• Images will be processed in upload order</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
