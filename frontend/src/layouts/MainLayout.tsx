import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/public/Navbar';

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
