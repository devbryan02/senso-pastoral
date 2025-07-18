import { User, Settings, LogOut } from 'lucide-react';

function DropDownDashboard() {
    return ( 
        <>
        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar transition hover:bg-primary/20">
                                <div className="w-10 rounded-full bg-primary flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary-content" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg bg-base-100 rounded-xl w-56 border border-base-200"
                            >
                                <li>
                                    <a className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-primary/10 transition">
                                        <User className="w-4 h-4 text-primary" />
                                        Perfil
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-primary/10 transition">
                                        <Settings className="w-4 h-4 text-primary" />
                                        Configuración
                                    </a>
                                </li>
                                <li>
                                    <form action="/api/auth/logout" method="POST">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-error/10 text-error transition w-full"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Cerrar Sesión
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </div>
        </>
     );
}

export default DropDownDashboard;