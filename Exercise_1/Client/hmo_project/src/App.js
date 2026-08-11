import './App.css';
import Joi from "joi";
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from "react-hook-form";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllMembers from './members/AllMembers.js';
import GetMember from './members/GetMember.js';
import UpdateMember from './members/UpdateMember.js';
import AddMember from './members/AddMember.js';
import Menu from '../src/extras/Menu.js'
import Graphes from './corona/Graphes.js';

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      {/* <Graphes/> */}

         <Routes>
             <Route path="/" element={<AllMembers />} />
             <Route path="allMembers" element={<AllMembers />} />
             <Route path="addMember" element={<AddMember />} />
             <Route path="getMember/:id" element={<GetMember />} />
             <Route path="editMember/:id" element={<UpdateMember />} />
             <Route path="coronaData" element={<Graphes />} />
             <Route path="*" element={<AllMembers />} />
         </Routes>

    </BrowserRouter>

  );
}

export default App;
