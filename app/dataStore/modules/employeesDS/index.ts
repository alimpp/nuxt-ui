import { BaseStore } from "../../../core/BaseStore";
import { StoreManager } from "../../../core/StoreManager";
import type { TEmployee } from "../../../types/employees/index";
import { EmployeeModel } from "./models/Employees.model";

interface TMeta {
  page: number;
  per_page: number;
  total: number;
}

interface IEmployeesState {
  employees: TEmployee[];
  meta: TMeta;
  loading: boolean;
  lastSearchField: string;
}

export class EmployeesDS extends BaseStore<IEmployeesState> {
  private static _instance: EmployeesDS;

  public static getInstance(): EmployeesDS {
    if (!EmployeesDS._instance) {
      EmployeesDS._instance = new EmployeesDS();
    }
    return EmployeesDS._instance;
  }

  private constructor() {
    super("employees", {
      employees: [],
      meta: {
        page: 1,
        per_page: 10,
        total: 0,
      },
      loading: false,
      lastSearchField: "",
    });
    StoreManager.register(this);
  }

  get getEmployees(): EmployeeModel[] {
    return this._state.employees;
  }

  get getMeta(): TMeta {
    return this._state.meta;
  }

  get getLoading(): boolean {
    return this._state.loading;
  }

  get getLastSearchField(): string {
    return this._state.lastSearchField;
  }

  setEmployees(list: TEmployee[]): void {
    this._state.employees = list.map((e) => new EmployeeModel(e));
  }

  setMeta(meta: TMeta): void {
    this._state.meta = meta;
  }

  resetMeta(): void {
    this._state.meta = {
      page: 1,
      per_page: 10,
      total: 0,
    };
  }

  setLastSearchField(val: string) {
    this._state.lastSearchField = val;
  }

  setLoading(loading: boolean): void {
    this._state.loading = loading;
  }

  reset(): void {
    this._state.employees = [];
  }
}
