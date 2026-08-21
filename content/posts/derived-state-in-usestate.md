---
title: "بچه‌داری اشتباه می‌زنی #۱۰: ذخیره مقادیر محاسبه‌شده در state"
date: '2026-08-22'
tags: ['React', 'useState', 'derived-state', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا نباید مقادیری که از state دیگه محاسبه میشن رو توی state جدا ذخیره کرد و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۰: ذخیره مقادیر محاسبه‌شده در state

توی این پست بررسی می‌کنیم چرا ذخیره مقادیر derived در state مشکل‌سازه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: state برای مقادیری که از state دیگه محاسبه میشن

### ❌ روش جونیور/مید:

```jsx
function UserForm() {
  const [firstName, setFirstName] = useState('علی');
  const [lastName, setLastName] = useState('محمدی');
  const [fullName, setFullName] = useState('');
  
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`); // ⚠️ derived state
  }, [firstName, lastName]);
  
  return (
    <div>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input value={lastName} onChange={e => setLastName(e.target.value)} />
      <p>نام کامل: {fullName}</p>
    </div>
  );
}
```

**مشکل:** 
- `fullName` از `firstName` و `lastName` محاسبه میشه، پس نباید state جدا باشه
- یه render اضافه برای آپدیت `fullName` اتفاق می‌افته
- اگه useEffect رو فراموش کنی، state ها sync نمیشن
- source of truth چندتا میشه

### ✅ روش سینیور:

```jsx
function UserForm() {
  const [firstName, setFirstName] = useState('علی');
  const [lastName, setLastName] = useState('محمدی');
  
  // ✅ محاسبه مستقیم در render
  const fullName = `${firstName} ${lastName}`;
  
  return (
    <div>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input value={lastName} onChange={e => setLastName(e.target.value)} />
      <p>نام کامل: {fullName}</p>
    </div>
  );
}
```

## چرا این روش بهتره؟

- **یک source of truth:** فقط `firstName` و `lastName` واقعاً state هستن
- **render کمتر:** نیازی به render اضافه برای sync کردن state ها نیست
- **بدون bug:** هیچ‌وقت state ها با هم sync نمیشن
- **کد ساده‌تر:** useEffect اضافی حذف میشه

## قانون طلایی

> **اگه یه مقدار رو می‌تونی از state یا props های دیگه محاسبه کنی، نباید توی state ذخیره‌ش کنی!**

## مثال‌های رایج دیگه

```jsx
// ❌ اشتباه
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
useEffect(() => {
  setFilteredItems(items.filter(i => i.active));
}, [items]);

// ✅ درست
const filteredItems = items.filter(i => i.active);

// ❌ اشتباه
const [cart, setCart] = useState([]);
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(cart.reduce((sum, i) => sum + i.price, 0));
}, [cart]);

// ✅ درست
const total = cart.reduce((sum, i) => sum + i.price, 0);
```

## نکته مهم

اگه محاسبه سنگینه، از `useMemo` استفاده کن:

```jsx
const expensiveResult = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```
