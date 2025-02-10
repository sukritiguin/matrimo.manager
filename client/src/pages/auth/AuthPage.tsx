import { Outlet } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div>
      <Outlet /> {/* This will load either Login or Register component */}
    </div>
  );
}
