<template>
    <div>
        <FormComponent :title="formTitle" :schema="schemaForm" :route="$route.name" :options="optionsSelect"/>
    </div>
</template>
<script>
    import { defineAsyncComponent } from 'vue';
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                formTitle: '',
                schemaForm: [
                    {
                        type: 'select',
                        label: 'Empleado',
                        name: 'employeeNumber',
                        value: '',
                        required: true,
                        nameSendData: 'numEmpleado'
                    },
                    {
                        type: 'text',
                        label: 'Nombre',
                        name: 'name',
                        value: '',
                        required: true,
                        nameSendData: 'nombre'
                    },
                    {
                        type: 'text',
                        label: 'Apellido',
                        name: 'lastname',
                        value: '',
                        required: true,
                        nameSendData: 'apellidos'
                    },
                    {
                        type: 'date',
                        label: 'Fecha de nacimiento',
                        name: 'birthDate',
                        value: '',
                        required: true,
                        nameSendData: 'fechaNacimiento'
                    },
                    {
                        type: 'text',
                        label: 'Curp',
                        name: 'curp',
                        value: '',
                        required: true,
                        nameSendData: 'curp'
                    },
                    {
                        type: 'text',
                        label: 'Ssn',
                        name: 'ssn',
                        value: '',
                        required: true,
                        nameSendData: 'ssn'
                    },
                    {
                        type: 'number',
                        label: 'Telefono',
                        name: 'phone',
                        value: '',
                        required: true,
                        nameSendData: 'telefono'
                    },
                    {
                        type: 'text',
                        label: 'Nacionalidad',
                        name: 'nationality',
                        value: '',
                        required: true,
                        nameSendData: 'nacionalidad'
                    },
                    {
                        type: 'number',
                        label: 'Porcentaje de participacion',
                        name: 'participationPercentage',
                        value: '',
                        required: true,
                        nameSendData: 'porcentajeParticipacion'
                    },
                ],
                optionsSelect: []
            };
        },
        computed: {
            ...mapState('general', ['idBeneficiaries', 'employees']),
        },
        components: {
            FormComponent: defineAsyncComponent(
                () => import('@/components/FormComponent.vue'),
            ),
        },
        async created() {
            await this.getEmployes()
            this.employees.forEach(employe => {
                this.optionsSelect.push({label: employe.nombre, value: employe.numEmpleado})
            })
            if (this.idBeneficiaries !== null) {
                this.formTitle= 'Actualizar beneficiario'
                let test = await this.getBeneficiariesById(this.idBeneficiaries);
                console.log('test', test);
                this.schemaForm.forEach((field) => {
                    const propertyName = field.nameSendData;
                    if (propertyName in test) {
                        field.value = test[propertyName];
                    }
                });
            }else {
                this.formTitle= 'Registro beneficiario'
            }
        },
        methods: {
            ...mapActions('general', ['getBeneficiariesById', 'getEmployes']),
        },
    };
</script>
<style lang="scss" scoped></style>
