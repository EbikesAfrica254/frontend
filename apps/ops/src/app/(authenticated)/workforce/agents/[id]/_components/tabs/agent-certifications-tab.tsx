import { getCertificationsResource } from "@repo/features-workforce/server";
import { CertificationTypeBadge } from "@repo/features-workforce/client";
import { formatDateTime } from "@repo/shared/client";
import { Card, CardContent } from "@repo/ui/primitives/card";

interface AgentCertificationsTabProps {
  agentId: string;
}

export async function AgentCertificationsTab({
  agentId,
}: AgentCertificationsTabProps) {
  const response = await getCertificationsResource(agentId).catch(() => null);
  const certifications = response?.data ?? [];

  if (certifications.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No certifications recorded for this agent.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {certifications.map((cert) => (
        <Card key={cert.id}>
          <CardContent className="pt-4">
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">Type</dt>
                <dd>
                  <CertificationTypeBadge type={cert.certificationType} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">Issued By</dt>
                <dd>{cert.issuedBy}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">Issued At</dt>
                <dd>{formatDateTime(cert.issuedAt)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium text-muted-foreground">
                  Expires At
                </dt>
                <dd>{cert.expiresAt ? formatDateTime(cert.expiresAt) : "—"}</dd>
              </div>
              {cert.referenceNumber && (
                <div className="flex items-center justify-between">
                  <dt className="font-medium text-muted-foreground">
                    Reference
                  </dt>
                  <dd className="font-mono text-xs">{cert.referenceNumber}</dd>
                </div>
              )}
              {cert.notes && (
                <div>
                  <dt className="font-medium text-muted-foreground mb-1">
                    Notes
                  </dt>
                  <dd className="text-muted-foreground">{cert.notes}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
