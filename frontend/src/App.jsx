import './App.css'
import { Outlet, Route,Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { Toaster } from 'react-hot-toast'
import { AuthContext, AuthProvider } from './components/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import CreatePostPage from './pages/CreatePostPage'
import {ThemeContext} from './components/ThemeContext'

function App() {
  const {user}=useContext(AuthContext)

  const {theme}=useContext(ThemeContext)

  return (
      <div className='h-screen' data-theme={theme}>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route index element={<LandingPage></LandingPage>}></Route>
            <Route path='login' element={!user ? <LoginPage></LoginPage> : <Navigate to={"/home"}></Navigate>}></Route>
            <Route path='signup' element={!user ? <SignupPage></SignupPage> : <Navigate to={"/home"}></Navigate>}></Route>
            <Route path='home' element={<Outlet></Outlet>}>
              <Route index element={<HomePage></HomePage>}></Route>
              <Route path=':search' element={<h1>search</h1>}></Route>
            </Route>
            <Route path='post' element={<CreatePostPage></CreatePostPage>}></Route>
            <Route path='profile' element={<ProfilePage></ProfilePage>}></Route>
            <Route path='users/:id' element={<h1>User</h1>}></Route>
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>

        <Toaster/>
      </div>
    
  )
}

export default App
