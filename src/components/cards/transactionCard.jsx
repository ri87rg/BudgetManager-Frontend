import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowUp } from "lucide-react";

const TransactionCard = ({ transaction }) => {
  if (!transaction) {
    return (
      <div className="text-center text-gray-500 italic">
        No transaction data
      </div>
    );
  }

  const { title, amount, description, transaction_type, timestamp } = transaction;
  const isWithdrawal = transaction_type === "withdrawal";

  return (
    <Card className="w-full max-w-[600px] mx-auto my-4 shadow-md">
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="flex flex-col">
          <CardTitle className="text-base font-bold">
            {title || "Untitled Transaction"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {new Date(timestamp).toLocaleString()}
          </CardDescription>
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium self-start sm:self-center ${
            isWithdrawal
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isWithdrawal ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUp className="w-4 h-4" />
          )}
          {transaction_type.charAt(0).toUpperCase() + transaction_type.slice(1)}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Amount</span>
          <span
            className={`text-lg font-bold ${
              isWithdrawal ? "text-red-600" : "text-green-600"
            }`}
          >
            IQD {amount.toLocaleString()}
          </span>
        </div>
        <Separator />

        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No description provided.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
