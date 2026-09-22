---
title: "بچه‌داری اشتباه می‌زنی #۶: useState برای state های پیچیده"
date: '2026-08-22'
tags: ['React', 'useState', 'useReducer', 'state-management', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا useState برای state های پیچیده مناسب نیست و سینیورها از useReducer استفاده می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۶: useState برای state های پیچیده

توی این پست بررسی می‌کنیم چرا useState برای state های پیچیده مشکل‌سازه و سینیورها چطور با useReducer این مشکل رو حل می‌کنن.

## اشتباه رایج: چندین useState برای state های مرتبط

### ❌ روش جونیور/مید:

```jsx
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const addItem = (item) => {
    setItems([...items, item]);
    setTotal(total + item.price); // ⚠️ logic پخش و پلا شده
  };
  
  const applyDiscount = (code) => {
    if (code === 'SAVE10') {
      setDiscount(10);
      setTotal(total * 0.9); // ⚠️ state های مرتبط از هم جدا شدن
    }
  };
  
  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    setTotal(newItems.reduce((sum, item) => sum + item.price, 0));
  };
  
  // ⚠️ logic تکراری و پراکنده
  return <div>...</div>;
}
```

**مشکل:** state های مرتبط از هم جدا شدن، logic تکراری شده، و نگهداری کد سخته.

### ✅ روش سینیور:

```jsx
function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const applyDiscount = (code) => dispatch({ type: 'APPLY_DISCOUNT', payload: code });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  
  return <div>...</div>;
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: calculateTotal([...state.items, action.payload], state.discount)
      };
    case 'APPLY_DISCOUNT':
      const discount = action.payload === 'SAVE10' ? 10 : 0;
      return {
        ...state,
        discount,
        total: calculateTotal(state.items, discount)
      };
    case 'REMOVE_ITEM':
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems, state.discount)
      };
    default:
      return state;
  }
}

function calculateTotal(items, discount) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 - discount / 100);
}
```

## چرا این روش بهتره؟

- **State های مرتبط یکجا:** همه چیز توی یه object هست
- **Logic متمرکز:** تمام تغییرات state توی reducer هست
- **Predictable:** هر action دقیقاً می‌دونی چیکار می‌کنه
- **Testable:** reducer رو به راحتی می‌تونی test کنی
- **Debuggable:** می‌تونی action ها رو log کنی

## قانون طلایی

> **اگه ۳ تا یا بیشتر useState داری که به هم مرتبطن، از useReducer استفاده کن!**

## نکته مهم

useReducer برای این موارد مناسبه:
- State های پیچیده با چندین زیرمجموعه
- State بعدی به state قبلی وابسته‌ست
- Logic پیچیده برای آپدیت state
- نیاز به test کردن logic state
