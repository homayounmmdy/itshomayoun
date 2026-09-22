---
title: "بچه‌داری اشتباه می‌زنی #۱۹: نداشتن Custom Hook برای logic تکراری"
date: '2026-08-22'
tags: ['React', 'CustomHooks', 'reusability', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا کپی کردن logic تکراری در کامپوننت‌های مختلف اشتباهه و سینیورها چطور با Custom Hook حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۹: نداشتن Custom Hook برای logic تکراری

توی این پست بررسی می‌کنیم چرا کپی کردن logic تکراری در کامپوننت‌های مختلف اشتباهه و سینیورها چطور با Custom Hook این مشکل رو حل می‌کنن.

## اشتباه رایج: کپی کردن logic تکراری

### ❌ روش جونیور/مید:

```jsx
// کامپوننت اول
function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => { isMounted = false; };
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// کامپوننت دوم - دقیقاً همون logic کپی شده!
function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => { isMounted = false; };
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <ul>{data.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

**مشکل:** 
- ۵۰ خط کد تکراری
- اگه بخوای یه تغییر بدی (مثلاً retry اضافه کنی)، باید همه جا تغییر بدی
- احتمال bug توی یه جا و نه بقیه
- نگهداری کد سخته

### ✅ روش سینیور:

```jsx
// useFetch.js - Custom Hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => { isMounted = false; };
  }, [url]);
  
  return { data, loading, error };
}

// استفاده در کامپوننت‌ها - خیلی تمیز!
function UserList() {
  const { data, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

function ProductList() {
  const { data, loading, error } = useFetch('/api/products');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <ul>{data.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

## قوانین Custom Hook

### ✅ کارهایی که باید بکنی:
- **نام با `use` شروع بشه:** `useFetch`, `useAuth`, `useLocalStorage`
- **منطق قابل استفاده مجدد** رو extract کن
- **Hook های دیگه** رو می‌تونی توش استفاده کنی
- **مقدار برگردونی** می‌تونه object، array، یا primitive باشه

### ❌ کارهایی که نباید بکنی:
- **بدون `use` شروع نکن:** `fetchData` ❌ باید `useFetchData` باشه
- **Hook رو conditional صدا نزن:** فقط توی top-level
- **خیلی بزرگ نساز:** یه hook باید یه کار مشخص انجام بده

## Custom Hook های پرکاربرد

```jsx
// ۱. LocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// ۲. Window size
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// ۳. Debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

## قانون طلایی

> **اگه یه logic رو بیشتر از ۲ بار کپی کردی، وقتشه یه Custom Hook بسازی!**

## نکته مهم

Custom Hook ها:
- **کد رو تمیز** می‌کنن
- **قابل تست** هستن (چون logic جداست)
- **قابل استفاده مجدد** در پروژه‌های مختلف
- **نگهداری آسون** (تغییر یه جا، همه جا اعمال میشه)
