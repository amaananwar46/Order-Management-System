import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <header className="p-4 bg-slate-900 text-white">
        Order Management System
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;