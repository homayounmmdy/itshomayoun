---
title: "بچه‌داری اشتباه می‌زنی #۲۰: عدم استفاده از Code Splitting و Lazy Loading"
date: '2026-08-22'
tags: ['React', 'code-splitting', 'lazy-loading', 'performance', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا import کردن همه کامپوننت‌ها در ابتدا bundle size رو بزرگ می‌کنه و سینیورها چطور با React.lazy حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۲۰: عدم استفاده از Code Splitting و Lazy Loading

توی این پست بررسی می‌کنیم چرا import کردن همه کامپوننت‌ها در ابتدای اپ باعث bundle size بزرگ میشه و سینیورها چطور با React.lazy و Suspense این مشکل رو حل می‌کنن.

## اشتباه رایج: import کردن همه چیز در ابتدا

### ❌ روش جونیور/مید:

```jsx
// App.js
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics'; // ⚠️ ۵۰۰ کیلوبایت!
import Reports from './pages/Reports'; // ⚠️ ۳۰۰ کیلوبایت!
import AdminPanel from './pages/AdminPanel'; // ⚠️ ۸۰۰ کیلوبایت!

function App() {
  const [page, setPage] = useState('home');
  
  return (
    <div>
      <nav>
        <button onClick={() => setPage('home')}>خانه</button>
        <button onClick={() => setPage('dashboard')}>داشبورد</button>
        <button onClick={() => setPage('analytics')}>آمار</button>
        <button onClick={() => setPage('admin')'>مدیریت</button>
      </nav>
      
      {page === 'home' && <Home />}
      {page === 'dashboard' && <Dashboard />}
      {page === 'analytics' && <Analytics />}
      {page === 'admin' && <AdminPanel />}
    </div>
  );
}
```

**مشکل:** 
- همه کامپوننت‌ها توی یه bundle بزرگ (مثلاً ۲ مگابایت) لود میشن
- کاربر باید صبر کنه تا همه چیز دانلود بشه، حتی اگه فقط صفحه خانه رو ببینه
- First Contentful Paint (FCP) خیلی دیر اتفاق می‌افته
- UX بد: کاربر ۵ ثانیه صبر می‌کنه تا صفحه لود بشه

### ✅ روش سینیور:

```jsx
// App.js
import { lazy, Suspense } from 'react';
import Home from './pages/Home'; // صفحه اصلی همیشه لازمه

// ✅ فقط وقتی نیاز بشه لود میشن
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  const [page, setPage] = useState('home');
  
  return (
    <div>
      <nav>
        <button onClick={() => setPage('home')}>خانه</button>
        <button onClick={() => setPage('dashboard')}>داشبورد</button>
        <button onClick={() => setPage('analytics')}>آمار</button>
        <button onClick={() => setPage('admin')}>مدیریت</button>
      </nav>
      
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        {page === 'home' && <Home />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'analytics' && <Analytics />}
        {page === 'admin' && <AdminPanel />}
      </Suspense>
    </div>
  );
}
```

## چرا این روش بهتره؟

- **Bundle size کوچک‌تر:** هر صفحه یه فایل جداگانه داره
- **لود سریع‌تر:** کاربر فقط کدی رو دانلود می‌کنه که نیاز داره
- **UX بهتر:** صفحه اصلی سریع لود میشه، بقیه صفحات در background
- **Caching بهتر:** اگه یه صفحه تغییر کنه، فقط همون فایل کش میشه

## استفاده با React Router

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Preloading برای UX بهتر

```jsx
function Navigation() {
  const handleMouseEnter = () => {
    // ✅ وقتی کاربر موس رو می‌بره روی لینک، کامپوننت preload میشه
    import('./pages/Dashboard');
  };
  
  return (
    <Link to="/dashboard" onMouseEnter={handleMouseEnter}>
      داشبورد
    </Link>
  );
}
```

## قانون طلایی

> **کامپوننت‌هایی که فقط توی بعضی صفحات استفاده میشن رو با React.lazy لود کن! فقط کامپوننت‌های اصلی (مثل Layout، Navigation) رو مستقیم import کن!**

## نکته مهم

- **Suspense** باید دور کامپوننت‌های lazy باشه
- **fallback** می‌تونه یه loading spinner یا skeleton باشه
- **Error Boundary** هم اضافه کن برای handle کردن خطاهای لود
- با **Webpack** یا **Vite** به صورت خودکار code splitting اتفاق می‌افته
