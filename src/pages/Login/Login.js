import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../context/AppContext"
import { Spinner } from "../../components/Spinner/Spinner"
import './Login.css'

export const Login = () => {
  
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { userData, setUserData } = useContext(AppContext)
  const [ isLoading, setIsLoading ] = useState(false)
  const [isEmailInputVisited, setIsEmailInputVisited] = useState(false)
  const [isPasswordInputVisited, setIsPasswordInputVisited] = useState(false)
  const [messageErrorMailValidation, setMessageErrorMailValidation] = useState('')
  const [messageErrorPassValidation, setMessageErrorPassValidation] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    validateInput(password, "password");
    validateInput(email, "email");
  }, [])

  

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
    validateInput(event.target.value, 'email')   
    setEmail(event.target.value)
    setUserData({ ...userData, email: event.target.value })    
  }


  const handleChangePassword = (event) => {  
    validateInput(event.target.value, 'password')
    setPassword(event.target.value)     
  }  


  const validateInput = (inputValue, inputType) => {
    if(inputType === 'password') {
      if (inputValue === '') {
        setMessageErrorPassValidation("Password can't be empty")
      } else {
        const passRegex = /^[0-9]*$/


        setMessageErrorPassValidation(
        passRegex.test(inputValue) ? '' : 'Invalid format password (only numeric 0-9)'
        )
      }
    }
    if (inputType === 'email') {
      if (inputValue === '' ) {
        setMessageErrorMailValidation("Email can't be empty")
      } else {
        const emailRegex = /\S+@\S+\.\S+/


        setMessageErrorMailValidation(
          emailRegex.test(inputValue) 
          ? '' 
          : 'Please enter a valid email! Ex: fakeEmail@gmail.es'
        ) 
        
      }
    }
    return
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
              <label htmlFor="emailInput">Email address</label>
              <input 
                // required 
                type="email" 
                className="form-control" 
                id="emailInput" 
                placeholder="Enter email" 
                name="umail" 
                onChange= {handleChangeEmail}
                onBlur={() => setIsEmailInputVisited(true)}
                value={email}
              />     
              {messageErrorMailValidation && isEmailInputVisited && 
               ( <div className={'message error'}>
                  {messageErrorMailValidation}
                </div> )                   
              }    
              {!messageErrorMailValidation && isEmailInputVisited &&
               ( <div className={'message success'}>
                  {'Valid mail!'}
                </div> )                   
              }    
                   
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password (only numeric 0-9) </label>
              <input 
                type="password"
                className="form-control" 
                id="passwordInput" 
                placeholder="Password" 
                name="pass" 
                onChange={handleChangePassword}
                onBlur={() => setIsPasswordInputVisited(true)}
                value={password}
              />
                {messageErrorPassValidation && isPasswordInputVisited &&
                (<div className={'message error'}>
                  {messageErrorPassValidation}
                </div>)                            
                }  
                {!messageErrorPassValidation && isPasswordInputVisited &&
                (<div className={'message success'}>
                  {'Valid password!'}
                </div> )                   
                }         
            </div>
            <button 
                className= "btn btn-primary"
                type="submit"
                disabled={Boolean(messageErrorMailValidation ) || Boolean(messageErrorPassValidation)}
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


