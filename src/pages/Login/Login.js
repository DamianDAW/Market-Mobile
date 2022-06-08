import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../context/AppContext"
import { Spinner } from "../MobileDetail/components/Spinner/Spinner"


export const Login = () => {
  
  const [ password, setPassword ] = useState("")
  const { userData, setUserData } = useContext(AppContext)
  const [ isLoading, setIsLoading ] = useState(false)


  const navigate = useNavigate()
 
  
  const handleSubmitLogin= (event) => {
    event.preventDefault()
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false)
      navigate("/mobiles")
    }, 2000)
    setUserData({ ...userData, isLogged: true })
  }

  const handleChangeEmail = (event) => {
    setUserData({ ...userData, email: event.target.value });
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }



  return (
    <div className="container mt-5">
      {isLoading ? (
        <Spinner />
      ) : ( 
        <>
        <h1>Login</h1>
        <hr />
        <form onSubmit={handleSubmitLogin}>
          <div className="form-group">
            <label htmlFor="nameInput">Email address</label>
            <input 
              required 
              type="email" 
              className="form-control" 
              id="nameInput" 
              placeholder="Enter username" 
              name="uname" 
              value={userData.email}
              onChange= {handleChangeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input 
              required 
              type="password"
              pattern="[0-9]*"
              className="form-control" 
              id="passwordInput" 
              placeholder="Password" 
              name="pass" 
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <button 
            className="btn btn-primary"
            type="submit"
            >
              Login
          </button>      
        </form>       
        </>    
      )}
    </div>
  )
}

