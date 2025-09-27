import { Routes, Route } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Home from "./pages/Home"
import CreateBudget from "./pages/CreateBudget"
import DisplayBudget from "./pages/DisplayBudget"
import ListBudgets from "./pages/ListBudgets"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/budget/create' element={<CreateBudget />} />
        <Route path='/budgets/list' element={<ListBudgets />} />
        <Route path="/budget/:id" element={<DisplayBudget />} />
      </Routes>
    </>
  )
}

export default App
