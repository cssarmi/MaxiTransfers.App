import generalApi from '@/api/generalApi';
export const createEmployee = async ({ commit }, formData) => {
    const { data } = await generalApi.post(
        `EmpleadosBeneficiarios/PostEmpleados`,
        formData,
    );
    return data.data;
};
export const createBeneficiaries = async ({ commit }, formData) => {
    const { data } = await generalApi.post(
        `EmpleadosBeneficiarios/PostBeneficiarios`,
        formData,
    );
    return data.data;
};
export const getBeneficiaries = async ({ commit }) => {
    const data = await generalApi.get(
        `EmpleadosBeneficiarios/listarBeneficiarios`,
    );
    commit('setBeneficiaries', data.data);
    return data;
};
export const getEmployes = async ({ commit }) => {
    const data = await generalApi.get(`EmpleadosBeneficiarios/listarEmpleados`);
    commit('setEmployees', data.data);
    return data;
};
export const deleteEmployes = async ({ commit }, id) => {
    const data = await generalApi.delete(
        `EmpleadosBeneficiarios/DeleteEmpleados?empleado=${id}`,
    );
    return data;
};
export const deleteBeneficiaries = async ({ commit }, id) => {
    const data = await generalApi.delete(
        `EmpleadosBeneficiarios/DeleteBeneficiarios?beneficiario=${id}`,
    );
    return data;
};
export const getBeneficiariesById = async ({ commit }, id) => {
    const data = await generalApi.get(
        `EmpleadosBeneficiarios/GetBeneficiarios?idbeneficiario=${id}`,
    );
    commit('setBeneficiaries', data.data);
    return data.data;
};
export const getEmployesById = async ({ commit }, id) => {
    const data = await generalApi.get(`EmpleadosBeneficiarios/GetEmpleados?idempleado=${id}`);
    commit('setEmployees', data.data);
    return data.data;
}