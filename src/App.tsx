// src/App.tsx
import Navbar from './components/Navbar';
import SearchInput from './components/SearchInput';
import UserManagement from './components/UserManagment';

function App() {

  return (
    <div>
      <Navbar />
      <SearchInput />
      <UserManagement/>
    </div>
  );
}

export default App;
