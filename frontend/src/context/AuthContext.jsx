import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const userData = JSON.parse(localStorage.getItem('user') || 'null')
      setUser(userData)
    }
  }, [token])

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
  }

  const register = async (name, email, password, phone) => {
    const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password, phone })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}
