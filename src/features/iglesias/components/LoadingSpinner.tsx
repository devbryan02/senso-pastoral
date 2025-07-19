"use client";

import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-8">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <p className="text-sm text-base-content/60 mt-2">Cargando iglesias...</p>
    </div>
  );
}