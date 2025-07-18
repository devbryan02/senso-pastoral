import React from 'react';
import Link from 'next/link';
import { Home, Users, Church, Building2, Shield, Menu, Bell, Search, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation'
import DropDownDashboard from '@/features/dashboard/DropDown';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Check if user is authenticated
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect('/auth/login');
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="min-h-full w-64 bg-base-200">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 py-6 border-b">
                        <Church className="w-8 h-8 text-primary" />
                        <h1 className="text-xl font-bold">SENSO</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4">
                        <ul className="menu w-full">
                            <li>
                                <Link href="/dashboard" className="flex items-center gap-3">
                                    <Home className="w-5 h-5 text-primary" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/iglesias" className="flex items-center gap-3">
                                    <Church className="w-5 h-5 text-secondary" />
                                    <span>Iglesias</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/hijos" className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-accent" />
                                    <span>Hijos</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/anexos" className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-info" />
                                    <span>Anexos</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/cargos" className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-warning" />
                                    <span>Cargos</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* User */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                            <User className="w-8 h-8 text-success" />
                            <div>
                                <p className="font-medium text-sm">Admin</p>
                                <p className="text-xs opacity-60">admin@senso.com</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Main content */}
            <div className="drawer-content flex flex-col">
                {/* Top navbar */}
                <header className="navbar bg-base-100 border-b">
                    <div className="navbar-start">
                        <label htmlFor="drawer-toggle" className="btn btn-ghost btn-sm lg:hidden">
                            <Menu className="w-5 h-5" />
                        </label>
                    </div>

                    <div className="navbar-center">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="input input-bordered input-sm w-64"
                            />
                        </div>
                    </div>

                    <div className="navbar-end gap-2">
                        <button className="btn btn-ghost btn-sm">
                            <Bell className="w-5 h-5" />
                        </button>
                        <DropDownDashboard />
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}