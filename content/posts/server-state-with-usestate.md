---
title: "بچه‌داری اشتباه می‌زنی #۲۲: مدیریت Server State با useState"
date: '2026-08-22'
tags: ['React', 'ReactQuery', 'SWR', 'server-state', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا useState برای server data اشتباهه و سینیورها چطور با React Query حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۲۲: مدیریت Server State با useState

توی این پست بررسی می‌کنیم چرا useState برای server data مشکل‌سازه و سینیورها چطور با React Query یا SWR این مشکل رو حل می‌کنن.

## اشتباه رایج: useState برای server data

### ❌ روش جونیور/مید:

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleRefresh = () => fetchUsers(); // ⚠️ دوباره fetch می‌کنه!
  
  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}
```

**مشکل:** 
- **Caching نداره:** هر بار که کامپوننت mount بشه، دوباره fetch می‌کنه
- **Deduplication نداره:** اگه ۲ کامپوننت همزمان fetch کنن، ۲ درخواست میره
- **Stale data:** وقتی data تغییر می‌کنه، UI آپدیت نمیشه
- **Refetch logic پیچیده:** باید خودت بنویسی
- **Optimistic updates سخته:** باید خودت handle کنی
- **Pagination/Infinite scroll سخته:** باید خودت پیاده‌سازی کنی

### ✅ روش سینیور:

```jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // ✅ ۵ دقیقه cache
    refetchOnWindowFocus: true, // ✅ وقتی کاربر برمی‌گرده، refetch کن
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}
```

## چرا React Query بهتره؟

### ✅ **Caching خودکار:**
- Data رو cache می‌کنه
- وقتی دوباره نیاز بشه، از cache می‌خونه (سریع!)
- Background refetch می‌کنه

### ✅ **Deduplication:**
- اگه ۱۰ کامپوننت همزمان یه data رو بخوان، فقط ۱ درخواست میره

### ✅ **Stale-while-revalidate:**
- اول data قدیمی رو نشون میده (سریع)
- بعد background refetch می‌کنه و UI آپدیت میشه

### ✅ **Optimistic updates:**
```jsx
const { mutate } = useMutation({
  mutationFn: deleteUser,
  onMutate: async (userId) => {
    // ✅ قبل از اینکه سرور جواب بده، UI آپدیت کن
    await queryClient.cancelQueries(['users']);
    const previousUsers = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], old => 
      old.filter(u => u.id !== userId)
    );
    return { previousUsers };
  },
  onError: (err, userId, context) => {
    // ❌ اگه خطا شد، rollback کن
    queryClient.setQueryData(['users'], context.previousUsers);
  },
  onSettled: () => {
    // ✅ بعدش refetch کن
    queryClient.invalidateQueries(['users']);
  },
});
```

### ✅ **Pagination و Infinite scroll:**
```jsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: ({ pageParam = 0 }) => fetchUsers(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

## SWR هم گزینه خوبیه

```jsx
import useSWR from 'swr';

function UserList() {
  const { data: users, error, isLoading, mutate } = useSWR('/api/users', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## قانون طلایی

> **برای server data (API calls)، هیچ‌وقت از useState استفاده نکن! از React Query یا SWR استفاده کن!**

## چه زمانی از useState استفاده کنیم؟

- **Client state:** form inputs، UI state (modal open/close)، local component state
- **Server state:** data از API، cache، sync با سرور → React Query/SWR

## نکته مهم

- React Query نیاز به `QueryClientProvider` داره
- SWR هم نیاز به `SWRConfig` داره (اختیاری)
- هر دو library خیلی سبک هستن و ارزش اضافه کردن رو دارن
- برای mutation (POST/PUT/DELETE) از `useMutation` استفاده کن
