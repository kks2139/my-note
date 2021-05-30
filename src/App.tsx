import React, { useState } from 'react';
import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import './App.css';

interface userInfo {

}

interface globalProps {
  onLogout : ()=> void;
  userInfo : userInfo | null;
}

export const appContext = React.createContext<globalProps | null>(null);

function App() {
  const [userInfo, setUserInfo] = useState<userInfo | null>({});
  
  const onLogin = ()=>{
    
  }

  const onLogout = ()=>{

  }

  return (
    <div className="app dark">
      <appContext.Provider value={{onLogout, userInfo}}>
        <Route path='/' exact render={()=> <div>루트</div>}></Route>
        <Route path='/welcome' render={(props)=> <Welcome {...props}></Welcome>}></Route>
        <Route path='/main' render={(props)=> <Main {...props}></Main>}></Route>
      </appContext.Provider>
    </div>
  );
}

export default App;
