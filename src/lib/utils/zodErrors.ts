import { z } from "zod";

export function getFieldErrors(error: z.ZodError) {
  const tree = z.treeifyError(error);

  const fieldErrors: Record<string, string[]> = {};

  if (
    typeof tree === "object" &&
    tree !== null &&
    "properties" in tree &&
    typeof tree.properties === "object" &&
    tree.properties !== null
  ) {
    const properties = tree.properties as Record<string, { errors?: string[] }>;

    for (const key of Object.keys(properties)) {
      fieldErrors[key] = properties[key]?.errors ?? [];
    }
  }

  return fieldErrors;
}
