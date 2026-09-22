---
title: "بچه‌داری اشتباه می‌زنی #۲۳: استفاده از any در TypeScript"
date: '2026-08-22'
tags: ['React', 'TypeScript', 'any-type', 'type-safety', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا استفاده از any در TypeScript اشتباهه و سینیورها چطور تایپ درست انجام می‌دن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۲۳: استفاده از any در TypeScript

توی این پست بررسی می‌کنیم چرا استفاده از `any` در TypeScript باعث از بین رفتن تمام مزایای TypeScript میشه و سینیورها چطور تایپ درست انجام می‌دن.

## اشتباه رایج: استفاده از any برای فرار از خطا

### ❌ روش جونیور/مید:

```tsx
// ❌ استفاده از any برای props
interface UserCardProps {
  user: any; // ⚠️ هیچ تایپی نداره!
  onClick: any; // ⚠️ نمی‌دونم چه پارامترهایی داره
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div onClick={onClick}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.age}</p>
    </div>
  );
}

// ❌ استفاده از any برای state
function UserList() {
  const [users, setUsers] = useState<any>([]); // ⚠️ نمی‌دونم چه ساختاری داره
  const [selectedUser, setSelectedUser] = useState<any>(null); // ⚠️ same
  
  const handleUserClick = (user: any) => { // ⚠️ any دوباره!
    setSelectedUser(user);
  };
  
  return (
    <div>
      {users.map((user: any) => ( // ⚠️ any توی map!
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={() => handleUserClick(user)} 
        />
      ))}
    </div>
  );
}
```

**مشکل:** 
- **Type safety از بین میره:** TypeScript دیگه کمکی نمی‌کنه
- **Autocomplete کار نمی‌کنه:** IDE نمی‌دونه چه property هایی داری
- **Refactor سخته:** اگه ساختار تغییر کنه، TypeScript نمی‌فهمه
- **Runtime errors:** خطاهایی که باید compile time گرفته بشن، runtime میان
- **مستندات ضعیف:** بقیه برنامه‌نویس‌ها نمی‌فهمن ساختار data چیه

### ✅ روش سینیور:

```tsx
// ✅ تایپ دقیق برای User
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional property
}

// ✅ تایپ دقیق برای props
interface UserCardProps {
  user: User;
  onClick: (user: User) => void; // ✅ دقیقاً می‌دونم چه پارامتری داره
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div onClick={() => onClick(user)}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.age && <p>{user.age}</p>}
    </div>
  );
}

// ✅ تایپ دقیق برای state
function UserList() {
  const [users, setUsers] = useState<User[]>([]); // ✅ آرایه‌ای از User
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // ✅ User یا null
  
  const handleUserClick = (user: User) => { // ✅ تایپ دقیق
    setSelectedUser(user);
  };
  
  return (
    <div>
      {users.map((user) => ( // ✅ TypeScript خودکار تایپ رو می‌فهمه
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={handleUserClick} 
        />
      ))}
    </div>
  );
}
```

## مثال‌های رایج دیگه

### ❌ اشتباه: any برای event handler

```tsx
function SearchInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e: any) => { // ❌ any!
    setValue(e.target.value);
  };
  
  return <input value={value} onChange={handleChange} />;
}
```

### ✅ درست: تایپ دقیق event

```tsx
function SearchInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // ✅
    setValue(e.target.value);
  };
  
  return <input value={value} onChange={handleChange} />;
}
```

### ❌ اشتباه: any برای API response

```tsx
async function fetchUser(id: number): Promise<any> { // ❌
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

const user = await fetchUser(1);
console.log(user.name); // ❌ TypeScript نمی‌دونه name داره یا نه
```

### ✅ درست: تایپ دقیق response

```tsx
async function fetchUser(id: number): Promise<User> { // ✅
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

const user = await fetchUser(1);
console.log(user.name); // ✅ TypeScript می‌دونه name داره
```

## کی از unknown استفاده کنیم؟

اگه واقعاً نمی‌دونی تایپ چیه، به جای `any` از `unknown` استفاده کن:

```tsx
function parseData(data: unknown) {
  // ❌ با any می‌تونی هر کاری بکنی
  // console.log(data.name); // کار می‌کنه ولی خطرناک
  
  // ✅ با unknown باید اول چک کنی
  if (typeof data === 'object' && data !== null && 'name' in data) {
    console.log((data as { name: string }).name); // ✅ امن
  }
}
```

## قانون طلایی

> **هرگز از `any` استفاده نکن! اگه تایپ رو نمی‌دونی، یا تایپش رو بساز یا از `unknown` استفاده کن و type guard بذار!**

## نکته مهم

- `any` تمام مزایای TypeScript رو از بین می‌بره
- ESLint rule بذار که `any` رو ممنوع کنه: `"@typescript-eslint/no-explicit-any": "error"`
- اگه library تایپ نداره، خودت type declaration بنویس
- از `interface` و `type` برای ساختارهای پیچیده استفاده کن
