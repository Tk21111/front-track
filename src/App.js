import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Public from './components/Public';

import Login from './features/auth/Hlogin';
import Signin from './features/auth/Hsignin';
import LogOut from './features/auth/Hlogout';
import PersistLogin from './features/auth/PersistLogin';

import Welcome from './features/auth/Welcome';
import RequireAuth from './features/auth/RequireAuth';
import GetUser from './features/auth/getUser';
import SetTrashCan from './features/users/SetTrashCan';
import TrashCanPov from './features/users/TrashCanPov';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="registor" element={<Signin />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="getuser" element={<GetUser />} />
            <Route path="setmachine/:id" element={<SetTrashCan />} />
            <Route path="machine" element={<TrashCanPov />} />
            <Route path="logout" element={<LogOut />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;