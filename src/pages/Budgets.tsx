import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Plus, Trash2, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface BudgetItem {
  id: string;
  concept: string;
  type: "income" | "expense";
  amount: number;
  responsible: string;
}

const Budgets = () => {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: "1", concept: "Desarrollo de software", type: "expense", amount: 15000, responsible: "Carlos López" },
    { id: "2", concept: "Diseño UI/UX", type: "expense", amount: 8000, responsible: "María García" },
    { id: "3", concept: "Pago del cliente - Fase 1", type: "income", amount: 30000, responsible: "Cliente A" },
    { id: "4", concept: "Infraestructura cloud", type: "expense", amount: 2500, responsible: "DevOps Team" },
    { id: "5", concept: "Pago del cliente - Fase 2", type: "income", amount: 25000, responsible: "Cliente A" },
  ]);

  const [newItem, setNewItem] = useState<Partial<BudgetItem>>({
    concept: "",
    type: "expense",
    amount: 0,
    responsible: "",
  });

  const totalIncome = items.filter(i => i.type === "income").reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = items.filter(i => i.type === "expense").reduce((sum, i) => sum + i.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleAddItem = () => {
    if (!newItem.concept || !newItem.amount || !newItem.responsible) {
      toast.error("Completa todos los campos");
      return;
    }

    const item: BudgetItem = {
      id: Date.now().toString(),
      concept: newItem.concept,
      type: newItem.type || "expense",
      amount: Number(newItem.amount),
      responsible: newItem.responsible,
    };

    setItems(prev => [...prev, item]);
    setNewItem({ concept: "", type: "expense", amount: 0, responsible: "" });
    toast.success("Item agregado al presupuesto");
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item eliminado");
  };

  const handleExport = () => {
    toast.success("Exportando presupuesto...");
    // Aquí iría la lógica real de exportación
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-heading font-bold">Presupuestos</h2>
            <p className="text-muted-foreground mt-1">Gestiona ingresos y gastos de tus proyectos</p>
          </div>
          <Button onClick={handleExport} className="gradient-primary shadow-medium">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${totalExpense.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <div className={`w-8 h-8 rounded-full ${balance >= 0 ? 'bg-primary/10' : 'bg-warning/10'} flex items-center justify-center`}>
                <DollarSign className={`w-4 h-4 ${balance >= 0 ? 'text-primary' : 'text-warning'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-primary' : 'text-warning'}`}>
                ${balance.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="font-heading">Agregar Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <Input
                placeholder="Concepto"
                value={newItem.concept}
                onChange={(e) => setNewItem(prev => ({ ...prev, concept: e.target.value }))}
              />
              <Select
                value={newItem.type}
                onValueChange={(value: "income" | "expense") => setNewItem(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Ingreso</SelectItem>
                  <SelectItem value="expense">Gasto</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Monto"
                value={newItem.amount || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, amount: Number(e.target.value) }))}
              />
              <Input
                placeholder="Responsable"
                value={newItem.responsible}
                onChange={(e) => setNewItem(prev => ({ ...prev, responsible: e.target.value }))}
              />
              <Button onClick={handleAddItem} className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="font-heading">Detalles del Presupuesto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.concept}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === "income"
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {item.type === "income" ? "Ingreso" : "Gasto"}
                        </span>
                      </TableCell>
                      <TableCell className={item.type === "income" ? "text-success font-semibold" : "text-destructive font-semibold"}>
                        ${item.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.responsible}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Budgets;
