# Projects Moduli (IT Career Simulator)

Ushbu modul talabalar virtual kompaniyada loyihalarda ishtirok etishi, tajriba to‘plashi va darajasini oshirishi (Intern → Junior → Middle → Senior) uchun mo‘ljallangan.

---

## 1. Qanday ishlatish (Integration Guide)

Boshqa jamoa a’zolari (Main Layout, Router) loyihalar modulini quyidagicha o‘zlarining marshrutlar tizimiga ulashlari mumkin:

```jsx
import { projectRoutes } from './modules/projects';

// React Router v6 Routes ichida:
<Routes>
  {projectRoutes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))}
</Routes>
```

### Eksport qilinadigan marshrutlar:
- `/projects` — Loyihalar katalogi (qidiruv, filtrlar, progress, qulflangan kartochkalar)
- `/projects/:id` — Loyiha batafsil sahifasi (Overview, Technologies, Tasks, Team)

---

## 2. Haqiqiy API bilan ulash (How to connect Real API)

Hozirgi paytda `src/modules/projects/api/projects.api.ts` faylida REST API imzolariga mos 500ms sun'iy kechikishli mock qatlam ishlamoqda. Haqiqiy backend tayyor bo'lgach:

1. `projects.api.ts` faylini oching.
2. Axios instansiyasini import qiling:
```typescript
import axios from 'axios';

export async function getProjects(params) {
  const response = await axios.get('/api/projects', { params });
  return response.data;
}

export async function getProjectById(id) {
  const response = await axios.get(`/api/projects/${id}`);
  return response.data;
}

export async function startProject(id) {
  const response = await axios.post(`/api/projects/${id}/start`);
  return response.data;
}
```

---

## 3. Auth va foydalanuvchi darajasi (useCurrentUser)

- Foydalanuvchi darajasi `src/modules/projects/hooks/useCurrentUser.js` orqali olinadi.
- Auth moduli tayyor bo‘lgach, ushbu hookni global AuthContext yoki token orqali almashtirish kifoya.

---

## 4. Qilingan taxminlar (Assumptions)
1. **Layout**: Modul sahifalari mustaqil kontent sifatida chiqadi, tashqi sidebar/navbar asosiy layout quruvchi talaba tomonidan beriladi.
2. **Task Board havolalari**: Har bir topshiriq `/tasks/:taskId` yo‘nalishiga havola qilingan (boshqa talaba mas’ul).
3. **Valyuta / XP**: Har bir loyihada yutuq sifatida umumiy va vazifalar bo‘yicha XP beriladi.
