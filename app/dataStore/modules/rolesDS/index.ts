import { BaseStore } from "../../../core/BaseStore";
import { StoreManager } from "../../../core/StoreManager";
import type { TRole } from "../../../types/roles/index";
import { RoleModel } from "./models/Roles.model";

interface IRolesState {
  roles: RoleModel[];
}

export class RolesDS extends BaseStore<IRolesState> {
  private static _instance: RolesDS;

  public static getInstance(): RolesDS {
    if (!RolesDS._instance) {
      RolesDS._instance = new RolesDS();
    }
    return RolesDS._instance;
  }

  private constructor() {
    super("roles", {
      roles: [],
    });
    StoreManager.register(this);
  }

  get getRoles(): RoleModel[] {
    return this._state.roles;
  }

  get getRolesOptions(): { label: string; value: number }[] {
    return this._state.roles.map((d) => ({
      label: d.description,
      value: d.id,
    }));
  }

  setRoles(list: TRole[]): void {
    this._state.roles = list.map((r) => new RoleModel(r));
  }

  reset(): void {
    this._state.roles = [];
  }
}
