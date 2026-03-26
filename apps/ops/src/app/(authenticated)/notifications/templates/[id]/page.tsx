import { notFound } from "next/navigation";
import { getTemplate } from "@repo/features-notifications/actions";
import { MessageBodyPreview } from "@repo/features-notifications/client";
import { formatDateTime } from "@repo/shared/client";
import { Badge } from "@repo/ui/primitives/badge";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { TemplateDetailActions } from "./_components/template-detail-actions";

interface TemplateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TemplateDetailPage({
  params,
}: TemplateDetailPageProps) {
  const { id } = await params;
  const result = await getTemplate(id).catch(() => null);

  if (!result?.success || !result.data) {
    notFound();
  }

  const template = result.data;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-end">
        <TemplateDetailActions template={template} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{template.name}</h1>
                <p className="font-mono text-sm text-muted-foreground">
                  {template.id}
                </p>
              </div>
              <Badge variant={template.isActive ? "default" : "secondary"}>
                {template.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <dl className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Channel
                </dt>
                <dd>{template.channel}</dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Content Type
                </dt>
                <dd>{template.contentType}</dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Version
                </dt>
                <dd>{template.version}</dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Created At
                </dt>
                <dd>{formatDateTime(template.createdAt)}</dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Created By
                </dt>
                <dd className="font-mono text-xs">{template.createdBy}</dd>
              </div>

              <div>
                <dt className="mb-1 font-medium text-muted-foreground">
                  Updated By
                </dt>
                <dd className="font-mono text-xs">{template.updatedBy}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold">Template Body</h2>
          </CardHeader>
          <CardContent>
            <MessageBodyPreview
              sanitizedHtml={template.bodyTemplate}
              contentType={template.contentType}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
