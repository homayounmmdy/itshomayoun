---
title: "بچه‌داری اشتباه می‌زنی #۱۱: فراخوانی API در body کامپوننت"
date: '2026-08-22'
tags: ['React', 'useEffect', 'fetch', 'infinite-loop', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا فراخوانی API در body کامپوننت باعث infinite loop میشه و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۱: فراخوانی API در body کامپوننت

توی این پست بررسی می‌کنیم چرا فراخوانی API مستقیم در body کامپوننت باعث infinite loop میشه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: فراخوانی تابع async در body کامپوننت

### ❌ روش جونیور/مید:

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  
  // ⚠️ فراخوانی مستقیم در body کامپوننت!
  async function fetchUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  }
  
  fetchUsers(); // ⚠️ هر render این تابع اجرا میشه!
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**مشکل:** 
- هر بار که کامپوننت رندر میشه، `fetchUsers` اجرا میشه
- `setUsers` باعث re-render میشه
- re-render دوباره `fetchUsers` رو اجرا می‌کنه
- **infinite loop** ایجاد میشه!
- هزاران درخواست به سرور فرستاده میشه

### ✅ روش سینیور:

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching users:', error);
          setLoading(false);
        }
      }
    }
    
    fetchUsers();
    
    return () => {
      isMounted = false;
    };
  }, []); // ✅ فقط یک بار اجرا میشه
  
  if (loading) return <div>در حال بارگذاری...</div>;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

## چرا این روش بهتره؟

- **یک بار اجرا:** فقط موقع mount کامپوننت اجرا میشه
- **بدون infinite loop:** dependency array خالی باعث میشه دوباره اجرا نشه
- **Cleanup:** اگه کامپوننت unmount شد، state آپدیت نمیشه
- **Error handling:** خطاها به درستی handle میشن
- **Loading state:** UX بهتر برای کاربر

## قانون طلایی

> **هرگز تابع async یا side effect رو مستقیم در body کامپوننت اجرا نکن! همیشه از useEffect استفاده کن!**

## نکته مهم

اگه از React 18 استفاده می‌کنی، می‌تونی از **React Query** یا **SWR** استفاده کنی که مدیریت fetch، caching، و error handling رو خودشون انجام میدن:

```jsx
import useSWR from 'swr';

function UserList() {
  const { data: users, error, isLoading } = useSWR('/api/users', fetcher);
  
  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در دریافت اطلاعات</div>;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```
