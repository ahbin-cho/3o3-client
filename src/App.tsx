import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthenForm } from './components/AuthenForm';
import { CompletedForm } from './components/CompletedForm';
import { Timer } from './components/TImer';

const App:React.FC = () => {
  return (
    <div className="App">
    	<BrowserRouter>
			<Routes>
                <Route path='/auth/complete' element={<CompletedForm/>}/>
                <Route path='/auth/timer' element={<Timer/>}/>
                <Route path='/' element={<AuthenForm/>}/>
			</Routes>
      	</BrowserRouter>
    </div>
  );
}

export default App;
