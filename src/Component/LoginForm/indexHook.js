import React, {useState} from 'react'
import {useNavigate, useLocation, Navigate} from "react-router-dom"
import Cookies from "js-cookie"



const LoginForm = () => {

    const [username, setUserName] = useState("") 
    // console.log(username)
    const [password, setPassword] = useState("")
    // console.log(password)
    const [submitErrorsg, setSubmitErrMsg] = useState(false) 
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate();
    const location = useLocation();

    const onGetSuccess = (jwtToken) => {
        
        // method: 1 => history.push("/")
        //  navigate("/") // In place of this.props , we are using navigate method to get history.push("/") method...

     // method: 1 => history.replace("/")
    //    navigate("/", {replace: true}) // instead of history.replace we are using this navigate method....


    // method:2 => history.replace("/")
       const currentLocation = location.pathname 
       console.log(currentLocation)
    //    navigate(currentLocation,  {replace: true})
       navigate("/", {replace: true})

       console.log(jwtToken)
       Cookies.set("jwt_token", jwtToken, {expires: 1})

    }

    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken !== undefined) {
        return <Navigate to = "/"/>
    }

    const onGetFailure = (errorMsg) => {
        console.log(errorMsg)
        setSubmitErrMsg(true)
        setErrorMsg(errorMsg)
    }
      
    const onSubmitForm = async (event) => {
        event.preventDefault()

        const userDetails = {username, password}
        // console.log(userDetails)
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: "POST",
            body: JSON.stringify(userDetails),
        }

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(response)
        console.log(data)

        if(response.ok === true) {
            onGetSuccess(data.jwt_token)
        }

        else {
            onGetFailure(data.error_msg)
        }
    }

    const onChangeUserName = (event) => {
        setUserName(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const  renderUserName = () => {
        return (
            <div>
            <label htmlFor='UserName'>UserName</label>
            <input id = "UserName" placeholder = "User Name" type = "text" value = {username} onChange = {onChangeUserName}/>
        </div>
        )
        
    }

    const renderUserPassword = () => {
        return (
            <div>
            <label htmlFor = "UserPassword" >User Password</label>
            <input id = "UserPassword" placeholder = "Enter Password" type = "password" value = {password} onChange = {onChangePassword}/>
        </div>
        )
        
    }

  return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              className="login-website-logo-mobile-img"
              alt="logo next"
            />
            {/* <form onSubmit={submitForm}> */}
            <form onSubmit = {onSubmitForm}>
              <div>{renderUserName()}</div>
              <div>{renderUserPassword()}</div>
              <button type="submit">Login</button>
              {submitErrorsg && <p>{errorMsg}</p>}
            </form>
          </div>
  )
}

export default LoginForm