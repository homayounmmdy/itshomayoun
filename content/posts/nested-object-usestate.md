---
title: "بچه‌داری اشتباه می‌زنی #۵: آپدیت object های تو در تو با useState"
date: '2026-08-22'
tags: ['React', 'useState', 'nested-objects', 'immutable', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا آپدیت object های تو در تو با useState مشکل‌سازه و سینیورها چطور حلش می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۵: آپدیت object های تو در تو با useState

توی این پست بررسی می‌کنیم چرا آپدیت object های تو در تو با useState کد رو پیچیده می‌کنه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: آپدیت ناقص object های nested

### ❌ روش جونیور/مید:

```jsx
function UserSettings() {
  const [settings, setSettings] = useState({
    user: { name: 'علی', email: 'ali@example.com' },
    preferences: { theme: 'dark', language: 'fa' }
  });
  
  const changeTheme = (theme) => {
    setSettings({
      ...settings,
      preferences: { theme } // ⚠️ language از بین میره!
    });
  };
  
  return (
    <div>
      <button onClick={() => changeTheme('light')}>تم روشن</button>
      <p>زبان: {settings.preferences.language}</p> {/* undefined میشه! */}
    </div>
  );
}
```

**مشکل:** با spread operator فقط یه level رو کپی می‌کنی. property های دیگه `preferences` از بین میرن.

### ✅ روش سینیور:

```jsx
function UserSettings() {
  const [settings, setSettings] = useState({
    user: { name: 'علی', email: 'ali@example.com' },
    preferences: { theme: 'dark', language: 'fa' }
  });
  
  const changeTheme = (theme) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences, // ✅ spread تمام levels
        theme
      }
    });
  };
  
  return (
    <div>
      <button onClick={() => changeTheme('light')}>تم روشن</button>
      <p>زبان: {settings.preferences.language}</p> {/* درست کار می‌کنه */}
    </div>
  );
}
```

## چرا این روش بهتره؟

- **Data loss نداره:** تمام property ها حفظ میشن
- **Immutable:** reference جدید ایجاد میشه
- **Predictable:** behavior قابل پیش‌بینی هست

## قانون طلایی

> **برای آپدیت object های تو در تو، باید تمام levels رو spread کنی!**

## نکته مهم

اگه object های عمیق داری، از **Immer** استفاده کن:

```jsx
import { produce } from 'immer';

const changeTheme = (theme) => {
  setSettings(produce(settings, draft => {
    draft.preferences.theme = theme;
  }));
};
```

یا اگه state پیچیده‌تره، از **useReducer** استفاده کن که مدیریتش آسون‌تره.
