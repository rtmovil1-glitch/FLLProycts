import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login exitoso
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-subtle p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading">Bienvenido a ProjectFlow</CardTitle>
          <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button type="submit" className="w-full gradient-primary">
              Iniciar sesión
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">¿No tienes cuenta? </span>
            <Link to="/register" className="text-primary font-medium hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
