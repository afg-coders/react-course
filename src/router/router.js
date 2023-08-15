import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/auth/login.page';
import UsersPage from '../pages/posts/user.page';
import { useAuthStore } from '../store/auth.store';
import UserDetail from '../pages/posts/user-details.page';
import NotFoundPage from '../pages/404.page';
import Unauthorized from '../pages/403.page';

export const RequiresAuth = () => {
  const { token, isLoggedIn } = useAuthStore();
  if (!token && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export const RequiresAdmin = () => {
  const { token, isLoggedIn, user } = useAuthStore();

  if (token && isLoggedIn && user.role === 'admin') {
    return <Outlet />;
  }
  return <Navigate to="/unauthorized" replace />;
};

export const PublicRoutes = () => {
  const { token, isLoggedIn } = useAuthStore();
  if (token && isLoggedIn) {
    return <Navigate to="/users" replace />;
  }
  return <Outlet />;
};

function Router() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />}></Route>
      <Route path="/unauthorized" element={<Unauthorized />}></Route>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<RequiresAuth />}>
        <Route element={<RequiresAdmin />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="/user/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}

export default Router;
