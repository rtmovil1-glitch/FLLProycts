import { LayoutDashboard, FolderKanban, DollarSign, FileText, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Proyectos", url: "/projects", icon: FolderKanban },
  { title: "Presupuestos", url: "/budgets", icon: DollarSign },
  { title: "Reportes", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarGroupLabel className={open ? "" : "sr-only"}>
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent transition-smooth"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-sidebar-accent transition-smooth"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {open && <span className="ml-2">Cerrar sesión</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
