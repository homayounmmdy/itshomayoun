---
title: "بچه‌داری اشتباه می‌زنی #۳: تغییر مستقیم state"
date: '2026-08-22'
tags: ['React', 'useState', 'immutable', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا نباید state رو مستقیم تغییر داد و سینیورها چطور immutable updates انجام می‌دن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۳: تغییر مستقیم state

توی این پست بررسی می‌کنیم چرا تغییر مستقیم state مشکل‌سازه و سینیورها چطور با immutable updates این مشکل رو حل می‌کنن.

## اشتباه رایج: تغییر مستقیم object/array در state

### ❌ روش جونیور/مید:

```jsx
function UserProfile() {
  const [user, setUser] = useState({ name: 'علی', age: 25 });
  
  const handleBirthday = () => {
    user.age = user.age + 1; // ⚠️ تغییر مستقیم state!
    setUser(user);
  };
  
  const addHobby = () => {
    user.hobbies.push('مطالعه'); // ⚠️ تغییر مستقیم آرایه!
    setUser(user);
  };
  
  return (
    <div>
      <p>{user.name} - {user.age} ساله</p>
      <button onClick={handleBirthday}>تولد مبارک!</button>
      <button onClick={addHobby}>افزودن سرگرمی</button>
    </div>
  );
}
```

**مشکل:** React متوجه تغییر state نمیشه چون reference همونه. UI آپدیت نمیشه یا behavior غیرقابل پیش‌بینی پیدا می‌کنه.

### ✅ روش سینیور:

```jsx
function UserProfile() {
  const [user, setUser] = useState({ name: 'علی', age: 25 });
  
  const handleBirthday = () => {
    setUser({ ...user, age: user.age + 1 }); // ✅ ایجاد object جدید
  };
  
  const addHobby = () => {
    setUser({ 
      ...user, 
      hobbies: [...(user.hobbies || []), 'مطالعه'] // ✅ ایجاد آرایه جدید
    });
  };
  
  return (
    <div>
      <p>{user.name} - {user.age} ساله</p>
      <button onClick={handleBirthday}>تولد مبارک!</button>
      <button onClick={addHobby}>افزودن سرگرمی</button>
    </div>
  );
}
```

## چرا این روش بهتره؟

- **React متوجه تغییر میشه:** reference جدید ایجاد شده، پس re-render اتفاق می‌افته
- **Predictable behavior:** state همیشه immutable هست
- **Time-travel debugging:** می‌تونی به state های قبلی برگردی
- **Memoization درست کار می‌کنه:** `useMemo` و `useCallback` درست عمل می‌کنن

## قانون طلایی

> **هرگز state رو مستقیم تغییر نده! همیشه یه object/array جدید بساز.**

## نکته مهم

برای آپدیت‌های پیچیده، از library هایی مثل **Immer** استفاده کن که syntax ساده‌تری داره:

```jsx
import { produce } from 'immer';

const handleComplexUpdate = () => {
  setUser(produce(user, draft => {
    draft.age += 1;
    draft.hobbies.push('مطالعه');
  }));
};
```
