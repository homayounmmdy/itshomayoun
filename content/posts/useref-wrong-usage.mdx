---
title: "بچه‌داری اشتباه می‌زنی #۹: useRef برای state"
date: '2026-08-22'
tags: ['React', 'useRef', 'useState', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا useRef برای نگه داشتن state اشتباهه و سینیورها کی واقعاً از useRef استفاده می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۹: useRef برای state

توی این پست بررسی می‌کنیم چرا useRef برای نگه داشتن state مشکل‌سازه و سینیورها کی واقعاً از useRef استفاده می‌کنن.

## اشتباه رایج: useRef به جای useState

### ❌ روش جونیور/مید:

```jsx
function Counter() {
  const countRef = useRef(0);
  
  const increment = () => {
    countRef.current += 1;
    console.log('Count:', countRef.current); // ✅ مقدار درست
  };
  
  return (
    <div>
      <p>شمارنده: {countRef.current}</p> {/* ❌ همیشه 0 می‌مونه! */}
      <button onClick={increment}>افزایش</button>
    </div>
  );
}
```

**مشکل:** 
- `useRef` باعث re-render نمیشه
- UI آپدیت نمیشه حتی اگه مقدار تغییر کنه
- کاربر مقدار جدید رو نمی‌بینه

### ✅ روش سینیور:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(c => c + 1); // ✅ باعث re-render میشه
  };
  
  return (
    <div>
      <p>شمارنده: {count}</p> {/* ✅ آپدیت میشه */}
      <button onClick={increment}>افزایش</button>
    </div>
  );
}
```

## کی از useRef استفاده کنیم؟

### ✅ useRef مناسبه برای:
- **دسترسی به DOM elements:** `inputRef.current.focus()`
- **نگه داشتن مقادیر بین رندرها بدون re-render:** timer IDs، socket connections
- **نگه داشتن مقدار قبلی:** مقایسه با render قبلی

### ❌ useRef مناسب نیست برای:
- هر چیزی که باید UI رو آپدیت کنه
- state که کاربر باید ببینه
- هر چیزی که تغییرش باید باعث re-render بشه

## مثال درست از useRef

```jsx
function Timer() {
  const intervalRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };
  
  return (
    <div>
      <p>{seconds} ثانیه</p>
      <button onClick={startTimer}>شروع</button>
      <button onClick={stopTimer}>توقف</button>
    </div>
  );
}
```

## قانون طلایی

> **اگه تغییر مقدار باید UI رو آپدیت کنه، از useState استفاده کن. اگه نباید آپدیت کنه، از useRef!**

## نکته مهم

`useRef` مثل یه جعبه‌ست که می‌تونی توش چیزی بذاری و بین رندرها نگه داری، ولی React نمی‌فهمه که توش تغییر کرده. برای همین re-render اتفاق نمی‌افته.
