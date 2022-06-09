import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../context/AppContext"
import { Spinner } from "../MobileDetail/components/Spinner/Spinner"
import './Login.css'

export const Login = () => {
  
  const [ password, setPassword ] = useState("")
  const { userData, setUserData } = useContext(AppContext)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isValidMail, setIsValidMail ] = useState(false)
  const [messageMailValidation, setMessageMailValidation] = useState('')
  const [ isValidPass, setIsValidPass ] = useState(false)
  const [messagePassValidation, setMessagePassValidation] = useState('')

  const navigate = useNavigate()



  const handleSubmitLogin= (event) => {
    event.preventDefault() 

    setIsLoading(true) 
    setTimeout(() => {
      setIsLoading(false)
      navigate("/mobiles")
    }, 1000)
      setUserData({ ...userData, isLogged: true })           
  }
  
  
  const handleChangeEmail = (event) => {
    const emailRegex = /\S+@\S+\.\S+/
    const email = event.target.value
    
    if (!email || email.length === 0) {
      setMessageMailValidation ('Email cannot be empty')
    }
    if (emailRegex.test(email)) {
      setIsValidMail(true)
      setMessageMailValidation('Valid email')
    } else {
      setIsValidMail(false)
      setMessageMailValidation('Please enter a valid email! Ex: fakeEmail@gmail.es')
    }
    setUserData({ ...userData, email: event.target.value })
  }


  const handleChangePassword = (event) => {
    const passRegex = /^[0-9]*$/
    
    if(passRegex.test(password)) {
      setIsValidPass(true)
      setMessagePassValidation('Valid password')
    }else {
      setIsValidPass(false)
      setMessagePassValidation('Invalid format password (only numeric 0-9)')
    }
    setPassword(event.target.value)
    
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
                // required 
                type="text" 
                className="form-control" 
                id="nameInput" 
                placeholder="Enter email" 
                name="uname" 
                onChange= {handleChangeEmail}
              />
              <div className={`message ${isValidMail ? 'success' : 'error'}`}>
                {messageMailValidation}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password (only numeric 0-9) </label>
              <input 
                // required 
                type="password"
                // pattern="[0-9]*"
                className="form-control" 
                id="passwordInput" 
                placeholder="Password" 
                name="pass" 
                onChange={handleChangePassword}
              />
              <div className={`message ${isValidPass ? 'success' : 'error'}`}>
                {messagePassValidation}
              </div>
            </div>
            <button 
                className= {`btn btn-primary ${isValidMail && isValidPass ? "active" : "disabled"}`}
                type="submit"
                >
                  Login
              </button>                      
          </form> 
          </>         
          )       
      }
    </div>
  )
}


