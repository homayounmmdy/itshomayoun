---
title: "بچه‌داری اشتباه می‌زنی #۱۲: عدم cleanup برای event listener ها"
date: '2026-08-22'
tags: ['React', 'useEffect', 'cleanup', 'memory-leak', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا cleanup نکردن event listener ها باعث memory leak میشه و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۲: عدم cleanup برای event listener ها

توی این پست بررسی می‌کنیم چرا cleanup نکردن event listener ها و timer ها باعث memory leak میشه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: اضافه کردن event listener بدون cleanup

### ❌ روش جونیور/مید:

```jsx
function ScrollTracker() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    });
    // ⚠️ هیچ cleanup ای نداره!
  }, []);
  
  return <div>Scroll: {scrollPosition}px</div>;
}
```

**مشکل:** 
- هر بار که کامپوننت mount میشه، یه event listener جدید اضافه میشه
- وقتی کامپوننت unmount میشه، event listener باقی می‌مونه
- **memory leak** ایجاد میشه
- اگه کامپوننت ۱۰ بار mount/unmount بشه، ۱۰ تا listener داری که همشون اجرا میشن
- performance به شدت افت می‌کنه

### ✅ روش سینیور:

```jsx
function ScrollTracker() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // ✅ cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return <div>Scroll: {scrollPosition}px</div>;
}
```

## مثال‌های دیگه

### ❌ setInterval بدون cleanup:

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    // ⚠️ هیچ cleanup ای نداره!
  }, []);
  
  return <div>{seconds}</div>;
}
```

### ✅ setInterval با cleanup:

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // ✅ cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div>{seconds}</div>;
}
```

## چرا cleanup مهمه؟

- **جلوگیری از memory leak:** resource ها آزاد میشن
- **جلوگیری از behavior غیرمنتظره:** listener های قدیمی اجرا نمیشن
- **performance بهتر:** از اجرای چندباره جلوگیری میشه
- **کد قابل پیش‌بینی:** هر کامپوننت مسئول cleanup خودش هست

## قانون طلایی

> **هر چیزی که توی useEffect اضافه می‌کنی (event listener، interval، subscription)، باید توی cleanup function حذف بشه!**

## نکته مهم

اگه از subscription استفاده می‌کنی (مثل WebSocket، Firebase):

```jsx
useEffect(() => {
  const subscription = someAPI.subscribe(data => {
    setData(data);
  });
  
  return () => {
    subscription.unsubscribe(); // ✅ cleanup
  };
}, []);
```
