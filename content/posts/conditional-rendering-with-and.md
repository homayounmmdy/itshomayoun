---
title: "بچه‌داری اشتباه می‌زنی #۱۶: conditional rendering اشتباه با &&"
date: '2026-08-22'
tags: ['React', 'conditional-rendering', 'JSX', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا استفاده از && برای conditional rendering باعث نمایش 0 میشه و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۶: conditional rendering اشتباه با &&

توی این پست بررسی می‌کنیم چرا استفاده از `&&` برای conditional rendering باعث مشکلات عجیب میشه و سینیورها چطور حلش می‌کنن.

## اشتباه رایج: استفاده از && با مقدار 0

### ❌ روش جونیور/مید:

```jsx
function ProductList({ products }) {
  return (
    <div>
      <h1>محصولات</h1>
      {products.length && (
        <ul>
          {products.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      )}
    </div>
  );
}
```

**مشکل:** 
- وقتی `products.length` برابر 0 باشه، React عدد `0` رو render می‌کنه!
- کاربر یه `0` عجیب توی صفحه می‌بینه
- این به خاطر JavaScript truthy/falsy هست: `0 && <div>` برابر `0` میشه

### ✅ روش سینیور:

```jsx
function ProductList({ products }) {
  return (
    <div>
      <h1>محصولات</h1>
      {products.length > 0 && (
        <ul>
          {products.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      )}
    </div>
  );
}
```

## راه‌حل‌های دیگه

### ۱. **استفاده از ternary operator:**

```jsx
{products.length > 0 ? (
  <ul>
    {products.map(p => <li key={p.id}>{p.name}</li>)}
  </ul>
) : null}
```

### ۲. **استفاده از Boolean():**

```jsx
{Boolean(products.length) && (
  <ul>
    {products.map(p => <li key={p.id}>{p.name}</li>)}
  </ul>
)}
```

### ۳. **تبدیل به boolean با !!:**

```jsx
{!!products.length && (
  <ul>
    {products.map(p => <li key={p.id}>{p.name}</li>)}
  </ul>
)}
```

## مثال‌های دیگه که مشکل‌ساز میشن

```jsx
// ❌ اشتباه - ممکنه 0 نشون بده
{items.count && <span>{items.count} آیتم</span>}

// ✅ درست
{items.count > 0 && <span>{items.count} آیتم</span>}

// ❌ اشتباه - ممکنه "" نشون بده
{user.name && <span>{user.name}</span>}

// ✅ درست
{user.name ? <span>{user.name}</span> : null}
```

## قانون طلایی

> **هیچ‌وقت از `&&` با مقادیری که ممکنه 0، ""، یا NaN باشن استفاده نکن! یا از مقایسه صریح (`> 0`) استفاده کن یا از ternary operator!**

## نکته مهم

این مشکل فقط برای `&&` نیست، برای `||` هم صدق می‌کنه:

```jsx
// ❌ ممکنه 0 نشون بده
{count || <span>بدون شمارش</span>}

// ✅ درست
{count > 0 ? count : <span>بدون شمارش</span>}
```
