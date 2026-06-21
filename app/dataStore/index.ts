import { UserDS } from "./modules/UserDS";
import { CustomersDS } from "./modules/customersDS/index";

export const initializeStores = () => {
  UserDS.getInstance();
  CustomersDS.getInstance();
};

initializeStores();

export const useUserDS = () => UserDS.getInstance();
export const useCustomersDS = () => CustomersDS.getInstance();