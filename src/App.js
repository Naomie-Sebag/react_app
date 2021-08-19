import { observer } from 'mobx-react';

import userStore from './stores/userStore';
import LoginForm from './stores/LogginForm';
import InputField from './stores/InputField';
import SubmitButton from './stores/SubmitButton';


import './App.css';
import React from 'react';



class App extends React.Component {

  async componentDidMount(){

    try {

      let res = await fetch('/isLoggedin', {

        method: 'post',
        headers: {
          'Accept' : 'application/json',
          'Content-type' : 'application/json'
        }
      });

    let result = await res.json();

    if(result && result.success) {

      userStore.loading = false;
      userStore.isLoggedin = true;
      userStore.username = result.username;
    }

    else
    {
      userStore.loading = false;
      userStore.isLoggedin = false;
    }



    }

catch(e) {

  userStore.loading = false;
  userStore.isLoggedin = false;
  }

}




async doLogout(){

  try {

    let res = await fetch('/logout', {

      method: 'post',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }
    });

  let result = await res.json();

  if(result && result.success) {

    userStore.isLoggedin = false;
    userStore.username = '';
  }

  }

catch(e) {

console.log(e)
}

}



  render()
  {

    if(userStore.loading) {
      return (
        <div className='app'>
          <div className='container'>
          Loading, please wait...
          </div>
        </div>
      );
    }

    else {

      if(userStore.isLoggedin) {

        return (
          <div className='app'>
            <div className='container'>
            Welcome {userStore.username}

            <SubmitButton
            text={'log out'}
            disabled={false}
            onClick={ () => this.doLogout()}
            
            />

            </div>
          </div>
        );
     }
      
    }

    return (
      <div className="app">
         <div className='container'>
              <SubmitButton
                  text={'log out'}
                  disabled={false}
                  onClick={ () => this.doLogout()}
                  
                  />
           <loginForm />
           </div>
      </div>
    );  
    }

    
}

export default observer(App);
