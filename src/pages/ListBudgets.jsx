import { useEffect, useState } from "react";
import { listBudgets } from "@/services/api";
import BudgetCard from "@/components/cards/BudgetCard";
import {
  Landmark,
  Plus
} from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budgetStore";

export default function ListBudgets() {
  const fetchAllBudgets = useBudgetStore((state) => state.fetchAllBudgets);
  const budgets = useBudgetStore((state) => state.budgets);
  const loading = useBudgetStore((state) => state.loading);
  const error = useBudgetStore((state) => state.error);

  useEffect(() => {
    fetchAllBudgets(1, 100);
  }, []);

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading budgets...</p>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh_-_85px)]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex flex-row gap-2 items-center">
        <Landmark />
        Budgets
      </h1>

      {!budgets || budgets.length === 0 ? (<>
        <div className="flex flex-col justify-center items-center gap-2 h-[calc(70vh_-_85px)]">
          <p className="text-muted-foreground">You Do NOT Have Any Budgets Yet.</p>
          <Link to="/budget/create">
            <Button>
              <Plus />
              Create new Budget
            </Button>
          </Link>
        </div>
      </>) : (
        <div className="flex flex-row flex-wrap justify-center items-center gap-6">
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </div>
  );
}
