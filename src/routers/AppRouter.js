import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "../components/home/HomeScreen";
import { MobileScreen } from "../components/mobile/MobileScreen";
import { Navbar } from "../components/ui/Navbar";

export const AppRouter = () => {

  return (

    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/mobiles" element={<HomeScreen />} />
          <Route path="/mobiles/:id" element={<MobileScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}