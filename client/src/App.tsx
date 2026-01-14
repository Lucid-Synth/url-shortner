import { Route, Routes } from "react-router-dom"
import  Home  from "./pages/Home"
import Signin  from "./pages/Signin"
import Signup from "./pages/Signup"
import URLShortener from "./pages/Url"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/url" element={<URLShortener/>} />
    </Routes>
    </>
  )
}

export default App
