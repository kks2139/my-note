import React from 'react';
import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import './App.css';

function App() {
  return (
    <div className="app dark">
      <Route path='/' exact render={()=> <div>루트</div>}></Route>
      <Route path='/welcome' render={(props)=> <Welcome {...props}></Welcome>}></Route>
      <Route path='/main' render={(props)=> <Main {...props}></Main>}></Route>
    </div>
  );
}

export default App;
