import React from 'react'
import './SignIn.css'

class SignIn extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         userEmail: '',
         userPassword: '',
         message: '',
         isPassword: false
      }
   }

   togglePassword = () => {
      this.setState({
         isPassword: !this.state.isPassword
      })
   }

   handleInput = (event) => {
      const {name, value} = event.target
      this.setState({
         [name] : value
      })
   }

   handleSignIn = () => {
      console.log(this.state)
      fetch('http://localhost:3000/signin',
         {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               email: this.state.userEmail,
               password: this.state.userPassword
            })
         })
            .then(response => response.json())
            .then(data=> {
               if (typeof data === 'object'){         //for response of user
                  this.props.loadUser(data);
                  this.props.onRouteChange('home')
               }
               else{
                  this.setState({
                     message: data
                  })
               }
            })
      
      // fetch('http://localhost:3000/signin' {
      //    method: 'post',
      //    'Content-Type': 
      // })
   }


   render(){
      const { handleInput, handleSignIn, togglePassword } = this
      const {isPassword, message} = this.state
      return (
         <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 black-80">
               <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                     <legend className="f2 fw6 ph0 mh0 white">SIGN IN</legend>
                     <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                        <input 
                           onChange = {handleInput}
                           className="inp pa2 input-reset ba w-100" 
                           type="email" 
                           name="userEmail"  
                           id="email-address" 
                        />
                     </div>
                     <div className="mv3">
                        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                        <div class = "pass">
                           <input 
                              onChange = {handleInput}
                              className="inp b pa2 input-reset ba w-100" 
                              type={isPassword ? "text" : "password"} 
                              name="userPassword"  
                              id="password" 
                           />
                           <i className={ `bi ${isPassword ? "bi-eye-slash" : "bi-eye"}` }
                           onClick={togglePassword}></i>
                        </div>
                     </div>
                  </fieldset>
                  <div className="">
                     <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" 
                        onClick={handleSignIn}     //should be arrow function
                     />
                  </div>
                  <div className="lh-copy mt3">
                     <p className="f5 red db">{message}</p>
                  </div>
                  <div className="lh-copy mt3">
                     <p onClick={()=> this.props.onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
                  </div>
               </div>
            </main>
         </article>
      )
   }
}
export default SignIn