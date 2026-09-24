import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AdminApp from './admin/AdminApp'
import './index.css'

const isAdminRoute = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/')
if (isAdminRoute) document.documentElement.classList.add('cms-admin-root')
if (new URLSearchParams(window.location.search).has('cmsPreview')) document.documentElement.classList.add('cms-preview-root')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {isAdminRoute ? <AdminApp /> : <App />}
    </BrowserRouter>
  </React.StrictMode>,
)
