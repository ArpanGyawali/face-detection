import React from 'react'
import './Register.css'

class Register extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         userName: '',
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

   handlePassClick = (id, el) =>{
      let x = document.getElementById(id)
      const type = x.getAttribute('type') === 'password' ? 'text' : 'password'
      x.setAttribute('type', type)
      el.classList.toggle('bi-eye');
   }

   handleRegister = () => {
      const {userEmail, userName, userPassword} = this.state
      fetch('http://localhost:3000/register',
         {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               email: userEmail,
               password: userPassword,
               name: userName
            })
         })
            .then(response => response.json())
            .then(data=> {
               if (typeof data === 'object'){
                  this.props.loadUser(data)
                  this.props.onRouteChange('home')
               }
               else{
                  this.setState({
                     message: data
                  })
               }
            })
   }

   // //using axios

   // handleRegister = () => {
   //    const {userEmail, userName, userPassword} = this.state
   //    const newUser = {
   //       email: userEmail,
   //       password: userPassword,
   //       name: userName
   //    }
   //    axios.post('http://localhost:3000/register', newUser)
   //       .then(response => response.json())
   //       .then(data=> {
   //          if (typeof data === 'object'){
   //             this.props.loadUser(data)
   //             this.props.onRouteChange('home')
   //          }
   //          else{
   //             this.setState({
   //                message: data
   //             })
   //          }
   //       })
   // }


   render() {
      const {handleRegister, handleInput, togglePassword} = this
      const {isPassword, message} = this.state
      return (
         <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 black-80">
               <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                     <legend className="f2 fw6 ph0 mh0 white">REGISTER</legend>
                     <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="name">Username *</label>
                        <input 
                           onChange = {handleInput}
                           className="inp pa2 input-reset ba w-100" 
                           type="text" 
                           name="userName"  
                           id="name" 
                        />
                     </div>
                     <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email *</label>
                        <input  
                           onChange = {handleInput}
                           className="inp pa2 input-reset ba w-100" 
                           type="email" 
                           name="userEmail"  
                           id="email-address" 
                        />
                     </div>
                     <div className="mv3">
                        <label className="db fw6 lh-copy f5" htmlFor="password">Password *</label>
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
                        value="Register" 
                        onClick={handleRegister}
                     />
                  </div>
                  <div className="lh-copy mt3">
                     <p className="f5 red db">{message}</p>
                  </div>
                  <div className="lh-copy mt3">
                     <p className="f5 link dim black db pointer" onClick={()=> this.props.onRouteChange('signin')}>Sign in</p>
                  </div>
               </div>
            </main>
         </article>
      )
   }
}
export default Register