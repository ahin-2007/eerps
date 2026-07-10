import './App.css'
import Login from './Pages/Login'
import ForgotPassword from './Pages/Forgotpassword'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import CampusConnect from './Pages/Campusconnect'
import ParentConnect from './Pages/Parentconnect'
import FacultyConnect from './Pages/Facultyconnect'
import HODDashboard from './Pages/HodDashboard'

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
},
{
  path:"parent",
  element:<ParentConnect/>
},
{
  path:"faculty",
  element:<FacultyConnect/>
},
{
  path:"hod",
  element:<HODDashboard/>
}
]

)

function App() {
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
