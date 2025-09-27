import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
  ResizableHandle, 
  ResizablePanelGroup, 
  ResizablePanel 
} from "@/components/ui/resizable"
import {
  Plus,
  List,
  Banknote,
  ArrowRightLeft,
  History,
  Rocket
} from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  return (
    <div>
      <div className="hero flex justify-center items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] px-4">
        <div className="content flex flex-col justify-center items-center gap-6 text-center max-w-3xl">
          <div className="text flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Take Control of Your Budget
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Manage your money with precision. Track denominations, handle transactions, 
              and monitor your budget history all in one place.
            </p>
          </div>
          <div className="btns-container flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none" asChild>
              <Link to='/budget/create' className="flex items-center justify-center gap-2">
                <Plus />
                Create New Budget
              </Link>
            </Button>
            <Button variant="secondary" className="flex-1 sm:flex-none" asChild>
              <Link to='/budgets/list' className="flex items-center justify-center gap-2">
                <List />
                List All Budgets
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="features flex flex-col justify-center items-center gap-12 py-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">Everything You Need</h2>
        <ResizablePanelGroup
          direction={isSmallScreen ? "vertical" : "horizontal"}
          className={`w-full max-w-5xl border rounded-lg ${
            isSmallScreen ? "min-h-[900px]" : "min-h-[280px]"
          }`}
        >
          <ResizablePanel defaultSize={100/3}>
            <div className="flex flex-col items-center justify-center gap-3 p-6 h-full">
              <span className="w-14 h-14 flex justify-center items-center rounded-lg bg-muted">
                <Banknote className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-medium">Denomination Tracking</h3>
              <p className="text-sm text-muted-foreground text-center">
                Track bills and coins with precise quantities and values
              </p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={100/3}>
            <div className="flex flex-col items-center justify-center gap-3 p-6 h-full">
              <span className="w-14 h-14 flex justify-center items-center rounded-lg bg-muted">
                <ArrowRightLeft className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-medium">Smart Transactions</h3>
              <p className="text-sm text-muted-foreground text-center">
                Handle deposits and withdrawals with fractional amounts
              </p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={100/3}>
            <div className="flex flex-col items-center justify-center gap-3 p-6 h-full">
              <span className="w-14 h-14 flex justify-center items-center rounded-lg bg-muted">
                <History className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-medium">Complete History</h3>
              <p className="text-sm text-muted-foreground text-center">
                View detailed history of all notes and transactions
              </p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="call-to-action flex flex-col justify-center items-center gap-6 py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">Ready to Start Managing?</h2>
        <p className="text-base sm:text-lg text-muted-foreground text-center">
          Create your first budget and take control of your finances today
        </p>
        <Button size="lg" asChild>
          <Link to='/budget/create' className="flex items-center justify-center gap-2">
            <Rocket />
            Get Started Now
          </Link>
        </Button>
      </div>

      <hr />

      <div className="py-6 text-center text-sm text-muted-foreground">
        &copy; 2025 BudgetManager. All rights reserved.
      </div>
    </div>
  )
}
