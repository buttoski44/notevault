import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/dashboard';
import { Newnote } from './pages/newnote/newnote';
import { lazy, Suspense } from 'react';
import { Loader } from './components/loader/loader.component';
import { AnimatePresence } from 'framer-motion';

const Fullnote = lazy(() => import('./pages/fullnote/fullnote.component'))
function App() {

  const location = useLocation();
  return (
    <AnimatePresence initial="false" mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<Newnote />} />
        <Route path='/:noteId' element={
          <Suspense fallback={<Loader type="fullnote" />}>
            <Fullnote />
          </Suspense>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default App
