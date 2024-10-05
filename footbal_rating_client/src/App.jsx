import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MatchPage from "./pages/MatchPage";
import DatePicker from "./components/DatePicker";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="datepicker" element={<DatePicker />}></Route>
          <Route path="match/:matchId" element={<MatchPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
