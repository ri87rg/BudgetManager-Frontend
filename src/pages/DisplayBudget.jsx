import { getBudget } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SquarePen } from "lucide-react";

import NotesHistoryDialog from "@/components/dialogs/ListNotesHistoryDialog";

import NoteCard from "../components/cards/NoteCard";
import TransactionCard from "@/components/cards/transactionCard";

import AddDenominationDialog from "@/components/dialogs/AddDenominationDialog";
import TransactionDialog from "@/components/dialogs/TransactionDialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DisplayBudget() {
  const { id } = useParams();
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [notesSortOrder, setNotesSortOrder] = useState("desc");
  const [isEditMode, setIsEditMode] = useState(false);
  const [unStable, setUnStable] = useState(false);

  const fetchBudget = async () => {
    try {
      const res = await getBudget(id);
      setBudget(res);
    } catch (err) {
      console.error("Failed to fetch budget:", err);
      setError("Could not load budget.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
    refreshHistory();
  }, [id]);

  const refreshBudget = () => {
    fetchBudget();
    refreshHistory();
  };

  const refreshHistory = () => {
    setUnStable(!unStable)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh_-_85px)]">
        <p className="text-gray-500">Loading budget...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh_-_85px)]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh_-_85px)]">
        <p className="text-gray-500">No budget found.</p>
      </div>
    );
  }

  const sortedTransactions = budget.transactions
    ? [...budget.transactions].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      })
    : [];

  const sortedNotes = budget.notes
    ? [...budget.notes].sort((a, b) => {
        return notesSortOrder === "desc"
          ? b.denomination - a.denomination
          : a.denomination - b.denomination;
      })
    : [];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 sm:mt-10 mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1 px-2">
            {budget.name || "Untitled Budget"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-2">
            Manage your balance and track activity
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="text flex flex-col justify-center items-center">
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">Current Balance</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center">
              IQD{" "}
              {budget.total_value
                ? budget.total_value.toLocaleString()
                : "00.0"}
            </h1>
          </div>
          <div className="btns-container flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-md">
            <AddDenominationDialog id={id} refreshBudget={refreshBudget} />
            <TransactionDialog budget_id={id} refreshBudget={refreshBudget} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 mt-12 sm:mt-16 lg:mt-20 w-full">
          <Card className="w-full lg:flex-1">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <div className="text-center sm:text-left">
                <CardTitle className="text-xl sm:text-2xl">Transactions</CardTitle>
                <CardDescription className="text-base sm:text-[18px]">
                  {sortedTransactions.length} total transactions:{" "}
                  <span
                    className={`font-semibold ${
                      budget.adjustments_total > 0
                        ? "text-green-600"
                        : budget.adjustments_total < 0
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {budget.adjustments_total
                      ? budget.adjustments_total.toLocaleString()
                      : "0"}
                  </span>
                </CardDescription>
              </div>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest first</SelectItem>
                  <SelectItem value="asc">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex flex-col">
              {sortedTransactions && sortedTransactions.length > 0 ? (
                <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[800px] w-full rounded-md border">
                  {sortedTransactions.map((transaction, idx) => (
                    <TransactionCard key={idx} transaction={transaction} />
                  ))}
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground text-center col-span-full py-6">
                  No transactions available.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="w-full lg:flex-1 mt-6 lg:mt-0">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                  <CardTitle className="text-xl sm:text-2xl text-center sm:text-left">
                    Denomination Notes
                  </CardTitle>
                  <div className="flex justify-center sm:justify-end">
                    <NotesHistoryDialog budget_id={budget.id} updateTrigger={unStable} />
                  </div>
                </div>
                <div className="flex justify-center sm:justify-end">
                  <Select
                    value={notesSortOrder}
                    onValueChange={setNotesSortOrder}
                  >
                    <SelectTrigger className="w-full sm:w-[160px]">
                      <SelectValue placeholder="Sort by value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Highest first</SelectItem>
                      <SelectItem value="asc">Lowest first</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col">
              {sortedNotes && sortedNotes.length > 0 ? (
                <div className="max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px] overflow-y-auto">
                  {sortedNotes.map((note, idx) => (
                    <NoteCard
                      key={idx}
                      budget_id={id}
                      note={note}
                      isEditMode={isEditMode}
                      refreshBudget={refreshBudget}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center col-span-full py-6">
                  No denominations available.
                </p>
              )}
            </CardContent>
            {sortedNotes && sortedNotes.length > 0 && (
              <CardFooter className="flex justify-center sm:justify-end pt-4">
                <Button 
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="w-full sm:w-auto"
                >
                  <SquarePen className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
      <div className="py-20 sm:py-32 lg:py-40"></div>
    </div>
  );
}