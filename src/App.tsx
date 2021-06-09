import React, { useEffect, useState } from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import './App.css';

interface userInfo {

}

interface contextProps {
  onLoginSuccess: (id: string)=>void; 
  onLogout: ()=> void;
  userInfo: userInfo | null;
}

export const appContext = React.createContext<contextProps | null>(null);

function App({history}: RouteComponentProps) {
  const [userInfo, setUserInfo] = useState<userInfo | null>({});

  const onLoginSuccess = (id: string)=>{
    localStorage.setItem('userId', id);
    history.push('/main');
  }

  const onLogout = ()=>{
    localStorage.setItem('userId', '');
    history.push('/');
  }

  // element 이벤트 판별
  useEffect(()=>{
    document.body.onclick = (e: MouseEvent): void=>{
      const dropDown: NodeListOf<Element> = document.querySelectorAll('div.drop-list');
      const targ = e.currentTarget as HTMLElement;

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
      <appContext.Provider value={{onLoginSuccess, onLogout, userInfo}}>
        <Switch>
          <Route path='/' exact render={(props)=> <InitPage {...props}></InitPage>}></Route>
          <Route path='/welcome' render={(props)=> <Welcome {...props}></Welcome>}></Route>
          <Route path='/main' render={(props)=> <Main {...props}></Main>}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </appContext.Provider>
    </div>
  );
}

function InitPage({history}: RouteComponentProps){
  useEffect(()=>{
    if(localStorage.getItem('userId')) history.push('/main');
    else history.push('/welcome');
  }, []);
  return <></>;
}

export default withRouter(App);