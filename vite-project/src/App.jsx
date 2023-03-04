import { Link, Route, Routes } from "react-router-dom";
import CreateBeverage from "./backend/CreateBeverage";
import BeverageCard from "./components/BeverageCard";
import UpdateBeverage from "./backend/UpdateBeverage"
import ListBeverage from "./components/ListBeverage";
import UploadVideo from "./backend/UploadVideo.";
import LoginPage from "./components/LoginPage";
import NavbarTop from "./components/NavbarTop";
import Beverage from './backend/Beverage'
import Video from "./components/Video";

function App() {
  return (
    <div className="App">
      <NavbarTop/>
      <Routes>
        <Route path="/" element={<BeverageCard />}/>
        <Route path="/beverage" element={<Beverage />}/>
        <Route path="/beverage/create" element={<CreateBeverage/>} />
        <Route path="/beverage/update/:id" element={<UpdateBeverage/>} />
        <Route path="/beverage/upload" element={<UploadVideo/>} />
        <Route path="/list" element={<ListBeverage/>}/>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/video" element={<Video/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
