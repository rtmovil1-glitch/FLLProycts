import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Rediseño de aplicación móvil",
      description: "Actualización completa de la interfaz de usuario",
      deadline: "2025-01-15",
      progress: 65,
      tasksCompleted: 13,
      totalTasks: 20,
    },
    {
      id: "2",
      name: "Sistema de gestión de inventario",
      description: "Desarrollo de plataforma web para control de stock",
      deadline: "2025-02-28",
      progress: 30,
      tasksCompleted: 6,
      totalTasks: 20,
    },
    {
      id: "3",
      name: "Campaña de marketing digital",
      description: "Estrategia integral para redes sociales y ads",
      deadline: "2024-12-20",
      progress: 85,
      tasksCompleted: 17,
      totalTasks: 20,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 0,
    };

    setProjects(prev => [...prev, project]);
    setNewProject({ name: "", description: "", deadline: "" });
    setDialogOpen(false);
    toast.success("Proyecto creado exitosamente");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-heading font-bold">Mis Proyectos</h2>
            <p className="text-muted-foreground mt-1">Gestiona y monitorea tus proyectos activos</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary shadow-medium">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading">Crear nuevo proyecto</DialogTitle>
                <DialogDescription>
                  Completa los detalles del proyecto
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del proyecto</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Diseño de sitio web"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe brevemente el proyecto..."
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Fecha límite</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 gradient-primary">
                    Crear
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
