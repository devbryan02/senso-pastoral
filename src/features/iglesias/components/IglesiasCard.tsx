"use client";

import { Iglesia } from "@/features/iglesias/types";
import { Church, MapPin, Users, Edit, Trash2, Building } from "lucide-react";

export function IglesiaCard({ iglesia }: { iglesia: Iglesia }) {

  const formattedDate = new Date(iglesia.fecha_registro).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Church className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-base-content">{iglesia.nombre}</h2>
              <p className="text-sm text-base-content/70">{formattedDate}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
              <li><a className="gap-2"><Edit className="w-4 h-4" />Editar</a></li>
              <li><a className="gap-2 text-error"><Trash2 className="w-4 h-4" />Eliminar</a></li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-base-content/70">
            <MapPin className="w-4 h-4 text-info flex-shrink-0" />
            <span className="text-sm">{iglesia.direccion}</span>
          </div>

          <div className="flex items-center gap-3 text-base-content/70">
            <Building className="w-4 h-4 text-success flex-shrink-0" />
            <span className="text-sm">{iglesia.provincia}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="divider my-4"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm text-base-content/70">{iglesia.cant_miembros} miembros</span>
          </div>
        </div>
      </div>
    </div>
  );
}