---
title: "بچه‌داری اشتباه می‌زنی #۴: dependency array اشتباه در useEffect"
date: '2026-08-22'
tags: ['React', 'useEffect', 'dependency-array', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا dependency array اشتباه باعث infinite loop و memory leak میشه و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۴: dependency array اشتباه در useEffect

توی این پست بررسی می‌کنیم چرا dependency array اشتباه کد رو به کابوس تبدیل می‌کنه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: فراموش کردن dependency یا اضافه کردن dependency اشتباه

### ❌ روش جونیور/مید:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId, count]); // ⚠️ count ربطی به این effect نداره!
  
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={() => setCount(c => c + 1)}>شمارنده: {count}</button>
    </div>
  );
}
```

**مشکل:** هر بار که کاربر دکمه رو بزنه، effect دوباره اجرا میشه و درخواست غیرضروری به سرور فرستاده میشه.

### ✅ روش سینیور:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let isMounted = true;
    
    fetchUser(userId)
      .then(data => {
        if (isMounted) setUser(data);
      })
      .catch(err => console.error(err));
    
    return () => {
      isMounted = false;
    };
  }, [userId]); // ✅ فقط dependency های واقعی
  
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={() => setCount(c => c + 1)}>شمارنده: {count}</button>
    </div>
  );
}
```

## چرا این روش بهتره؟

- **درخواست‌های اضافی حذف میشن:** فقط وقتی `userId` تغییر کنه، effect اجرا میشه
- **Race condition مدیریت میشه:** با `isMounted` از آپدیت state روی کامپوننت unmounted جلوگیری میشه
- **Error handling:** خطاها به درستی handle میشن

## قانون طلایی

> **فقط متغیرهایی رو توی dependency array بذار که واقعاً توی effect استفاده شدن!**

## نکته مهم

اگه ESLint warning می‌بینی که میگه "missing dependency"، اول فکر کن که آیا اون متغیر واقعاً لازمه یا نه. اگه لازمه، یا dependency رو اضافه کن یا با `useCallback`/`useMemo` ثابتش نگه دار.
