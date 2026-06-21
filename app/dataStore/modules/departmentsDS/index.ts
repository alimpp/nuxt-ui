import { BaseStore } from "../../../core/BaseStore";
import { StoreManager } from "../../../core/StoreManager";
import type { Department } from "../../../types/departments";
import { DepartmentModel } from "./models/Department.model";

interface IDepartmentsState {
  departments: DepartmentModel[];
}

export class DepartmentsDS extends BaseStore<IDepartmentsState> {
  private static _instance: DepartmentsDS;

  public static getInstance(): DepartmentsDS {
    if (!DepartmentsDS._instance) {
      DepartmentsDS._instance = new DepartmentsDS();
    }
    return DepartmentsDS._instance;
  }

  private constructor() {
    super("departments", {
      departments: [],
    });
    StoreManager.register(this);
  }

  get getDepartments(): DepartmentModel[] {
    return this._state.departments;
  }

  get getDepartmentsOptions(): { label: string; value: number }[] {
    return this._state.departments.map((d) => ({
      label: d.description,
      value: d.id,
    }));
  }

  setDepartments(list: Department[]): void {
    this._state.departments = list.map((d) => new DepartmentModel(d));
  }

  reset(): void {
    this._state.departments = [];
  }
}