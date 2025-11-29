import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, FileText, Download, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Report {
  id: string;
  projectName: string;
  date: string;
  content: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      projectName: "Rediseño de aplicación móvil",
      date: "2024-11-28",
      content: `# Reporte del Proyecto - 28/11/2024

## Resumen Ejecutivo
El proyecto se encuentra en fase de desarrollo activo con un progreso del 65%. El equipo ha completado exitosamente las tareas de diseño y está avanzando en la implementación técnica.

## Estado de Tareas
- ✅ Completadas: 13
- 🔄 En progreso: 5
- ⏳ Pendientes: 2

## Análisis de Progreso
El desarrollo de la API REST está al 60% de completitud. La integración de base de datos avanza según lo planificado. Se recomienda priorizar las pruebas de funcionalidad en la próxima iteración.`,
    },
    {
      id: "2",
      projectName: "Sistema de gestión de inventario",
      date: "2024-11-20",
      content: `# Reporte del Proyecto - 20/11/2024

## Resumen Ejecutivo
El proyecto está en fase inicial con un progreso del 30%. El equipo está trabajando en la arquitectura base del sistema.

## Estado de Tareas
- ✅ Completadas: 6
- 🔄 En progreso: 8
- ⏳ Pendientes: 6

## Análisis de Progreso
La estructura de la base de datos está definida. Se está implementando el sistema de autenticación. El diseño de interfaz está en revisión con el cliente.`,
    },
  ]);

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
  };

  const handleCopyReport = () => {
    if (selectedReport) {
      navigator.clipboard.writeText(selectedReport.content);
      toast.success("Reporte copiado al portapapeles");
    }
  };

  const handleGenerateNewReport = async () => {
    setGeneratingReport(true);
    
    // Simular generación con IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newReport: Report = {
      id: Date.now().toString(),
      projectName: "Nuevo Proyecto",
      date: new Date().toISOString().split('T')[0],
      content: `# Reporte del Proyecto - ${new Date().toLocaleDateString('es-ES')}

## Resumen Ejecutivo
Reporte generado automáticamente con análisis de progreso del proyecto.

## Estado de Tareas
- ✅ Completadas: 0
- 🔄 En progreso: 0
- ⏳ Pendientes: 0

## Recomendaciones
Reporte listo para ser personalizado según el estado actual del proyecto.`,
    };

    setReports(prev => [newReport, ...prev]);
    setGeneratingReport(false);
    toast.success("Reporte generado exitosamente");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-heading font-bold">Reportes</h2>
            <p className="text-muted-foreground mt-1">Historial de reportes generados con IA</p>
          </div>
          <Button onClick={handleGenerateNewReport} className="gradient-primary shadow-medium" disabled={generatingReport}>
            <Sparkles className="w-4 h-4 mr-2" />
            {generatingReport ? "Generando..." : "Generar Nuevo Reporte"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Total Reportes</h3>
            </div>
            <p className="text-3xl font-bold">{reports.length}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold">Este Mes</h3>
            </div>
            <p className="text-3xl font-bold">
              {reports.filter(r => {
                const reportDate = new Date(r.date);
                const now = new Date();
                return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">Último Reporte</h3>
            </div>
            <p className="text-lg font-medium">
              {reports.length > 0 ? new Date(reports[0].date).toLocaleDateString('es-ES') : 'N/A'}
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Historial de Reportes</h3>
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="p-6 hover:shadow-medium transition-smooth cursor-pointer" onClick={() => handleViewReport(report)}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h4 className="font-semibold text-lg">{report.projectName}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(report.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleViewReport(report);
                    }}>
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(report.content);
                      toast.success("Reporte copiado");
                    }}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {selectedReport?.projectName}
              </DialogTitle>
              <DialogDescription>
                Reporte generado el {selectedReport && new Date(selectedReport.date).toLocaleDateString('es-ES')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-sans">{selectedReport?.content}</pre>
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
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Reports;
