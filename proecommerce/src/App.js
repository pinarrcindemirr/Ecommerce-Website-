import React from 'react'
import Login from './components/login';
import Register from './components/register';
import HomePage from './components/HomePage';
import ElectroCat from './Categories/ElectroCat';
import BabyCategory from './Categories/BabyCategory';
import ClothesCategory from './Categories/ClothesCategory';
import FashionCategory from './Categories/FashionCategory';
import FoodCategory from './Categories/FoodCategory';
import GameCategory from './Categories/GameCategory';
import HealthBeautyCategory from './Categories/HealthBeautyCategory';
import AddProducts from './components/AddProducts';
import DeleteProduct from './components/DeleteProduct';
import UpdateProduct from './components/UpdateProduct';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import AdminPanel from './components/AdminPanel';
import LogOut from './components/LogOut';

const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/HomePage' element={<HomePage/>}/>
            <Route path='/Categories/Electronics' element={<ElectroCat/>}/>
            <Route path='/Categories/BabyToys' element={<BabyCategory/>}/>
            <Route path='/Categories/Fashion' element={<FashionCategory/>}/>
            <Route path='/Categories/Food' element={<FoodCategory/>}/>
            <Route path='/Categories/Cloths' element={<ClothesCategory/>}/>
            <Route path='/Categories/GameAssesories' element={<GameCategory/>}/>
            <Route path='/Categories/HealthBeauty' element={<HealthBeautyCategory/>}/>
            <Route path='/AdminPanel' element={<AdminPanel/>}>
              <Route index element={<Navigate replace to="add" />} /> 
              <Route path='add' element={<AddProducts />} />
              <Route path='delete' element={<DeleteProduct />} />
              <Route path='update' element={<UpdateProduct />} />
            </Route>
            {/*<Route path='/LogOut' element={<LogOut/>}/> */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </QueryClientProvider>
      
  );
}

  export default App;