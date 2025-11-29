import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import KanbanBoard from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [reportOpen, setReportOpen] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [report, setReport] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Diseño de wireframes", assignee: "María García", dueDate: "2024-12-05", status: "completed" },
    { id: "2", title: "Desarrollo de API REST", assignee: "Carlos López", dueDate: "2024-12-10", status: "in-progress" },
    { id: "3", title: "Integración de base de datos", assignee: "Ana Martínez", dueDate: "2024-12-12", status: "in-progress" },
    { id: "4", title: "Testing de funcionalidades", assignee: "Pedro Sánchez", dueDate: "2024-12-15", status: "pending" },
    { id: "5", title: "Documentación técnica", assignee: "Laura Fernández", dueDate: "2024-12-18", status: "pending" },
  ]);

  const progress = Math.round((tasks.filter(t => t.status === "completed").length / tasks.length) * 100);

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    setReportOpen(true);
    
    // Simular generación con IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockReport = `# Reporte del Proyecto - ${new Date().toLocaleDateString('es-ES')}

## Resumen Ejecutivo
El proyecto se encuentra en fase de desarrollo activo con un progreso del ${progress}%. El equipo ha completado exitosamente las tareas de diseño y está avanzando en la implementación técnica.

## Estado de Tareas
- ✅ Completadas: ${tasks.filter(t => t.status === "completed").length}
- 🔄 En progreso: ${tasks.filter(t => t.status === "in-progress").length}
- ⏳ Pendientes: ${tasks.filter(t => t.status === "pending").length}

## Análisis de Progreso
El desarrollo de la API REST está al 60% de completitud. La integración de base de datos avanza según lo planificado. Se recomienda priorizar las pruebas de funcionalidad en la próxima iteración.

## Próximos Pasos
1. Finalizar desarrollo de API REST
2. Completar integración de base de datos
3. Iniciar fase de testing
4. Documentar funcionalidades implementadas

## Recomendaciones
- Considerar asignar recursos adicionales para acelerar las pruebas
- Programar una revisión de código antes del cierre de sprint
- Mantener comunicación constante con stakeholders`;

    setReport(mockReport);
    setGeneratingReport(false);
    toast.success("Reporte generado exitosamente");
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(report);
    toast.success("Reporte copiado al portapapeles");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-heading font-bold">Rediseño de aplicación móvil</h2>
            <p className="text-muted-foreground mt-1">Gestiona las tareas y el progreso del proyecto</p>
          </div>
          <Button onClick={handleGenerateReport} className="gradient-primary shadow-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Generar Reporte con IA
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-6 rounded-lg shadow-soft border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Progreso Total</h3>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-2xl font-bold">{progress}%</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-soft border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">Fecha Límite</h3>
            </div>
            <p className="text-2xl font-bold">15 Ene 2025</p>
            <p className="text-sm text-muted-foreground mt-1">En 22 días</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-soft border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold">Tareas</h3>
            </div>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === "completed").length}/{tasks.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Completadas</p>
          </div>
        </div>

        <KanbanBoard tasks={tasks} setTasks={setTasks} />

        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Reporte Generado con IA
              </DialogTitle>
              <DialogDescription>
                Análisis automático del estado del proyecto
              </DialogDescription>
            </DialogHeader>
            {generatingReport ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted-foreground">Generando reporte con IA...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-sans">{report}</pre>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleCopyReport} variant="outline" className="flex-1">
                    Copiar
                  </Button>
                  <Button className="flex-1 gradient-primary">
                    Descargar PDF
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
