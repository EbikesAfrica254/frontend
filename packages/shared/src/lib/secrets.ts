import { readFileSync } from "fs";

export function loadDockerSecrets(secrets: Record<string, string>): void {
  if (process.env.NODE_ENV !== "production") return;

  for (const [envVar, secretPath] of Object.entries(secrets)) {
    try {
      const value = readFileSync(secretPath, "utf-8").trim();
      if (!value) throw new Error(`Secret file is empty: ${secretPath}`);
      process.env[envVar] = value;
    } catch (err) {
      throw new Error(
          `Failed to load secret for ${envVar} from ${secretPath}: ${String(err)}`,
      );
    }
  }
}