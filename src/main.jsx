import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NotesContextProvider } from './context/notes.context.jsx'
import { FolderContextProvider } from './context/folder.context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FolderContextProvider>
      <NotesContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotesContextProvider>
    </FolderContextProvider>
  </React.StrictMode>
)
