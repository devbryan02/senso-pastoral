"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export function IglesiaSearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleClear = () => {
    setTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="join w-full">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar iglesias por nombre, ubicación..."
            className="input input-bordered join-item w-full pl-12 pr-12"
          />
          {term && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary join-item"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </form>
  );
}