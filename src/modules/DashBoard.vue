<template>
    <div class="container-grids">
        <div class="general-container">
            <div class="tabs">
                <div :class="['tab', showInfo === 1 ? 'active': '']" @click="showInfo = 1">Empleados</div>
                <div :class="['tab', showInfo === 2 ? 'active': '']" @click="showInfo = 2">Beneficiarios</div>
            </div>
            <div class="container-tables">
                <GridComponent
                    :data="localEmployees"
                    :type="showInfo"
                    v-if="showInfo === 1 && localEmployees.length > 0" />
                <GridComponent
                    :data="localBeneficiaries"
                    :type="showInfo"
                    v-else-if="showInfo === 2 && localBeneficiaries.length > 0" />
            </div>
        </div>
    </div>
</template>
<script>
    import { defineAsyncComponent } from 'vue';
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                localEmployees: [],
                localBeneficiaries: [],
                showInfo: 1,
            };
        },
        computed: {
            ...mapState('general', ['employees', 'beneficiaries']),
        },
        components: {
            GridComponent: defineAsyncComponent(
                () => import('@/components/GridComponent.vue'),
            ),
        },
        async created() {
            if (this.showInfo === 1) {
                await this.getEmployes();
            } else {
                await this.getBeneficiaries();
            }
        },
        watch: {
            employees() {
                this.localEmployees = this.employees;
            },
            beneficiaries() {
                this.localBeneficiaries = this.beneficiaries;
            },
            async showInfo() {
                if (this.showInfo === 1) {
                    await this.getEmployes();
                } else {
                    await this.getBeneficiaries();
                }
            },
        },
        methods: {
            ...mapActions('general', ['getEmployes', 'getBeneficiaries']),
        },
    };
</script>
<style lang="scss" scoped>
    .container-grids {
        display: grid;
        .general-container {
            width: 90vw;
            height: 80vh;
            .tabs {
                display: grid;
                grid-auto-flow: column;
                justify-content: left;
                border-bottom: 1px solid darkolivegreen;
                .tab {
                    padding: 12px;
                    &.active {
                        background-color: rgb(77, 114, 77);
                        color: white;
                    }
                    &:hover {
                        background-color: rgb(24, 105, 24);
                        color: white;
                    }
                }
            }
            .container-tables {
                overflow-y: auto;
            }
        }
    }
</style>
