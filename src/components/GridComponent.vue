<template>
    <div class="grid-container">
        <table>
            <thead>
                <tr>
                    <th v-for="(value, key) in Object.keys(data[0])" :key="key">
                        {{ value }}
                    </th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index">
                    <td v-for="(value, key) in Object.keys(row)" :key="key">
                        {{ row[value] }}
                    </td>
                    <td>
                        <button
                            @click="
                                editRow(
                                    type === 1
                                        ? row.numEmpleado
                                        : row.numBeneficiario,
                                )
                            ">
                            Editar
                        </button>
                        <button
                            @click="
                                deleteRow(
                                    type === 1
                                        ? row.numEmpleado
                                        : row.numBeneficiario,
                                )
                            ">
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        props: {
            data: Array,
            type: Number,
        },
        created() {
            this.$store.commit('general/setIdEmployees', null)
            this.$store.commit('general/setIdBeneficiaries', null)
        },
        methods: {
            ...mapActions('general', [
                'deleteEmployes',
                'deleteBeneficiaries',
                'getEmployes',
                'getBeneficiaries',
            ]),
            async editRow(id) {
                if (this.type === 1) {
                    this.$store.commit('general/setIdEmployees', id)
                    this.$router.push({name: 'register-employee'})
                } else {
                    this.$store.commit('general/setIdBeneficiaries', id)
                    this.$router.push({name: 'register-beneficiaries'})
                }
            },
            async deleteRow(id) {
                if (this.type === 1) {
                    await this.deleteEmployes(id);
                    await this.getEmployes();
                } else {
                    await this.deleteBeneficiaries(id);
                    await this.getBeneficiaries();
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    .grid-container {
        margin: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }

    th,
    td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
    }

    button {
        cursor: pointer;
        margin-right: 10px;
    }
</style>
