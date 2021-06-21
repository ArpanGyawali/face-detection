import React, { Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import FaceDetection from './Components/FaceDetection/FaceDetection'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'

const ParticlesParams = {
  particles: {
    number: {
      value: 70,
      density: {
        enable:true,
        value_area: 600
      }
    }
}}

const initialState = {
  input: '',
  imgurl: '',
  route: 'signin',
  isSignIn: false,
  box: [],
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgurl: '',
      route: 'signin',
      isSignIn: false,
      box: [],
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      } 
    })
  }

  calculateFaceBox = (data) => {
    this.setState({
      box: []
    })
    const img = document.getElementById('image')
    const width = Number(img.width)
    const height = Number(img.height)
    const region = data.outputs[0].data.regions
    region.forEach(item => {
      const boundary = item.region_info.bounding_box
      const boxobj = {
        top: boundary.top_row * height,
        left: boundary.left_col * width,
        bottom: height - boundary.bottom_row * height,
        right: width - boundary.right_col * width
      }
      this.setState(prevstate => ({
        box: [...prevstate.box, boxobj]
      }))
    console.log(this.state.box)
  }

  handleInput = (event) => {
    const {value} = event.target
    this.setState({
      input: value
    })
  }

  handleClick = () => {
    this.setState({
      imgurl: this.state.input
    })
    fetch('http://localhost:3000/imageApi',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data){
          this.calculateFaceBox(data)
          fetch('http://localhost:3000/image', 
          {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(
                Object.assign(this.state.user, {entries: count})
              )}
            )
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    }
      
    

  handleRouteChange = (route) => {
    if (route === 'home') {
      this.setState({
        isSignIn: true
      })
    } else {
      this.setState(initialState)
    }
    this.setState({
      route: route
    })
    // : this.setState({
    //     route: 'signin'
    //   })
  }

  render() {
    const { isSignIn, route, imgurl, box, user } = this.state;
    const { handleClick, handleRouteChange, handleInput, loadUser} = this
    return ( 
      <div className="App">
        <Particles className='particles' params={ParticlesParams}/>
        <Navigation onRouteChange={handleRouteChange} isSignedIn = {isSignIn} />
        <Logo />
        {route === 'signin'
        ?<SignIn onRouteChange={handleRouteChange} loadUser = {loadUser} />
        : route === 'home'
          ? <div>
              <Rank name = {user.name} entries = {user.entries} />
              <ImageLinkForm onInputChange={handleInput} 
                            onButtonClick={handleClick}
                            />
              <FaceDetection box={box} url={imgurl} />
            </div>
          : <Register onRouteChange={handleRouteChange} loadUser = {loadUser} />
        } 
      </div>
    )
  }
}

export default App;
