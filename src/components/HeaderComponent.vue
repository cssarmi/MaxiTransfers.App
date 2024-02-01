<template>
    <header>
        <RouterLink :to="{ name: 'dash' }">Home</RouterLink>
        <RouterLink :to="{ name: 'register-employee' }">Crear Empleado</RouterLink>
        <RouterLink :to="{ name: 'register-beneficiaries' }">Crear Beneficiarios</RouterLink>
    </header>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    header {
        display: grid;
        grid-auto-flow: column;
        justify-content: left;
        // gap: 24px;
        padding: 0 24px;
        background-color: cadetblue;
        a {
            padding: 10px 12px;
            color: white;
            text-decoration: none;
            &:hover {
                color: lightgray;
                background-color:darkcyan;
            }
        }
    }
</style>