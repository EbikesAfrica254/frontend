"use client";

import { useState } from "react";
import { Badge } from "@repo/ui/primitives/badge";
import { Button } from "@repo/ui/primitives/button";
import { Card, CardContent, CardHeader } from "@repo/ui/primitives/card";
import { AlertTriangle, Ban, DollarSign } from "lucide-react";
import {
  getOrderStatusBadge,
  OrderDetailResponse,
  OrderStatus,
} from "@repo/features-orders/client";
import { formatDateTime } from "@repo/shared/client";
import { AdjustCostDialog } from "./adjust-cost-dialog";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { RecordTipDialog } from "./record-tip-dialog";
import { ReportIncidentDialog } from "./report-incident-dialog";

interface OrderOverviewTabProps {
  order: OrderDetailResponse;
}

export function OrderOverviewTab({ order }: OrderOverviewTabProps) {
  const [adjustCostOpen, setAdjustCostOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [recordTipOpen, setRecordTipOpen] = useState(false);
  const [reportIncidentOpen, setReportIncidentOpen] = useState(false);

  const { label, variant } = getOrderStatusBadge(order.status);

  const canCancel =
    order.status !== OrderStatus.CANCELLED &&
    order.status !== OrderStatus.COMPLETED;
  const canAdjustCost =
    order.status === OrderStatus.READY_FOR_BROADCAST && !order.costAdjustment;
  const canRecordTip =
    (order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.COMPLETED) &&
    !order.tip;
  const canReportIncident =
    order.status === OrderStatus.IN_TRANSIT ||
    order.status === OrderStatus.DELIVERED ||
    order.status === OrderStatus.ESCALATED;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <Badge variant={variant}>{label}</Badge>
            </div>
            <div className="flex items-center gap-2">
              {canAdjustCost && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAdjustCostOpen(true)}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Adjust Cost
                </Button>
              )}
              {canRecordTip && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRecordTipOpen(true)}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Record Tip
                </Button>
              )}
              {canReportIncident && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReportIncidentOpen(true)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              )}
              {canCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setCancelOpen(true)}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Order Type
              </dt>
              <dd>{order.orderType.replace(/_/g, " ")}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Customer
              </dt>
              <dd>{order.customerId}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">Agent</dt>
              <dd>{order.agentId || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Payment Verified
              </dt>
              <dd>
                <Badge
                  variant={order.paymentVerified ? "default" : "secondary"}
                >
                  {order.paymentVerified ? "Verified" : "Not Verified"}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Pickup Address
              </dt>
              <dd>{order.pickupAddress}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Delivery Address
              </dt>
              <dd>{order.deliveryAddress}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Total Price
              </dt>
              <dd>
                {order.totalPrice
                  ? `${order.currency} ${order.totalPrice}`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">Weight</dt>
              <dd>{order.weight || "—"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Created At
              </dt>
              <dd>{formatDateTime(order.createdAt)}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground mb-1">
                Updated At
              </dt>
              <dd>{order.updatedAt ? formatDateTime(order.updatedAt) : "—"}</dd>
            </div>
            {order.cancellationReason && (
              <div className="col-span-2">
                <dt className="font-medium text-muted-foreground mb-1">
                  Cancellation Reason
                </dt>
                <dd>{order.cancellationReason}</dd>
              </div>
            )}
            {order.costAdjustment && (
              <>
                <div>
                  <dt className="font-medium text-muted-foreground mb-1">
                    Original Amount
                  </dt>
                  <dd>{`${order.currency} ${order.costAdjustment.originalAmount}`}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground mb-1">
                    Adjusted Amount
                  </dt>
                  <dd>{`${order.currency} ${order.costAdjustment.revisedAmount}`}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-medium text-muted-foreground mb-1">
                    Adjustment Reason
                  </dt>
                  <dd>{order.costAdjustment.reason}</dd>
                </div>
              </>
            )}
            {order.tip && (
              <>
                <div>
                  <dt className="font-medium text-muted-foreground mb-1">
                    Tip Amount
                  </dt>
                  <dd>{`${order.currency} ${order.tip.amount} (${order.tip.percentage}%)`}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground mb-1">
                    Tip Status
                  </dt>
                  <dd>{order.tip.paymentStatus}</dd>
                </div>
              </>
            )}
          </dl>
        </CardContent>
      </Card>

      <AdjustCostDialog
        open={adjustCostOpen}
        onOpenChange={setAdjustCostOpen}
        orderId={order.id}
      />
      <CancelOrderDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        orderId={order.id}
      />
      <RecordTipDialog
        open={recordTipOpen}
        onOpenChange={setRecordTipOpen}
        orderId={order.id}
      />
      <ReportIncidentDialog
        agentId={order.agentId ?? ""}
        open={reportIncidentOpen}
        onOpenChange={setReportIncidentOpen}
        orderId={order.id}
      />
    </>
  );
}
