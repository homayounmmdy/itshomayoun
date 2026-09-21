---
title: "چک‌لیست سریع a11y: تصاویر و رسانه (Images & Media)"
date: '2026-09-23'
tags: ['a11y', 'Accessibility', 'Images', 'Media', 'WCAG', 'alt-text', 'Captions']
description: "چرا عکس‌های بدون alt و ویدیوهای بدون زیرنویس، بخشی از کاربران رو کاملاً از محتوای سایتت محروم می‌کنه و چطور این مشکل رو حل کنیم."
enableComment: true
---

# 🖼️ چک‌لیست سریع: تصاویر و رسانه (Images & Media)

**💡 مفهوم کلیدی**  
کاربران نابینا یا کم‌بینا به **متن جایگزین** برای درک تصاویر و به **زیرنویس/رونوشت** برای درک ویدیو و صدا نیاز دارن. رسانه بدون این جایگزین‌ها، برای این کاربران اصلاً وجود نداره.

**⚠️ دام رایج**  
- `alt="تصویر"` یا `alt="image123.jpg"` یا کلاً حذف `alt`.
- ویدیوهای آموزشی بدون زیرنویس.
- اینفوگرافیک‌ها بدون توضیح متنی جایگزین.
- پادکست‌ها بدون transcript.
- autoplay ویدیو با صدا.

**📏 استاندارد WCAG**  
- **SC 1.1.1 (Level A)**: تمام تصاویر غیرتزئینی باید `alt` معنادار داشته باشن.
- **SC 1.2.2 (Level A)**: ویدیوهای pre-recorded باید زیرنویس (Captions) داشته باشن.
- **SC 1.2.1 (Level A)**: محتوای صوتی pre-recorded باید transcript داشته باشه.
- **SC 1.4.2 (Level A)**: هیچ صدایی نباید به صورت خودکار بیش از ۳ ثانیه پخش بشه، مگر اینکه مکانیزم توقف/کاهش صدا وجود داشته باشه.

**🛠️ راه‌حل سریع در کد**

### ۱. تصاویر: alt درست
```jsx
// ❌ اشتباه: alt خالی برای تصویر اطلاعاتی
<img src="product.jpg" />
<img src="product.jpg" alt="تصویر" />

// ✅ درست: alt معنادار که محتوای تصویر رو توصیف می‌کنه
<img src="product.jpg" alt="کفش ورزشی نایکی مدل Air Max، رنگ مشکی با زیره سفید" />

// ✅ درست: alt خالی برای تصویر کاملاً تزئینی (اسکرین‌ریدر ازش رد میشه)
<img src="divider-wave.svg" alt="" role="presentation" />
```

### ۲. تصاویر پیچیده (نمودار، اینفوگرافیک)
```jsx
// ✅ استفاده از figure و figcaption برای توضیح طولانی
<figure>
  <img src="sales-chart.png" alt="نمودار فروش سه‌ماهه اول ۱۴۰۵" />
  <figcaption>
    فروش در فروردین ۱۲۰ میلیون، اردیبهشت ۱۵۰ میلیون و خرداد ۱۸۰ میلیون تومان بوده.
  </figcaption>
</figure>
```

### ۳. ویدیو با زیرنویس
```html
<!-- ❌ اشتباه: ویدیو بدون زیرنویس -->
<video src="tutorial.mp4" controls></video>

<!-- ✅ درست: با زیرنویس فارسی و انگلیسی -->
<video src="tutorial.mp4" controls>
  <track kind="captions" src="captions-fa.vtt" srclang="fa" label="فارسی" default />
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" />
</video>
```

### ۴. پادکست/صدا با transcript
```jsx
// ✅ ارائه‌ی transcript قابل دسترس کنار پلیر
<audio src="episode-12.mp3" controls />
<details>
  <summary>مشاهده‌ی متن کامل (Transcript)</summary>
  <p>متن کامل پادکست اینجا قرار می‌گیره...</p>
</details>
```

### ۵. SVG و آیکون‌ها
```jsx
// ❌ اشتباه: SVG تزئینی که اسکرین‌ریدر می‌خونه
<svg><path d="..." /></svg>

// ✅ درست: SVG تزئینی رو مخفی کن
<svg aria-hidden="true" focusable="false"><path d="..." /></svg>

// ✅ درست: SVG اطلاعاتی با عنوان
<svg role="img" aria-labelledby="icon-title">
  <title id="icon-title">جستجو</title>
  <path d="..." />
</svg>
```

**🔗 ابزار تست**  
- افزونه مرورگر **WAVE** یا **axe DevTools** → بخش "Images without alt text".
- **Lighthouse** → Accessibility → "Image elements have `alt` attributes".
- تست دستی: با اسکرین‌ریدر (VoiceOver/NVDA) روی تک‌تک تصاویر برو و ببین چی می‌خونه.

> **قانون ۳ ثانیه‌ای:** توی DevTools، همه‌ی تصاویر رو با `img:not([alt])` سرچ کن. هر نتیجه‌ای که اومد، یعنی یه تصویر بدون alt داری. بعد CSS بزن `img { outline: 3px solid red; }` تا همه‌ی تصاویر رو ببینی و از خودت بپرس: «اگه این عکس لود نشه، کاربر چی از دست می‌ده؟» جواب همون `alt` هست.