import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(project.deadline);
  const isUrgent = daysRemaining < 7 && daysRemaining >= 0;
  const isOverdue = daysRemaining < 0;

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="hover:shadow-medium transition-smooth cursor-pointer h-full">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-heading line-clamp-1">{project.name}</CardTitle>
            {isOverdue ? (
              <Badge variant="destructive" className="text-xs">Vencido</Badge>
            ) : isUrgent ? (
              <Badge className="bg-warning text-warning-foreground text-xs">Urgente</Badge>
            ) : (
              <Badge variant="outline" className="text-xs">Activo</Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4" />
              <span>{project.tasksCompleted}/{project.totalTasks} tareas</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(project.deadline)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
