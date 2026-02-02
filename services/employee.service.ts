import api from "./api.service";

export const createEmployee =(payload:any) => {
    return api.post('/createEmployee',payload);

}

export const fetchEmployees = () => {
  return api.get("/employees");
};

export const deleteEmployeeById = (id: number) => {
  return api.delete(`/employees/${id}`);
};