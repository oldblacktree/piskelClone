import './authorization.css'
import React from 'react';


export default class Authorization extends React.Component {
  constructor(props){
    super(props)
    this.userName = ''
    this.state={userName: ''}
  }

  componentDidMount() {
    window.gapi.load('auth2', function () {
      window.gapi.auth2
        .init({
          client_id: '630602374178-0dv76nkegacqrtav59piof0gimbnk3m0.apps.googleusercontent.com',
        })
    })
  }

  handleUpdateUserName = (value) => {
    this.setState({ userName: value })
  }

  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile()
      this.handleUpdateUserName(profile.getGivenName())
    })
  }

  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(this.handleUpdateUserName(''))

  }

  render() {
    const greeting = this.state.userName ? `Hello ${this.state.userName }!` : `Hello!`
    return (
      <div className="authorization">
        <p className="authorization__greeting">{greeting}</p>
        <button className='authorization-button' onClick={this.signIn}>Log in</button>
        <button className='authorization-button' onClick={this.signOut}>Log out</button>
    </div>
    );
  }
}

