---
title: "بچه‌داری اشتباه می‌زنی #۱۴: Stale Closure در useEffect و event handlers"
date: '2026-08-22'
tags: ['React', 'stale-closure', 'useEffect', 'useRef', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا stale closure باعث میشه مقادیر قدیمی رو ببینی و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۴: Stale Closure در useEffect و event handlers

توی این پست بررسی می‌کنیم چرا stale closure یکی از گیج‌کننده‌ترین مشکلات React هست و سینیورها چطور حلش می‌کنن.

## اشتباه رایج: دسترسی به مقدار قدیمی state در closure

### ❌ روش جونیور/مید:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Count:', count); // ⚠️ همیشه 0 می‌مونه!
      setCount(count + 1); // ⚠️ همیشه 1 میشه!
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // ⚠️ dependency array خالی
  
  return <div>Count: {count}</div>;
}
```

**مشکل:** 
- `useEffect` فقط یه بار اجرا میشه (موقع mount)
- closure مقدار `count` رو از همون لحظه نگه می‌داره (که 0 هست)
- هر بار که interval اجرا میشه، همون مقدار 0 رو می‌بینه
- `count` هیچوقت از 1 بیشتر نمیشه!

### ✅ روش سینیور:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1); // ✅ functional update
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div>Count: {count}</div>;
}
```

## مثال دیگه: event handler

### ❌ اشتباه:

```jsx
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const handler = () => {
      console.log('Messages:', messages); // ⚠️ همیشه [] می‌مونه!
    };
    
    window.addEventListener('newMessage', handler);
    return () => window.removeEventListener('newMessage', handler);
  }, []);
  
  return <div>...</div>;
}
```

### ✅ درست:

```jsx
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages); // ✅ useRef برای نگه داشتن مقدار جدید
  
  useEffect(() => {
    messagesRef.current = messages; // آپدیت ref با مقدار جدید
  }, [messages]);
  
  useEffect(() => {
    const handler = () => {
      console.log('Messages:', messagesRef.current); // ✅ مقدار جدید
    };
    
    window.addEventListener('newMessage', handler);
    return () => window.removeEventListener('newMessage', handler);
  }, []);
  
  return <div>...</div>;
}
```

## چرا این مشکل پیش میاد؟

- هر render یه closure جدید می‌سازه
- `useEffect` با dependency array خالی، فقط closure اولیه رو نگه می‌داره
- closure های قدیمی به مقادیر قدیمی دسترسی دارن

## قانون طلایی

> **اگه توی useEffect یا event handler به state دسترسی داری و dependency array خالیه، از functional update (`setState(prev => prev + 1)`) یا useRef استفاده کن!**

## راه‌حل‌های مختلف

### ۱. **Functional Update** (برای setState):
```jsx
setCount(c => c + 1);
```

### ۲. **useRef** (برای دسترسی به مقدار جدید):
```jsx
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}, [count]);
```

### ۳. **اضافه کردن dependency** (اگه منطقیه):
```jsx
useEffect(() => {
  console.log(count);
}, [count]); // ✅ هر بار که count تغییر کنه، effect دوباره اجرا میشه
```
