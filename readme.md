# 📌 Express REST Setup Guide

## 🚀 1. Method Override (for PATCH / PUT / DELETE in HTML forms)

### ❗ Problem

HTML forms only support:

* GET
* POST

But in REST APIs, we also need:

* PATCH
* PUT
* DELETE

---

## ✅ Solution: `method-override`

### 📦 Install

```bash
npm i method-override
```

---

## ⚙️ Setup in Express

```js
const express = require('express')
const methodOverride = require('method-override')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// override using query string (?_method=PATCH/DELETE/PUT)
app.use(methodOverride('_method'))
```

---

## 🧪 Example Usage in HTML Form

### 🔴 DELETE request

```html
<form method="POST" action="/resource?_method=DELETE">
  <button type="submit">Delete resource</button>
</form>
```

### 🟡 PATCH request

```html
<form method="POST" action="/comments/123?_method=PATCH">
  <input name="comment" />
  <button type="submit">Update</button>
</form>
```

---

## 🧠 How it works internally

```text
Browser sends POST
        ↓
?_method=DELETE detected
        ↓
method-override converts it
        ↓
Express treats it as DELETE
```

---

# 🆔 2. Unique ID Generator (`uuid`)

## 📦 Install

```bash
npm i uuid
```

---

## ⚙️ Usage (CommonJS)

```js
const { v4: uuid } = require('uuid')
```

---

## 🧪 Example

```js
const comments = []

comments.push({
    id: uuid(),
    username: "Sourov",
    comment: "Hello world"
})
```

---

## 🧠 Why UUID is used

* Ensures **unique identifier**
* Prevents ID collision
* Works without database (in-memory apps)

Example:

```text
550e8400-e29b-41d4-a716-446655440000
```

---

# 📌 Combined REST Flow (your project)

```text
CREATE → POST /comments
READ   → GET /comments
UPDATE → PATCH /comments/:id?_method=PATCH
DELETE → DELETE /comments/:id?_method=DELETE
```

---

# 🚀 Final Professional Tip (FAANG mindset)

In real backend systems:

* `method-override` is used ONLY for server-rendered apps (EJS, PHP style forms)
* Modern React apps use real HTTP methods directly (no override needed)

