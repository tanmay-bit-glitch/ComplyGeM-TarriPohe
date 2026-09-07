import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Check, X, AlertCircle, Sparkles, SwitchCamera } from 'lucide-react';

interface CameraCaptureModalProps {
  documentTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onCaptureComplete: (dataUrl: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  documentTitle,
  isOpen,
  onClose,
  onCaptureComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<'environment' | 'user'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, cameraMode, capturedImage]);

  const startCamera = async () => {
    setErrorMsg(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.log('Camera access status:', err?.message || 'Camera unavailable');
      setErrorMsg(
        'Camera access was denied or is not available. Please allow camera permissions in browser settings or upload document via file selector.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
    setIsCapturing(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCaptureComplete(capturedImage);
      onClose();
    }
  };

  const handleToggleCamera = () => {
    setCameraMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-300">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">Camera Document Scanner</h3>
              <p className="text-[11px] text-slate-400">{documentTitle}</p>
            </div>
          </div>
          <button
            id="close-camera-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative bg-black aspect-4/3 flex items-center justify-center overflow-hidden">
          {errorMsg ? (
            <div className="text-center p-6 max-w-md">
              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <p className="text-sm text-slate-200 mb-4">{errorMsg}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs rounded transition-colors"
              >
                Retry Camera Access
              </button>
            </div>
          ) : capturedImage ? (
            <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
              <img
                src={capturedImage}
                alt="Captured Document Scan"
                className="max-w-full max-h-full object-contain shadow-lg"
              />
              <div className="absolute top-3 left-3 bg-emerald-700/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded flex items-center space-x-1 backdrop-blur-xs">
                <Check className="w-3.5 h-3.5" />
                <span>Document Scanned Successfully</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Document Alignment Frame Reticle */}
              <div className="absolute inset-8 border-2 border-dashed border-amber-400/80 rounded-lg pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-4 border-l-4 border-amber-400"></div>
                  <div className="w-6 h-6 border-t-4 border-r-4 border-amber-400"></div>
                </div>
                <div className="text-center">
                  <span className="bg-black/60 text-amber-300 text-[11px] font-semibold px-3 py-1 rounded backdrop-blur-xs">
                    Align document inside frame (Ensure text & stamp are legible)
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-4 border-l-4 border-amber-400"></div>
                  <div className="w-6 h-6 border-b-4 border-r-4 border-amber-400"></div>
                </div>
              </div>

              {/* Camera Switch button */}
              <button
                onClick={handleToggleCamera}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-xs transition-colors"
                title="Switch Camera (Front/Rear)"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hidden Canvas for Frame Processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Modal Controls */}
        <div className="bg-slate-100 px-5 py-4 flex items-center justify-between border-t border-slate-200">
          <span className="text-xs text-slate-600 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI OCR will auto-extract registration number and signature</span>
          </span>

          <div className="flex items-center space-x-3">
            {capturedImage ? (
              <>
                <button
                  id="camera-retake-btn"
                  onClick={handleRetake}
                  className="px-3.5 py-2 border border-slate-300 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  id="camera-confirm-btn"
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Use This Scan</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="px-3 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  id="camera-snap-btn"
                  onClick={handleCapture}
                  disabled={!!errorMsg || isCapturing}
                  className="px-5 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] disabled:opacity-50 text-white font-bold text-xs rounded shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Capture Document</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
