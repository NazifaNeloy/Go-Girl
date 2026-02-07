import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { GrowthHub } from './pages/GrowthHub';
import { Budget } from './pages/Budget';
import { Tasks } from './pages/Tasks';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/growth" element={<GrowthHub />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
