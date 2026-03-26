"use client";

import { useEffect, useState } from "react";
import { getRequiredDocuments } from "../actions/documents";
import type { DocumentType, RegistrationType } from "../types/enums";

export interface UseRequiredDocumentsReturn {
  documentTypes: DocumentType[];
  error: string | null;
  isLoading: boolean;
}

export function useRequiredDocuments(
  registrationType: RegistrationType | null,
): UseRequiredDocumentsReturn {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!registrationType) {
      setDocumentTypes([]);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetch() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getRequiredDocuments(registrationType!);

        if (!cancelled) {
          if (result.success) {
            setDocumentTypes(result.data);
          } else {
            setError(result.error ?? "Failed to load required documents");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load required documents",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetch();

    return () => {
      cancelled = true;
    };
  }, [registrationType]);

  return { documentTypes, error, isLoading };
}
