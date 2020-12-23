import React from 'react'
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const LandingPage = props => {
  const signUp = () => {
    props.history.push('/sign-up')
  }

  const signIn = () => {
    props.history.push('/sign-in')
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <p className='banner-text'><span className='brand-name'>notation</span> - Study like you mean it</p>
        <img
          src={'https://i.imgur.com/B2dN8YU.jpg'}
          className='banner-img'
          alt={'Study like you mean it'}
        />
        <br /><hr />
        <Button variant="outline-dark" block onClick={signUp}>Sign Up</Button>
        <Button variant="outline-dark" block onClick={signIn}>Sign In</Button>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
