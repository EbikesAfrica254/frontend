import { NotificationCategory, NotificationChannel } from "../types/enums";

interface CategoryMeta {
  description: string;
  label: string;
  mandatory: boolean;
  value: NotificationCategory;
}

interface ChannelMeta {
  label: string;
  value: NotificationChannel;
}

const CATEGORY_META: Record<
  NotificationCategory,
  Omit<CategoryMeta, "value">
> = {
  [NotificationCategory.MARKETING]: {
    description: "Promotions and offers",
    label: "Marketing",
    mandatory: false,
  },
  [NotificationCategory.OPERATIONAL]: {
    description: "System and account updates",
    label: "Operational",
    mandatory: false,
  },
  [NotificationCategory.SECURITY]: {
    description: "Security alerts",
    label: "Security",
    mandatory: true,
  },
  [NotificationCategory.TRANSACTIONAL]: {
    description: "Transaction confirmations",
    label: "Transactional",
    mandatory: true,
  },
};

const CHANNEL_META: Record<NotificationChannel, Omit<ChannelMeta, "value">> = {
  [NotificationChannel.EMAIL]: { label: "Email" },
  [NotificationChannel.SMS]: { label: "SMS" },
  [NotificationChannel.SSE]: { label: "In-App" },
  [NotificationChannel.WHATSAPP]: { label: "WhatsApp" },
};

export function getCategories(): CategoryMeta[] {
  return Object.values(NotificationCategory).map((value) => ({
    value,
    ...CATEGORY_META[value],
  }));
}

export function getCategoryMeta(category: NotificationCategory): CategoryMeta {
  return { value: category, ...CATEGORY_META[category] };
}

export function getChannelMeta(channel: NotificationChannel): ChannelMeta {
  return { value: channel, ...CHANNEL_META[channel] };
}

export function getChannels(): ChannelMeta[] {
  return Object.values(NotificationChannel).map((value) => ({
    value,
    ...CHANNEL_META[value],
  }));
}
