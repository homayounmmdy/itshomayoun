---
title: "بچه‌داری اشتباه می‌زنی #۱۳: useState برای مقادیر ثابت"
date: '2026-08-22'
tags: ['React', 'useState', 'constants', 'useRef', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا نباید مقادیر ثابت رو با useState نگه داشت و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۳: useState برای مقادیر ثابت

توی این پست بررسی می‌کنیم چرا استفاده از useState برای مقادیر ثابت اشتباهه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: useState برای مقادیری که تغییر نمی‌کنن

### ❌ روش جونیور/مید:

```jsx
function ProductList() {
  const [maxItems, setMaxItems] = useState(10); // ⚠️ این مقدار هیچوقت تغییر نمی‌کنه!
  const [apiUrl, setApiUrl] = useState('https://api.example.com'); // ⚠️ ثابت هست
  
  return (
    <div>
      <p>حداکثر آیتم: {maxItems}</p>
      <p>API: {apiUrl}</p>
    </div>
  );
}
```

**مشکل:** 
- `useState` برای مقادیری که تغییر می‌کنن و باید UI رو آپدیت کنن
- مقادیر ثابت نیازی به re-render ندارن
- کد بی‌دلیل پیچیده میشه
- memory اضافی مصرف میشه

### ✅ روش سینیور:

```jsx
function ProductList() {
  const maxItems = 10; // ✅ const معمولی
  const apiUrl = 'https://api.example.com'; // ✅ const معمولی
  
  return (
    <div>
      <p>حداکثر آیتم: {maxItems}</p>
      <p>API: {apiUrl}</p>
    </div>
  );
}
```

## کی از useRef استفاده کنیم؟

اگه مقدار بین رندرها باید حفظ بشه ولی نباید re-render ایجاد کنه:

```jsx
function Timer() {
  const intervalRef = useRef(null); // ✅ بین رندرها حفظ میشه، ولی re-render نمی‌کنه
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
  };
  
  return <button onClick={start}>شروع</button>;
}
```

## قانون طلایی

> **اگه مقدار تغییر نمی‌کنه، از const استفاده کن. اگه تغییر می‌کنه ولی نباید re-render کنه، از useRef. فقط وقتی از useState استفاده کن که مقدار تغییر می‌کنه و باید UI آپدیت بشه!**

## خلاصه

| نوع مقدار | راه‌حل |
|-----------|---------|
| ثابت، تغییر نمی‌کنه | `const` |
| تغییر می‌کنه، ولی نباید re-render کنه | `useRef` |
| تغییر می‌کنه و باید UI آپدیت بشه | `useState` |
