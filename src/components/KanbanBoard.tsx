import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
}

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const KanbanBoard = ({ tasks, setTasks }: KanbanBoardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    dueDate: "",
    status: "pending" as Task["status"],
  });

  const columns = [
    { id: "pending", title: "Pendiente", color: "bg-muted" },
    { id: "in-progress", title: "En Progreso", color: "bg-primary/10" },
    { id: "completed", title: "Completado", color: "bg-success/10" },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
    };
    setTasks(prev => [...prev, task]);
    setNewTask({ title: "", assignee: "", dueDate: "", status: "pending" });
    setDialogOpen(false);
    toast.success("Tarea creada exitosamente");
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast.success("Tarea actualizada");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-semibold">Tablero Kanban</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Crear nueva tarea</DialogTitle>
              <DialogDescription>Agrega una tarea al tablero</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Diseñar mockups"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Responsable</Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  placeholder="Nombre del responsable"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Fecha de entrega</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado inicial</Label>
                <Select
                  value={newTask.status}
                  onValueChange={(value: Task["status"]) => setNewTask(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="in-progress">En Progreso</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="space-y-3"
            onDrop={(e) => handleDrop(e, column.id as Task["status"])}
            onDragOver={handleDragOver}
          >
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{column.title}</h4>
              <Badge variant="secondary" className="text-xs">
                {tasks.filter(t => t.status === column.id).length}
              </Badge>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="cursor-move hover:shadow-medium transition-smooth"
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
