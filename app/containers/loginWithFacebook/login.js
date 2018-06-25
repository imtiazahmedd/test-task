import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
const responseFacebook = (response) => {
  console.log(response,'33333333333333333333333333');



}

export default class Login extends React.PureComponent {

  constructor(){
    super();
    this.state = {

    }
  }


  render() {
    return(
      <FacebookLogin
        appId="181087216071358"
        autoLoad
        callback={responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick}>This is my custom FB button</button>
        )}
      />

    )
  }
}

