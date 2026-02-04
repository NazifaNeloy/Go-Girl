import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/growth" element={<div className="text-center p-10">Growth Page Coming Soon ✨</div>} />
          <Route path="/budget" element={<div className="text-center p-10">Budget Page Coming Soon 💸</div>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
