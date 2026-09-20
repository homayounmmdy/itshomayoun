---
title: "چک‌لیست سریع a11y: محتوای پویا و مناطق زنده (Dynamic Content & Live Regions)"
date: '2026-09-23'
tags: ['a11y', 'Accessibility', 'Live-Regions', 'aria-live', 'WCAG', 'React', 'SPA']
description: "چرا در SPAها (مثل React) کاربر اسکرین‌ریدر از تغییرات محتوا بی‌خبر می‌مونه و چطور با aria-live و role‌های مناسب این مشکل رو حل کنیم."
enableComment: true
---

# 🔔 چک‌لیست سریع: محتوای پویا و مناطق زنده (Dynamic Content & Live Regions)

**💡 مفهوم کلیدی**  
در سایت‌های سنتی، وقتی صفحه عوض میشه، اسکرین‌ریدر کل صفحه رو از اول می‌خونه. اما در **SPAها (React, Vue, Angular)**، محتوا بدون رفرش تغییر می‌کنه و اسکرین‌ریدر **هیچ‌چیز نمی‌فهمه**! کاربر باید کل صفحه رو دستی بگرده تا بفهمه چی عوض شده.

**⚠️ دام رایج**  
- Toast notification که ظاهر میشه ولی اسکرین‌ریدر نمی‌خونتش.
- اضافه شدن آیتم به سبد خرید بدون هیچ اعلانی.
- نمایش پیام خطای فرم بدون اتصال به اینپوت.
- تغییر روت در Next.js بدون تغییر `document.title`.
- Loading spinner که فقط بصریه و اسکرین‌ریدر نمی‌فهمه چیزی در حال بارگذاریه.

**📏 استاندارد WCAG**  
- **SC 4.1.3 (Level AA)**: پیام‌های وضعیت (Status Messages) باید با استفاده از role یا ویژگی‌های ARIA به کاربر اطلاع داده بشن، بدون اینکه فوکوس رو بگیرن.

**🛠️ راه‌حل سریع در کد**

### ۱. استفاده از `aria-live` برای مناطق پویا
```jsx
// ❌ اشتباه: پیام موفقیت بدون اعلام به اسکرین‌ریدر
function Toast({ message }) {
  return <div className="toast">{message}</div>;
}

// ✅ درست: با aria-live="polite" (بعد از پایان کار فعلی اسکرین‌ریدر می‌خونه)
function Toast({ message }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}

// ✅ درست: با aria-live="assertive" (فوراً اعلام میشه - برای خطاها)
function ErrorBanner({ message }) {
  return (
    <div className="error-banner" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}
```

### ۲. تفاوت `polite` و `assertive`
```jsx
// polite: صبر می‌کنه تا اسکرین‌ریدر کار فعلیش تموم بشه
// مناسب برای: پیام‌های موفقیت، اعلان‌های غیرضروری
<div aria-live="polite">۳ آیتم به سبد خرید اضافه شد</div>

// assertive: فوراً حرف اسکرین‌ریدر رو قطع می‌کنه
// مناسب برای: خطاها، هشدارهای امنیتی، تایمرهای مهم
<div aria-live="assertive">زمان جلسه شما به پایان رسید</div>
```

### ۳. Loading states دسترس‌پذیر
```jsx
// ❌ اشتباه: فقط spinner بصری
function Loading() {
  return <div className="spinner" />;
}

// ✅ درست: با aria-live و aria-busy
function Loading() {
  return (
    <div aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true" />
      <span className="sr-only">در حال بارگذاری...</span>
    </div>
  );
}

// ✅ بعد از لود شدن:
function Content({ data }) {
  return (
    <div aria-live="polite" aria-busy="false">
      {data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

### ۴. تغییر روت و document.title
```jsx
// ❌ اشتباه: تغییر روت بدون تغییر title
<Link href="/products">محصولات</Link>

// ✅ درست: در Next.js با useEffect یا next/head
import Head from 'next/head';

function ProductsPage() {
  return (
    <>
      <Head>
        <title>محصولات - نام سایت</title>
      </Head>
      <main>...</main>
    </>
  );
}

// ✅ یا با useEffect برای تغییر title
useEffect(() => {
  document.title = 'محصولات - نام سایت';
}, []);
```

### ۵. فرم‌ها و پیام‌های خطا
```jsx
// ❌ اشتباه: پیام خطا بدون اتصال به اینپوت
<input type="email" />
<p className="error">ایمیل نامعتبر است</p>

// ✅ درست: با aria-describedby و aria-invalid
function EmailInput({ error }) {
  const errorId = 'email-error';
  
  return (
    <>
      <label htmlFor="email">ایمیل</label>
      <input 
        id="email"
        type="email"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="error">
          {error}
        </p>
      )}
    </>
  );
}
```

### ۶. شمارنده‌ها و آمار پویا
```jsx
// ✅ استفاده از aria-live برای شمارنده‌ها
function CartCount({ count }) {
  return (
    <button className="cart-btn">
      سبد خرید
      <span aria-live="polite" className="badge">
        {count}
      </span>
    </button>
  );
}
```

**🔗 ابزار تست**  
- **اسکرین‌ریدر**: VoiceOver (مک) یا NVDA (ویندوز) رو روشن کن و ببین وقتی محتوا تغییر می‌کنه، اعلام میشه یا نه.
- **Chrome DevTools** → Accessibility → بررسی "Live Region" در Properties.
- افزونه **Accessibility Insights** → بخش "Live regions".

> **قانون ۳ ثانیه‌ای:** اسکرین‌ریدر رو روشن کن، یه دکمه بزن که محتوا رو تغییر میده (مثل اضافه به سبد). اگر اسکرین‌ریدر هیچ چیزی نگفت، یعنی `aria-live` یا `role` مناسب نداری!