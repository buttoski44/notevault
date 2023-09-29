import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/dashboard';
import { Fullnote } from './pages/fullnote/fullnote.component';
import { Newnote } from './pages/newnote/newnote';
import { AnimatePresence } from 'framer-motion';
function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<Newnote />} />
        <Route path='/:noteId' element={<Fullnote />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
