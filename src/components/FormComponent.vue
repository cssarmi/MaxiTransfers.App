<template>
    <div class="container-form">
        <h3 class="title">{{ title }}</h3>
        <form @submit.prevent="validateAndSubmit">
            <div class="field" v-for="(item, index) in schema" :key="index">
                <label :for="item.name">{{ item.label }}:</label>
                <input
                    v-if="item.type !== 'select'"
                    :type="item.type"
                    v-model="item.value"
                    :placeholder="item.label"
                    @input="clearError(item.name)" />
                <select
                    v-else
                    v-model="item.value"
                    :placeholder="item.label"
                    @input="clearError(item.name)">
                    <option
                        v-for="(item, index) in options"
                        :value="item.value"
                        :key="index">
                        {{ item.label }}
                    </option>
                </select>
                <div class="error" v-if="errors[item.name]">
                    {{ errors[item.name] }}
                </div>
            </div>
            <div class="container-buttons">
                <button class="btn" type="submit">Guardar</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        props: ['schema', 'title', 'route', 'options'],
        data() {
            return {
                errors: {},
            };
        },
        methods: {
            ...mapActions('general', ['createEmployee', 'createBeneficiaries']),
            validateAndSubmit() {
                this.errors = {};
                this.schema.forEach((item) => {
                    if (!item.value) {
                        this.errors[item.name] =
                            `${item.label} no puede estar vacío.`;
                    } else if (
                        item.name === 'birthDate' &&
                        !this.isValidAge(item.value, 18)
                    ) {
                        this.errors[item.name] = 'Debes ser mayor de 18 años.';
                    }
                });

                if (Object.keys(this.errors).length === 0) {
                    this.saveForm(this.schema);
                }
            },
            clearError(fieldName) {
                this.errors[fieldName] = '';
            },
            async saveForm(schema) {
                let sendData = {};
                if (this.route === 'register-employee') {
                    schema.forEach((item) => {
                        if (item.nameSendData == 'nombre') {
                            sendData.nombre = item.value;
                        } else if (item.nameSendData == 'apellidos') {
                            sendData.apellidos = item.value;
                        } else if (item.nameSendData == 'fechaNacimiento') {
                            sendData.fechaNacimiento = item.value;
                        } else if (item.nameSendData == 'curp') {
                            sendData.curp = item.value;
                        } else if (item.nameSendData == 'ssn') {
                            sendData.ssn = item.value;
                        } else if (item.nameSendData == 'telefono') {
                            sendData.telefono = item.value;
                        } else if (item.nameSendData == 'nacionalidad') {
                            sendData.nacionalidad = item.value;
                        }
                    });

                    await this.createEmployee(sendData);
                } else if (this.route === 'register-beneficiaries') {
                    schema.forEach((item) => {
                        if (item.nameSendData == 'nombre') {
                            sendData.nombre = item.value;
                        } else if (item.nameSendData == 'apellidos') {
                            sendData.apellidos = item.value;
                        } else if (item.nameSendData == 'fechaNacimiento') {
                            sendData.fechaNacimiento = item.value;
                        } else if (item.nameSendData == 'curp') {
                            sendData.curp = item.value;
                        } else if (item.nameSendData == 'ssn') {
                            sendData.ssn = item.value;
                        } else if (item.nameSendData == 'telefono') {
                            sendData.telefono = item.value;
                        } else if (item.nameSendData == 'nacionalidad') {
                            sendData.nacionalidad = item.value;
                        } else if (
                            item.nameSendData == 'porcentajeParticipacion'
                        ) {
                            sendData.porcentajeParticipacion = item.value;
                        } else if (item.nameSendData == 'numEmpleado') {
                            sendData.numEmpleado = item.value;
                        }
                    });

                    await this.createBeneficiaries(sendData);
                }
                this.$router.push({ name: 'dash' });
            },
            isValidAge(dateString, minAge) {
                const birthDate = new Date(dateString);
                const currentDate = new Date();
                const age = currentDate.getFullYear() - birthDate.getFullYear();

                if (
                    currentDate.getMonth() < birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() &&
                        currentDate.getDate() < birthDate.getDate())
                ) {
                    return age - 1 >= minAge;
                }
                return age >= minAge;
            },
        },
    };
</script>
<style lang="scss" scoped>
    .container-form {
        display: grid;
        grid-auto-flow: row;
        width: 500px;
        background-color: white;
        padding: 0 30px 30px 30px;
        -webkit-box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
        -moz-box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
        box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
        .title {
            color: gray;
            text-align: center;
        }
        form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
            .field {
                display: grid;
                grid-auto-flow: row;
                input,
                select {
                    border: solid 1px rgb(141, 141, 141);
                    border-radius: 5px;
                    font-size: 20px;
                }
            }
        }
        .btn {
            cursor: pointer;
            margin-top: 12px;
            border-radius: 5px;
            font-size: 14px;
            padding: 10px;
            font-weight: 600;
            border: none;
            background-color: rgb(105, 231, 189);
            color: white;
            -webkit-box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
            -moz-box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
            box-shadow: 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
            &:hover {
                background-color: rgb(82, 185, 151);
                color: gray;
                -webkit-box-shadow: inset 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
                -moz-box-shadow: inset 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
                box-shadow: inset 10px 10px 5px -3px rgba(0, 0, 0, 0.26);
            }
        }
    }
</style>
