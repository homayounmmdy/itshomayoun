---
title: "بچه‌داری اشتباه می‌زنی #۱۸: مدیریت state برای هر input در Form"
date: '2026-08-22'
tags: ['React', 'forms', 'useState', 'controlled-components', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا useState جدا برای هر input فرم اشتباهه و سینیورها چطور فرم‌ها رو مدیریت می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۱۸: مدیریت state برای هر input در Form

توی این پست بررسی می‌کنیم چرا useState جدا برای هر input فرم کد رو شلوغ و سخت maintain می‌کنه و سینیورها چطور این مشکل رو حل می‌کنن.

## اشتباه رایج: useState برای هر input

### ❌ روش جونیور/مید:

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // ⚠️ validation پخش و پلا
    if (!name) return alert('نام الزامی است');
    if (!email) return alert('ایمیل الزامی است');
    if (!password) return alert('رمز عبور الزامی است');
    
    submitForm({ name, email, password, age, phone });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <input value={age} onChange={e => setAge(e.target.value)} />
      <input value={phone} onChange={e => setPhone(e.target.value)} />
      <button type="submit">ثبت</button>
    </form>
  );
}
```

**مشکل:** 
- ۵ تا useState جدا برای یه فرم ساده
- validation logic پخش و پلا شده
- اگه ۱۰ تا input داشته باشی، ۱۰ تا useState لازم داری
- reset کردن فرم سخته
- کد تکراری و سخت maintain

### ✅ روش سینیور:

```jsx
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    phone: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ validation متمرکز
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }
    
    submitForm(formData);
  };
  
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      age: '',
      phone: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" value={formData.password} onChange={handleChange} />
      <input name="age" value={formData.age} onChange={handleChange} />
      <input name="phone" value={formData.phone} onChange={handleChange} />
      <button type="submit">ثبت</button>
      <button type="button" onClick={handleReset}>پاک کردن</button>
    </form>
  );
}

function validateForm(data) {
  const errors = {};
  if (!data.name) errors.name = 'نام الزامی است';
  if (!data.email) errors.email = 'ایمیل الزامی است';
  if (!data.password) errors.password = 'رمز عبور الزامی است';
  return errors;
}
```

## راه‌حل حرفه‌ای‌تر: React Hook Form

```jsx
import { useForm } from 'react-hook-form';

function UserForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = (data) => {
    submitForm(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'نام الزامی است' })} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email', { required: 'ایمیل الزامی است' })} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">ثبت</button>
      <button type="button" onClick={() => reset()}>پاک کردن</button>
    </form>
  );
}
```

## چرا این روش بهتره؟

- **یک state برای کل فرم:** مدیریت آسون‌تر
- **handleChange یکسان:** کد تکراری حذف میشه
- **validation متمرکز:** logic یکجا
- **reset آسان:** فقط یه setState
- **scalable:** اضافه کردن input جدید راحته

## قانون طلایی

> **برای فرم‌ها با بیشتر از ۳ input، از یه object state استفاده کن یا از library مثل React Hook Form!**
