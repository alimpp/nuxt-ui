import type { Department } from "../../../../types/departments";

export class DepartmentModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly slug: string;
  readonly isActive: boolean;

  constructor(raw: Department) {
    this.id = raw.id;
    this.name = raw.name;
    this.description = raw.description;
    this.slug = raw.slug;
    this.isActive = raw.isActive === 1;
  }

  get label(): string {
    return this.description;
  }

  get value(): number {
    return this.id;
  }
}