---
title: "بچه‌داری اشتباه می‌زنی #۱۵: object و array به عنوان dependency در useEffect"
date: '2026-08-22'
tags: ['React', 'useEffect', 'dependency-array', 'reference-equality', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا object و array به عنوان dependency باعث اجرای بی‌دلیل useEffect میشه و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۵: object و array به عنوان dependency در useEffect

توی این پست بررسی می‌کنیم چرا object و array به عنوان dependency در useEffect باعث اجرای بی‌دلیل effect میشه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: object یا array به عنوان dependency

### ❌ روش جونیور/مید:

```jsx
function ProductList({ filters }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts(filters).then(setProducts);
  }, [filters]); // ⚠️ filters یه object هست!
  
  return <div>...</div>;
}

// استفاده:
<ProductList filters={{ category: 'electronics', price: 100 }} />
```

**مشکل:** 
- React با `===` dependency ها رو مقایسه می‌کنه (reference equality)
- هر بار که parent رندر میشه، یه object جدید ساخته میشه
- حتی اگه محتوا یکی باشه، reference متفاوته
- `useEffect` هر بار اجرا میشه → درخواست‌های بی‌پایان به سرور!

### ✅ روش سینیور:

```jsx
function ProductList({ category, maxPrice }) {
  const [products, setProducts] = useState([]);
  
  // ✅ dependency های primitive
  useEffect(() => {
    fetchProducts({ category, maxPrice }).then(setProducts);
  }, [category, maxPrice]);
  
  return <div>...</div>;
}

// استفاده:
<ProductList category="electronics" maxPrice={100} />
```

## راه‌حل‌های دیگه

### ۱. **useMemo برای ثابت نگه داشتن reference:**

```jsx
function Parent() {
  const filters = useMemo(() => ({
    category: 'electronics',
    price: 100
  }), []); // ✅ reference ثابت می‌مونه
  
  return <ProductList filters={filters} />;
}
```

### ۲. **JSON.stringify برای مقایسه عمیق:**

```jsx
function ProductList({ filters }) {
  const [products, setProducts] = useState([]);
  const filtersKey = JSON.stringify(filters);
  
  useEffect(() => {
    fetchProducts(filters).then(setProducts);
  }, [filtersKey]); // ✅ مقایسه بر اساس مقدار
  
  return <div>...</div>;
}
```

### ۳. **استفاده از library مثل fast-deep-equal:**

```jsx
import useDeepCompareEffect from 'use-deep-compare-effect';

function ProductList({ filters }) {
  useDeepCompareEffect(() => {
    fetchProducts(filters).then(setProducts);
  }, [filters]); // ✅ مقایسه عمیق
}
```

## قانون طلایی

> **هیچ‌وقت object یا array رو مستقیم توی dependency array نذار! یا primitive هاش رو جدا کن، یا با useMemo reference ثابت نگه دار، یا از مقایسه عمیق استفاده کن!**

## نکته مهم

این مشکل فقط برای `useEffect` نیست، برای `useMemo` و `useCallback` هم صدق می‌کنه:

```jsx
// ❌ اشتباه
const result = useMemo(() => compute(data), [data]); // data object هست

// ✅ درست
const result = useMemo(() => compute(data), [data.id, data.version]);
```
