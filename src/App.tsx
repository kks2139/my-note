import React, { SyntheticEvent, useEffect, useState } from 'react';
import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import './App.css';

interface userInfo {

}

interface contextProps {
  onLogout : ()=> void;
  userInfo : userInfo | null;
}

export const appContext = React.createContext<contextProps | null>(null);

function App() {
  const [userInfo, setUserInfo] = useState<userInfo | null>({});

  const onLogin = ()=>{
    
  }

  const onLogout = ()=>{

  }

  // 글로벌 이벤트 판별
  useEffect(()=>{
    document.body.onclick = (e: MouseEvent): void=>{
      const dropDown: NodeListOf<Element> = document.querySelectorAll('div.drop-list');
      const targ = e.currentTarget as HTMLElement;
      const targUp = targ.parentNode as HTMLElement;

      if(dropDown.length > 0){
        dropDown.forEach(el => {
          if(!el.classList.contains('hide-node')) el.classList.add('hide-node');
        });
      }
    }
    return ()=> {
      document.body.onclick = null;
    };
  }, []);

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