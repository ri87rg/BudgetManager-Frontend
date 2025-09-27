import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Budget } from "@/services/api";
import UpdateBudgetDialog from "@/components/dialogs/UpdateBudgetDialog"
import DeleteBudgetDialog from "@/components/dialogs/DeleteBudgetDialog"

type Props = {
  budget: Budget;
  refreshBudgetsTrigger: () => void;
};

export default function BudgetCard({ budget, refreshBudgetsTrigger }: Props) {
  const navigate = useNavigate()
  return (
    <Card className="w-full sm:w-[320px] shadow-md rounded-2xl hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold truncate">
          {budget.name}
        </CardTitle>
        <Wallet className="h-6 w-6 text-muted-foreground" />
      </CardHeader>

      <CardContent className="">
        <p className="text-sm text-muted-foreground">
          Notes: {budget.notes?.length ?? 0}
        </p>
        <p className="text-sm text-muted-foreground">
          Transactions: {budget.transactions?.length ?? 0}
        </p>
        <p className="text-base font-bold mt-2">
          Total Value: {budget.total_value?.toLocaleString() ?? 0}
        </p>

        <Button className="w-full mt-4" onClick={() => navigate(`/budget/${budget.id}`)}>
          View Details
        </Button>

        <div className="flex flex-row justify-end items-center gap-2 mt-3 flex-wrap">
          <UpdateBudgetDialog 
            budget_id={budget.id} 
            name={budget.name} 
            refreshBudgetsTrigger={refreshBudgetsTrigger} 
          />
          <DeleteBudgetDialog 
            budget_id={budget.id} 
            refreshBudgetsTrigger={refreshBudgetsTrigger} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
