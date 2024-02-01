import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            name: 'dash',
            component: defineAsyncComponent(
                () => import('@/modules/DashBoard.vue'),
            ),
            meta: { transition: 'slide-left' },
        },
        {
            path: '/register-employee',
            name: 'register-employee',
            component: defineAsyncComponent(
                () => import('@/modules/RegisterEmployee.vue'),
            ),
            meta: { transition: 'slide-left' },
        },
        {
            path: '/register-beneficiaries',
            name: 'register-beneficiaries',
            component: defineAsyncComponent(
                () => import('@/modules/RegisterBeneficiaries.vue'),
            ),
            meta: { transition: 'slide-left' },
        },
    ],
});

export default router;
