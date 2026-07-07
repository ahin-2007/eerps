import './App.css'
import Login from './Pages/Login'
import ForgotPassword from './Pages/Forgotpassword'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import CampusConnect from './Pages/Campusconnect'

const router=createBrowserRouter([{
  path:"/",
  element:<Login/>
},{
  path:"forgotpassword",
  element:<ForgotPassword/>
},
{
  path:"student",
  element:<CampusConnect/>
}]

)

function App() {
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
