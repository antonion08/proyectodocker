"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  FileClock,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  LineChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/layout/sidebar-context";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cursos",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Tareas",
    href: "/assignments",
    icon: FileClock,
  },
  {
    title: "Calendario",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Mensajes",
    href: "/messages",
    icon: MessageSquare,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Cerrar el sidebar en móvil cuando cambia la ruta
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Overlay para móvil */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "w-56 flex flex-col justify-between h-screen transition-all duration-300 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-md",
          isOpen ? "w-56" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        style={{
          position: "relative",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 50,
          width: isOpen ? "14rem" : "4rem"
        }}
      >
        <div className="flex h-14 items-center justify-between px-3 border-b border-white/10">
          {isOpen ? (
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              <span className="text-base font-semibold text-white hidden sm:inline">EDUNEXUS</span>
            </Link>
          ) : (
            <div className="flex w-full justify-center">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Menú principal */}
        <nav className="py-6" aria-label="Navegación principal">
          <ul className="flex flex-col gap-4 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary/60",
                      isActive
                        ? "bg-primary/30 text-primary shadow-md"
                        : "text-white/80 hover:bg-white/10 hover:text-white",
                      !isOpen && "justify-center px-0"
                    )}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={!isOpen ? item.title : undefined}
                    tabIndex={isMobileOpen ? -1 : 0}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="h-7 w-7 flex-shrink-0" />
                    {isOpen && <span className="whitespace-nowrap text-base hidden sm:inline">{item.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Usuario fijo abajo */}
        <div className={cn(
          "border-t border-white/10 flex items-center gap-3 px-4 py-4 transition-all duration-300", 
          !isOpen && "justify-center px-0"
        )} style={{ marginTop: "auto" }}>
          <div className="h-9 w-9 rounded-full bg-primary/30 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-primary font-semibold text-lg">U</span>
          </div>
          {isOpen && (
            <div className="hidden sm:block">
              <p className="text-base font-semibold text-white">Usuario</p>
              <p className="text-xs text-white/60">usuario@ejemplo.com</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
} 