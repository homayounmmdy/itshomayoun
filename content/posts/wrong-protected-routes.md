---
title: "بچه‌داری اشتباه می‌زنی #۲۱: Protected Routes اشتباه"
date: '2026-08-22'
tags: ['React', 'ReactRouter', 'protected-routes', 'authentication', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا conditional rendering برای protected routes اشتباهه و سینیورها چطور با wrapper component حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۲۱: Protected Routes اشتباه

توی این پست بررسی می‌کنیم چرا conditional rendering برای protected routes مشکل‌سازه و سینیورها چطور با wrapper component این مشکل رو حل می‌کنن.

## اشتباه رایج: conditional rendering در هر route

### ❌ روش جونیور/مید:

```jsx
function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />; // ⚠️ هر صفحه باید اینو تکرار کنه!
  
  return <div>Dashboard Content</div>;
}

function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />; // ⚠️ دوباره تکرار!
  
  return <div>Settings Content</div>;
}

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />; // ⚠️ باز هم تکرار!
  
  return <div>Profile Content</div>;
}
```

**مشکل:** 
- هر صفحه باید auth check رو تکرار کنه
- کد تکراری و سخت maintain
- اگه بخوای logic تغییر بده (مثلاً role-based access)، باید همه جا تغییر بدی
- احتمال فراموش کردن توی یه صفحه

### ✅ روش سینیور:

```jsx
// ProtectedRoute.js - یه بار بنویس، همه جا استفاده کن
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // از Context یا hook
  
  if (loading) {
    return <div>در حال بررسی...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// App.js - تمیز و متمرکز
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

// کامپوننت‌ها دیگه auth check ندارن!
function Dashboard() {
  return <div>Dashboard Content</div>;
}

function Settings() {
  return <div>Settings Content</div>;
}

function Profile() {
  return <div>Profile Content</div>;
}
```

## Role-based Access Control

```jsx
// ProtectedRoute.js پیشرفته
function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>در حال بررسی...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  // ✅ بررسی role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

// استفاده:
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  } 
/>
```

## Layout-based Protected Routes

```jsx
// روش بهتر برای گروه‌بندی routes
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes با layout مشترک */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

// ProtectedRoute.js - بدون children prop
function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return <div>در حال بررسی...</div>;
  if (!user) {
    // ✅ ذخیره URL برای redirect بعد از login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />; // ✅ render child routes
}
```

## چرا این روش بهتره؟

- **یک بار بنویس:** logic auth فقط یه جاست
- **قابل استفاده مجدد:** همه protected routes از یه wrapper استفاده می‌کنن
- **maintain آسان:** تغییر logic فقط یه جا
- **کد تمیزتر:** کامپوننت‌ها فقط business logic دارن
- **Role-based access:** به راحتی می‌تونی role check اضافه کنی

## قانون طلایی

> **هیچ‌وقت auth check رو توی کامپوننت‌ها تکرار نکن! یه ProtectedRoute wrapper بساز و همه جا ازش استفاده کن!**

## نکته مهم

- از `useAuth` hook یا Context برای دسترسی به user استفاده کن
- `replace` رو توی Navigate استفاده کن تا user نتونه با back button برگرده
- URL فعلی رو ذخیره کن تا بعد از login بتونی redirect کنی
- Loading state رو حتماً handle کن
