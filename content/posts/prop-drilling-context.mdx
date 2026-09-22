---
title: "بچه‌داری اشتباه می‌زنی #۲: Prop Drilling بی‌پایان"
date: '2026-08-22'
tags: ['React', 'PropDrilling', 'ContextAPI', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا prop drilling کد رو غیرقابل نگهداری می‌کنه و سینیورها با Context API حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۲: Prop Drilling بی‌پایان

توی این پست قراره ببینیم چطور prop drilling کد رو به کابوس تبدیل می‌کنه و سینیورها چطور با Context API این مشکل رو حل می‌کنن.

## اشتباه رایج: رد کردن prop از ۵ لایه کامپوننت

### ❌ روش جونیور/مید:

```jsx
function App() {
  const [theme, setTheme] = useState('dark');
  return <Layout theme={theme} setTheme={setTheme} />;
}

function Layout({ theme, setTheme }) {
  return <Header theme={theme} setTheme={setTheme} />;
}

function Header({ theme, setTheme }) {
  return <UserMenu theme={theme} setTheme={setTheme} />;
}

function UserMenu({ theme, setTheme }) {
  return <ThemeToggle theme={theme} setTheme={setTheme} />;
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      تغییر تم
    </button>
  );
}
```

**مشکل:** کامپوننت‌های میانی (`Layout`, `Header`, `UserMenu`) اصلاً از `theme` استفاده نمی‌کنن، فقط دارن prop رو رد می‌کنن. این کد رو سخت maintain می‌کنه.

### ✅ روش سینیور:

```jsx
// ThemeContext.js
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

```jsx
// App.js
function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

// کامپوننت‌های میانی دیگه prop نمی‌گیرن
function Layout() {
  return <Header />;
}

function Header() {
  return <UserMenu />;
}

// فقط کامپوننتی که نیاز داره، از Context استفاده می‌کنه
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      تغییر تم
    </button>
  );
}
```

## چرا این روش بهتره؟

- **کد تمیزتر:** کامپوننت‌های میانی درگیر prop های بی‌ربط نمی‌شن
- **maintainability بهتر:** تغییر ساختار کامپوننت‌ها آسون‌تره
- **reusability:** کامپوننت‌ها مستقل‌تر و قابل استفاده مجدد هستن

## قانون طلایی

> **اگه prop رو از ۳ لایه بیشتر رد می‌کنی، وقتشه از Context API استفاده کنی!**

## نکته مهم

Context رو برای **همه چیز** استفاده نکن! فقط برای data های global مثل theme، user, language مناسبه. برای state های محلی، همون prop passing بهتره.
