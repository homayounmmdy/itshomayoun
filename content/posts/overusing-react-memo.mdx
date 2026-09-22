---
title: "بچه‌داری اشتباه می‌زنی #۸: استفاده بی‌رویه از React.memo"
date: '2026-08-22'
tags: ['React', 'React.memo', 'performance', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا React.memo روی همه کامپوننت‌ها performance رو بدتر می‌کنه و سینیورها کی واقعاً ازش استفاده می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۸: استفاده بی‌رویه از React.memo

توی این پست بررسی می‌کنیم چرا React.memo روی همه کامپوننت‌ها کد رو کندتر می‌کنه و سینیورها کی واقعاً ازش استفاده می‌کنن.

## اشتباه رایج: memoize کردن همه کامپوننت‌ها

### ❌ روش جونیور/مید:

```jsx
const Button = React.memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

const Input = React.memo(({ value, onChange }) => {
  return <input value={value} onChange={onChange} />;
});

const Card = React.memo(({ title, content }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
});
```

**مشکل:** 
- React.memo خودش هزینه داره (مقایسه shallow props)
- اگه کامپوننت هر بار با props جدید رندر میشه، memoization بی‌فایده‌ست
- کد شلوغ و سخت‌خون میشه

### ✅ روش سینیور:

```jsx
// کامپوننت‌های ساده رو بدون memo بنویس
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// فقط کامپوننت‌های سنگین یا با رندر مکرر
const ExpensiveList = React.memo(({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
```

## کی واقعاً لازمش داریم؟

### ✅ React.memo مفیده وقتی:
- کامپوننت **سنگین** هست (رندر طولانی)
- کامپوننت **بارها** با props یکسان رندر میشه
- parent کامپوننت **زیاد** re-render میشه ولی props این کامپوننت تغییر نمی‌کنه

### ❌ React.memo بی‌فایده‌ست وقتی:
- کامپوننت ساده و سبک هست
- props هر بار تغییر می‌کنن
- کامپوننت فقط یه بار رندر میشه

## قانون طلایی

> **اول بدون React.memo بنویس، بعد با React DevTools Profiler جاهایی که واقعاً re-render غیرضروری دارن رو پیدا کن و فقط اونجا memoize کن!**

## نکته مهم

React.memo فقط **shallow comparison** انجام میده. اگه object یا function به عنوان prop میدی، باید با `useMemo` و `useCallback` reference ثابت نگه داری، وگرنه memoization بی‌فایده‌ست.

```jsx
// ❌ بی‌فایده چون object هر بار جدیده
<Card style={{ color: 'red' }} />

// ✅ درست با useMemo
const style = useMemo(() => ({ color: 'red' }), []);
<Card style={style} />
```
