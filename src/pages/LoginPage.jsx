import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center gap-x-6">
    <div className="container flex flex-col h-screen justify-center items-center bg-purple-900">
      <h1 className="text-white mb-20 text-center">Login</h1>
      <form className="container">
        <h2 className="text-gray-300 mb-3">Username</h2>
        <div className="relative z-0 mb-6 w-full group">
          <input 
            type="text" 
            className="peer" 
            placeholder=" "
            >
          </input>
          <label>Usuario</label>
        </div>
        <h2 className="text-gray-300 mb-3">Password</h2>
        <div className="relative z-0 mb-6 w-full group">
          <input 
            type="password" 
            className="peer" 
            placeholder=" "
            >
          </input>
          <label >Password</label>
        </div>
        <button
        type="submit" 
        className="btn-primary w-100">Ingresar</button>
      </form>
    </div>
      <div className="bg-login sm:block" alt="bg-login"></div>
  </div>
  )
}

export default LoginPage