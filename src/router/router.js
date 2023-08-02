import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/auth/login.page';
import PostsPage from '../pages/posts/post.page';
import { useAuthStore } from '../store/auth.store';
import PostDetail from '../pages/posts/detail.page';

export const RequiresAuth = () => {
  const { token, isLoggedIn } = useAuthStore();
  if (!token && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export const PublicRoutes = () => {
  const { token, isLoggedIn } = useAuthStore();
  if (token && isLoggedIn) {
    return <Navigate to="/posts" replace />;
  }
  return <Outlet />;
};

function Router() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<RequiresAuth />}>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  );
}

export default Router;
