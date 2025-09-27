import { useEffect, useState } from "react";
import { listBudgets } from "@/services/api";
import BudgetCard from "@/components/cards/BudgetCard";
import {
  Landmark,
  Plus
} from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ListBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await listBudgets(1, 20);
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const refreshBudgets = () => {
    fetchBudgets();
  }

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading budgets...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex flex-row gap-2 items-center">
        <Landmark />
        Budgets
      </h1>

      {budgets.length === 0 ? (<>
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
            <BudgetCard key={budget.id} budget={budget} refreshBudgetsTrigger={refreshBudgets} />
          ))}
        </div>
      )}
    </div>
  );
}
