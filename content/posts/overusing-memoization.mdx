---
title: "بچه‌داری اشتباه می‌زنی #۷: استفاده بیش از حد از useMemo و useCallback"
date: '2026-08-22'
tags: ['React', 'useMemo', 'useCallback', 'performance', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا memoization بیش از حد performance رو بدتر می‌کنه و سینیورها کی واقعاً از useMemo/useCallback استفاده می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۷: استفاده بیش از حد از useMemo و useCallback

توی این پست بررسی می‌کنیم چرا memoization بیش از حد کد رو پیچیده و کند می‌کنه و سینیورها کی واقعاً از این hook ها استفاده می‌کنن.

## اشتباه رایج: memoize کردن همه چیز

### ❌ روش جونیور/مید:

```jsx
function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === filter);
  }, [products, filter]);
  
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  const title = useMemo(() => {
    return 'محصولات ' + filter;
  }, [filter]);
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>کلیک</button>
      {filteredProducts.map(p => <Product key={p.id} product={p} />)}
    </div>
  );
}
```

**مشکل:** 
- `title` یه string ساده‌ست، memoize کردنش هزینه اضافی داره
- `handleClick` هیچ dependency نداره، پس useCallback بی‌فایده‌ست
- هر render هزینه memoization رو می‌پردازی

### ✅ روش سینیور:

```jsx
function ProductList({ products, filter }) {
  // ✅ فقط برای محاسبات سنگین
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === filter);
  }, [products, filter]);
  
  // ❌ حذف useCallback چون نیازی نیست
  const handleClick = () => {
    console.log('clicked');
  };
  
  // ❌ حذف useMemo چون محاسبه ساده‌ست
  const title = 'محصولات ' + filter;
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>کلیک</button>
      {filteredProducts.map(p => <Product key={p.id} product={p} />)}
    </div>
  );
}
```

## کی واقعاً لازمشون داریم؟

### ✅ useMemo:
- محاسبات سنگین (فیلتر/سورت آرایه‌های بزرگ)
- ساخت object/array که به عنوان prop به کامپوننت memo شده میدی
- جلوگیری از محاسبه مجدد که واقعاً گرونه

### ✅ useCallback:
- وقتی function رو به کامپوننت memo شده (React.memo) میدی
- وقتی function توی dependency array یه useEffect هست
- جلوگیری از re-render غیرضروری child component ها

## قانون طلایی

> **اول کد رو بدون memoization بنویس، بعد فقط جاهایی که واقعاً performance problem داری، memoize کن!**

## نکته مهم

Memoization خودش هزینه داره:
- هزینه ذخیره مقادیر قبلی
- هزینه مقایسه dependency ها
- پیچیدگی بیشتر کد

اگه محاسبه سریع‌تر از memoization باشه، memoization ضرر داره!
