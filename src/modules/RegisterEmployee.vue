<template>
    <div>
        <FormComponent
            :title="formTitle"
            :schema="schemaForm"
            :route="$route.name" />
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
                        type: 'text',
                        label: 'Nombre',
                        name: 'name',
                        value: '',
                        required: true,
                        nameSendData: 'nombre',
                    },
                    {
                        type: 'text',
                        label: 'Apellido',
                        name: 'lastname',
                        value: '',
                        required: true,
                        nameSendData: 'apellidos',
                    },
                    {
                        type: 'date',
                        label: 'Fecha de nacimiento',
                        name: 'birthDate',
                        value: '',
                        required: true,
                        nameSendData: 'fechaNacimiento',
                    },
                    {
                        type: 'text',
                        label: 'Curp',
                        name: 'curp',
                        value: '',
                        required: true,
                        nameSendData: 'curp',
                    },
                    {
                        type: 'text',
                        label: 'Ssn',
                        name: 'ssn',
                        value: '',
                        required: true,
                        nameSendData: 'ssn',
                    },
                    {
                        type: 'number',
                        label: 'Telefono',
                        name: 'phone',
                        value: '',
                        required: true,
                        nameSendData: 'telefono',
                    },
                    {
                        type: 'text',
                        label: 'Nacionalidad',
                        name: 'nationality',
                        value: '',
                        required: true,
                        nameSendData: 'nacionalidad',
                    },
                ],
            };
        },
        computed: {
            ...mapState('general', ['idEmployees']),
        },
        components: {
            FormComponent: defineAsyncComponent(
                () => import('@/components/FormComponent.vue'),
            ),
        },
        async created() {
            if (this.idEmployees !== null) {
                this.formTitle = 'Actualizar empleados';
                let test = await this.getEmployesById(this.idEmployees);
                console.log('test', test);
                this.schemaForm.forEach((field) => {
                    const propertyName = field.nameSendData;
                    if (propertyName in test) {
                        field.value = test[propertyName];
                    }
                });
            } else {
                this.formTitle = 'Registro de empleados';
            }
        },
        methods: {
            ...mapActions('general', ['getEmployesById']),
        },
    };
</script>
<style lang="scss" scoped></style>
