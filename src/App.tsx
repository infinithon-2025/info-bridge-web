import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProjectListPage } from './pages/project-list-page';
import ProjectsPage from './pages/projects';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectListPage />} />
          <Route path="/projects/:id" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
