import { UserDS } from "./modules/UserDS";
import { TicketsDS } from "./modules/ticketsDS/index";
import { DepartmentsDS } from "./modules/departmentsDS/index";
import { EmployeesDS } from './modules/employeesDS/index'
import { RolesDS } from "./modules/rolesDS/index";
import { CustomersDS } from "./modules/customersDS/index";

export const initializeStores = () => {
  UserDS.getInstance();
  TicketsDS.getInstance();
  DepartmentsDS.getInstance();
  EmployeesDS.getInstance();
  RolesDS.getInstance();
  CustomersDS.getInstance();
};

initializeStores();

export const useUserDS = () => UserDS.getInstance();
export const useTicketsDS = () => TicketsDS.getInstance();
export const useDepartmentsDS = () => DepartmentsDS.getInstance();
export const useEmployeesDS = () => EmployeesDS.getInstance();
export const useRolesDS = () => RolesDS.getInstance();
export const useCustomersDS = () => CustomersDS.getInstance();