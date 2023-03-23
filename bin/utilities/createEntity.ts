import type { Entity } from "../models";
import path from "path";
import data from "../../package.json" assert { type: "json" };
import { cloneDir } from "./cloneDir.js";

export async function createEntity(entity: Entity) {
  // locate the entity .template path
  const templatePath = path.join(process.cwd(), "node_modules", data.name, "bin", ".templates", entity.type.toLowerCase());
  // locate the entity path
  const entityPath = path.join(process.cwd(), "content", entity.slug);

  cloneDir(templatePath, entityPath)
}