"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="alert alert-error shadow-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium">Error</h3>
          <div className="text-sm opacity-90">{message}</div>
        </div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn btn-sm btn-outline btn-error gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}