<template>
    <div class="container">
        <Header />
        <router-view class="routes" v-slot="{ Component, route }">
            <!-- Use a custom transition or fallback to `fade` -->
            <transition :name="route.meta.transition || 'fade'">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script>
    import { defineAsyncComponent } from 'vue';
    export default {
        components: {
            Header: defineAsyncComponent(
                () => import('@/components/HeaderComponent.vue'),
            ),
        },
    };
</script>
