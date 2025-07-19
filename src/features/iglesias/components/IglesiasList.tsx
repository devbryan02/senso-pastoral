"use client";

import { Iglesia } from "@/features/iglesias/types";
import { IglesiaCard } from "./IglesiasCard";
import { Church, SearchX } from "lucide-react";

export function IglesiasList({ iglesias }: { iglesias: Iglesia[] }) {
  if (iglesias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-10 h-10 text-base-content/40" />
        </div>
        <h3 className="text-xl font-semibold text-base-content mb-2">
          No se encontraron iglesias
        </h3>
        <p className="text-base-content/60 text-center max-w-md">
          No hay iglesias registradas o ninguna coincide con los criterios de búsqueda.
        </p>
        <button className="btn btn-primary btn-sm gap-2 mt-4">
          <Church className="w-4 h-4" />
          Registrar primera iglesia
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Church className="w-5 h-5 text-primary" />
          <span className="text-lg font-medium">
            {iglesias.length} {iglesias.length === 1 ? 'iglesia encontrada' : 'iglesias encontradas'}
          </span>
        </div>
        
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
            Ordenar por
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
            <li><a>Nombre A-Z</a></li>
            <li><a>Nombre Z-A</a></li>
            <li><a>Fecha de registro</a></li>
            <li><a>Número de miembros</a></li>
          </ul>
        </div>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {iglesias.map((iglesia) => (
          <IglesiaCard key={iglesia.id} iglesia={iglesia} />
        ))}
      </div>
    </div>
  );
}