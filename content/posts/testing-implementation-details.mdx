---
title: "بچه‌داری اشتباه می‌زنی #۲۴: تست کردن implementation details"
date: '2026-08-22'
tags: ['React', 'testing', 'RTL', 'ReactTestingLibrary', 'اشتباهات_جونیور', 'سینیور_روش']
description: "چرا تست کردن implementation details باعث تست‌های شکننده میشه و سینیورها چطور از دید کاربر تست می‌کنن"
enableComment: true
---

# بچه‌داری اشتباه می‌زنی #۲۴: تست کردن implementation details

توی این پست بررسی می‌کنیم چرا تست کردن implementation details باعث تست‌های شکننده میشه و سینیورها چطور از دید کاربر تست می‌کنن.

## اشتباه رایج: تست کردن state و DOM داخلی

### ❌ روش جونیور/مید:

```jsx
// Counter.js
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span data-testid="count-display">{count}</span>
      <button data-testid="increment-btn" onClick={() => setCount(c => c + 1)}>
        افزایش
      </button>
    </div>
  );
}

// Counter.test.js
test('should increment count', () => {
  render(<Counter />);
  
  const countDisplay = screen.getByTestId('count-display'); // ❌ testID!
  const button = screen.getByTestId('increment-btn'); // ❌ testID!
  
  expect(countDisplay.textContent).toBe('0'); // ❌ تست کردن DOM داخلی
  
  fireEvent.click(button);
  
  expect(countDisplay.textContent).toBe('1'); // ❌ هنوز هم DOM داخلی
});
```

**مشکل:** 
- **شکننده:** اگه `data-testid` رو تغییر بدی، تست break میشه
- **Implementation detail:** داری state داخلی رو تست می‌کنی، نه behavior
- **از دید کاربر نیست:** کاربر `data-testid` رو نمی‌بینه
- **Refactor سخته:** هر تغییر کوچیک، تست رو می‌شکنه
- **Maintenance بالا:** باید تست‌ها رو هم آپدیت کنی

### ✅ روش سینیور:

```jsx
// Counter.js - بدون data-testid
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <span>شمارنده: {count}</span>
      <button onClick={() => setCount(c => c + 1)}>افزایش</button>
    </div>
  );
}

// Counter.test.js - از دید کاربر
test('should increment count when button is clicked', () => {
  render(<Counter />);
  
  // ✅ از دید کاربر: کاربر چی می‌بینه؟
  expect(screen.getByText('شمارنده: 0')).toBeInTheDocument();
  
  // ✅ از دید کاربر: کاربر چیکار می‌کنه؟
  fireEvent.click(screen.getByRole('button', { name: /افزایش/i }));
  
  // ✅ از دید کاربر: کاربر چی می‌بینه بعد از کلیک؟
  expect(screen.getByText('شمارنده: 1')).toBeInTheDocument();
});
```

## Query های درست در RTL

### ❌ اشتباه:

```jsx
// ❌ querySelector
const element = document.querySelector('.my-class');

// ❌ testID
const element = screen.getByTestId('my-element');

// ❌ DOM داخلی
expect(component.state.count).toBe(1);
```

### ✅ درست (به ترتیب اولویت):

```jsx
// ۱. getByRole - بهترین گزینه
screen.getByRole('button', { name: /submit/i });
screen.getByRole('heading', { name: /welcome/i });

// ۲. getByLabelText - برای form inputs
screen.getByLabelText(/email/i);

// ۳. getByPlaceholderText
screen.getByPlaceholderText('Enter your name');

// ۴. getByText
screen.getByText(/welcome/i);

// ۵. getByDisplayValue
screen.getByDisplayValue('John');

// ۶. getByAltText
screen.getByAltText('profile picture');

// ۷. getByTitle
screen.getByTitle('Close');

// ۸. getByTestId - فقط وقتی هیچکدوم بالا کار نمی‌کنه
screen.getByTestId('custom-element');
```

## مثال دیگه: Form submission

### ❌ اشتباه:

```jsx
test('should submit form', () => {
  render(<UserForm />);
  
  const nameInput = screen.getByTestId('name-input'); // ❌
  const emailInput = screen.getByTestId('email-input'); // ❌
  
  fireEvent.change(nameInput, { target: { value: 'Ali' } });
  fireEvent.change(emailInput, { target: { value: 'ali@example.com' } });
  
  const form = screen.getByTestId('user-form'); // ❌
  fireEvent.submit(form);
  
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'Ali',
    email: 'ali@example.com'
  });
});
```

### ✅ درست:

```jsx
test('should submit form with user data', () => {
  render(<UserForm />);
  
  // ✅ از دید کاربر
  fireEvent.change(screen.getByLabelText(/نام/i), { 
    target: { value: 'Ali' } 
  });
  fireEvent.change(screen.getByLabelText(/ایمیل/i), { 
    target: { value: 'ali@example.com' } 
  });
  
  fireEvent.click(screen.getByRole('button', { name: /ثبت/i }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'Ali',
    email: 'ali@example.com'
  });
});
```

## قانون طلایی

> **تست‌هات رو از دید کاربر بنویس! کاربر چی می‌بینه؟ کاربر چیکار می‌کنه؟ نه اینکه state داخلی یا DOM رو تست کنی!**

## نکته مهم

- **Testing Library** رو یاد بگیر، نه Enzyme
- از `getByRole` بیشتر استفاده کن
- `data-testid` فقط آخرین راه‌حل باشه
- تست‌هات باید **maintainable** باشن، نه **brittle**
- اگه تست break شد، فکر کن: "آیا واقعاً feature break شده یا فقط implementation تغییر کرده؟"
