import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu"
import { Landmark, Wallet, Home, Sun, Moon, Menu } from "lucide-react"

export default function Navbar() {
  const [isDark, setIsDark] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
    setIsDark(!isDark)
  }

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span className="text-lg md:text-xl font-semibold">
              BudgetManager
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button variant="ghost" asChild>
                      <Link to="/" className="flex items-center gap-2">
                        <Home size={18} />
                        Home
                      </Link>
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button variant="ghost" asChild>
                      <Link to="/budgets/list" className="flex items-center gap-2">
                        <Landmark size={18} />
                        Budgets
                      </Link>
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button variant="ghost" asChild>
                      <Link to="/budget/create" className="flex items-center gap-2">
                        <Wallet size={18} />
                        New Budget
                      </Link>
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sun size={18} />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon size={18} />
            </div>
            <button
              className="md:hidden p-2 rounded-lg border"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-3 mt-4 md:hidden">
            <Link to="/" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted">
              <Home size={18} /> Home
            </Link>
            <Link
              to="/budgets/list"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted"
            >
              <Landmark size={18} /> Budgets
            </Link>
            <Link
              to="/budget/create"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-muted"
            >
              <Wallet size={18} /> New Budget
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
