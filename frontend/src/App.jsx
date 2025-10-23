import './App.css'
import { Outlet, Route,Routes } from 'react-router-dom'
import Layout from './components/Layout'

function App() {

  return (
    <div className='h-screen' data-theme={"dark"}>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<h1>main</h1>}></Route>
          <Route path='login' element={<h1>Login</h1>}></Route>
          <Route path='signup' element={<h1>Signup</h1>}></Route>
          <Route path='home' element={<Outlet></Outlet>}>
            <Route index element={<h1>home</h1>}></Route>
            <Route path=':search' element={<h1>search</h1>}></Route>
          </Route>
          <Route path='post' element={<h1>add post</h1>}></Route>
          <Route path='profile' element={<h1>My Profile</h1>}></Route>
          <Route path='users/:id' element={<h1>User</h1>}></Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </div>
    
  )
}

export default App
