import React, { use } from 'react';
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

    const emailUser = session.user.email?.slice(0, 15) || '';

    return (
        <div className="drawer lg:drawer-open">
            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="min-h-full w-72 bg-base-200/50 backdrop-blur-sm border-r border-base-300">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-6 py-8 border-b border-base-300">
                        <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-xl w-10 h-10">
                                <Church className="w-6 h-6" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-base-content">SENSO</h1>
                            <p className="text-xs text-base-content/60">Sistema de Gestión</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 flex-1">
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-base-content/60 mb-3 px-3">PRINCIPAL</p>
                            <ul className="menu menu-sm w-full">
                                <li>
                                    <Link href="/dashboard" className="rounded-lg mb-1">
                                        <Home className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-semibold text-base-content/60 mb-3 px-3">GESTIÓN</p>
                            <ul className="menu menu-sm w-full">
                                <li>
                                    <Link href="/dashboard/iglesias" className="rounded-lg mb-1">
                                        <Church className="w-5 h-5" />
                                        <span>Iglesias</span>
                                        <div className="badge badge-primary badge-sm">12</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/hijos" className="rounded-lg mb-1">
                                        <Users className="w-5 h-5" />
                                        <span>Hijos</span>
                                        <div className="badge badge-secondary badge-sm">245</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/anexos" className="rounded-lg mb-1">
                                        <Building2 className="w-5 h-5" />
                                        <span>Anexos</span>
                                        <div className="badge badge-accent badge-sm">8</div>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-base-content/60 mb-3 px-3">ADMINISTRACIÓN</p>
                            <ul className="menu menu-sm w-full">
                                <li>
                                    <Link href="/dashboard/cargos" className="rounded-lg mb-1">
                                        <Shield className="w-5 h-5" />
                                        <span>Cargos</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>
            </div>

            {/* Main content */}
            <div className="drawer-content flex flex-col min-h-screen">
                {/* Top Navbar */}
                <header className="sticky top-0 z-10 bg-base-100/80 backdrop-blur-md border-b border-base-300">
                    <div className="container mx-auto flex justify-end items-center py-2 px-6 max-w-7xl">
                        <DropDownDashboard emailUser={emailUser} />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 bg-base-200">
                    <div className="container mx-auto p-6 max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}