import { z } from "zod";

export const cancelNotificationSchema = z.object({
  id: z.uuid(),
});

export type CancelNotificationFormData = z.infer<
  typeof cancelNotificationSchema
>;
