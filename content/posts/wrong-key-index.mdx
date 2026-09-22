---
title: "بچه‌داری اشتباه می‌زنی #۱: استفاده از index به عنوان key"
date: '2026-08-22'
tags: ['React', 'key-prop', 'اشتباهات_جونیور', 'سینیور_روش', 'برنامه‌نویسی_ری‌اکت']
description: "چرا استفاده از index آرایه به عنوان key اشتباهه و سینیورها چطور این مشکل رو حل می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱: استفاده از index به عنوان key

توی این سری قراره اشتباهات رایج برنامه‌نویس‌های جونیور و مید رو بررسی کنیم و ببینیم سینیورها چطور این مشکلات رو حل می‌کنن.

## اشتباه رایج: استفاده از index آرایه به عنوان key

### ❌ روش جونیور/مید:

```jsx
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo.text}
          <button onClick={() => onDelete(index)}>حذف</button>
        </li>
      ))}
    </ul>
  );
}
```

**مشکل:** وقتی آیتم‌ها رو حذف، اضافه یا مرتب می‌کنی، React نمی‌تونه درست تشخیص بده کدوم آیتم تغییر کرده. این باعث bugs عجیب و performance بد میشه.

### ✅ روش سینیور:

```jsx
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onDelete(todo.id)}>حذف</button>
        </li>
      ))}
    </ul>
  );
}
```

## چرا این روش بهتره؟

- **شناسایی دقیق:** React دقیقاً می‌فهمه کدوم آیتم تغییر کرده
- **Performance بهتر:** فقط آیتم‌های تغییر کرده re-render میشن
- **بدون bug:** state هر آیتم درست حفظ میشه

## قانون طلایی

> **همیشه از شناسه‌های یکتا و پایدار استفاده کن، نه index آرایه!**
