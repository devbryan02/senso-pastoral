
"use client";

import { User, Settings, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

function DropDownDashboard({ emailUser }: { emailUser: string }) {

    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/auth/login';
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
                <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8 h-8">
                        <User className="w-4 h-4" />
                    </div>
                </div>
                <span className="text-sm font-medium hidden sm:block">{emailUser}</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-48 p-2 shadow">
                <li>
                    <a className="text-sm">
                        <User className="w-4 h-4" />
                        Perfil
                    </a>
                </li>
                <li>
                    <a className="text-sm">
                        <Settings className="w-4 h-4" />
                        Configuración
                    </a>
                </li>
                <div className="divider my-1"></div>
                <li>
                    <button type="button" className="text-sm text-error w-full" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default DropDownDashboard;