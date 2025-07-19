'use client';

import { useIglesias } from "@/features/iglesias/hooks/useIglesias";
import { IglesiaSearchBar } from "@/features/iglesias/components/IglesiasSearchBar"
import { IglesiasList } from "@/features/iglesias/components/IglesiasList";
import { LoadingSpinner } from "@/features/iglesias/components/LoadingSpinner";
import { ErrorMessage } from "@/features/iglesias/components/ErrorMessage";
import { Church, Plus, Users, MapPin } from "lucide-react";

export default function IglesiasClient() {
  const { iglesias, loading, error, searchIglesias } = useIglesias();

  const handleSearch = (term: string) => {
    searchIglesias(term);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Church className="w-6 h-6 text-primary-content" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-base-content">Iglesias</h1>
            <p className="text-base-content/70">Gestiona las iglesias del sistema</p>
          </div>
        </div>
        
        <button className="btn btn-primary gap-2">
          <Plus className="w-5 h-5" />
          Nueva Iglesia
        </button>
      </div>

      {/* Search Bar */}
      <div className="card bg-base-200">
        <div className="card-body p-6">
          <IglesiaSearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Content Section */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          )}
          
          {error && (
            <div className="py-8">
              <ErrorMessage message={error} />
            </div>
          )}
          
          {!loading && !error && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-base-content">
                  Lista de Iglesias
                </h2>
                <div className="badge badge-outline">
                  {iglesias?.length || 0} resultados
                </div>
              </div>
              <IglesiasList iglesias={iglesias} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}