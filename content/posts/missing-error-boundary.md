---
title: "بچه‌داری اشتباه می‌زنی #۱۷: نداشتن Error Boundary در اپلیکیشن"
date: '2026-08-22'
tags: ['React', 'ErrorBoundary', 'error-handling', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا هر اپلیکیشنی باید Error Boundary داشته باشه و سینیورها چطور پیاده‌سازیش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۷: نداشتن Error Boundary در اپلیکیشن

توی این پست بررسی می‌کنیم چرا نداشتن Error Boundary باعث crash کامل اپلیکیشن میشه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: بدون Error Boundary

### ❌ روش جونیور/مید:

```jsx
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.profile.bio.toUpperCase()}</p> {/* ⚠️ اگه bio null باشه، crash! */}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  if (!user) return <div>Loading...</div>;
  
  return <UserProfile user={user} />;
}
```

**مشکل:** 
- اگه `user.profile` یا `user.profile.bio` null باشه، اپلیکیشن کامل crash می‌کنه
- کاربر یه صفحه سفید می‌بینه
- هیچ feedback ای نداره که چیکار کنه
- کل اپلیکیشن از کار می‌افته، نه فقط اون کامپوننت

### ✅ روش سینیور:

```jsx
// ErrorBoundary.js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // ارسال به سرویس لاگ مثل Sentry
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>مشکلی پیش اومده</h2>
          <p>لطفاً دوباره تلاش کنید</p>
          <button onClick={() => this.setState({ hasError: false })}>
            تلاش مجدد
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// استفاده:
function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <ErrorBoundary>
      <UserProfile user={user} />
    </ErrorBoundary>
  );
}
```

## چرا Error Boundary مهمه؟

- **جلوگیری از crash کامل:** فقط اون بخش از اپلیکیشن از کار می‌افته
- **UX بهتر:** کاربر یه پیام خطا می‌بینه، نه صفحه سفید
- **Recovery:** کاربر می‌تونه دوباره تلاش کنه
- **Logging:** خطاها رو می‌تونی لاگ کنی و debug کنی
- **Isolation:** خطا توی یه کامپوننت، بقیه اپلیکیشن رو تحت تأثیر قرار نمیده

## ساختار پیشنهادی Error Boundary

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<GlobalError />}>
      <Header />
      <ErrorBoundary fallback={<MainContentError />}>
        <MainContent />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SidebarError />}>
        <Sidebar />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
```

## قانون طلایی

> **هر اپلیکیشنی باید حداقل یه Error Boundary داشته باشه! کامپوننت‌های مهم و مستقل رو با Error Boundary wrap کن!**

## نکته مهم

Error Boundary فقط خطاهای **render** رو catch می‌کنه، نه خطاهای:
- Event handlers
- Async code (setTimeout, fetch)
- Server-side rendering
- خود Error Boundary

برای این موارد، باید error handling جداگانه داشته باشی.
