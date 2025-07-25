import { BrowserRouter, Routes, Route } from 'react-router-dom';
import admin_routes from '@/data/admin_routes';
import { Suspense } from 'react';
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import NotFound from '@/pages/NotFound';



const RouterManager: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {admin_routes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={route.public ? <Component /> : <AdminLayout><Component /></AdminLayout>}
                index={route.index}
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default RouterManager;
