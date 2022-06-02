import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Login = () => {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState()


  const navigate = useNavigate()
 
  
  const handleLogin= (event) => {
    event.preventDefault()
    const user = {username, password}
    setUser(user)
    window.localStorage.setItem('user-data', JSON.stringify(user))   
    navigate('/mobiles')
  }

  const handleLoginInvitate= () => {
    navigate('/mobiles')
  }
 
  return (
    <>
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="nameInput">Email address</label>
          <input 
            required 
            type="text" 
            className="form-control" 
            id="nameInput" 
            placeholder="Enter username" 
            name="uname" 
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input 
            required 
            type="password" 
            className="form-control" 
            id="passwordInput" 
            placeholder="Password" 
            name="pass" 
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button 
          className="btn btn-primary"
          type="submit"
          >
            Login
        </button>      
      </form>

      <h1 className="mt-5">Continue as invite</h1>
      <hr />
           <button 
        className="btn btn-primary"
        onClick={handleLoginInvitate}
        >
          Enter
      </button>
    </div>
    </>
  )
}

