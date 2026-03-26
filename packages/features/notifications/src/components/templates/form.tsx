"use client";

import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTemplateFormData,
  createTemplateSchema,
} from "../../schemas/template-schemas";
import {
  NotificationChannel,
  TemplateContentType,
  TemplateVariableType,
} from "../../types/enums";

interface TemplateFormProps {
  disabled?: boolean;
  formId?: string;
  onSubmit: (data: CreateTemplateFormData) => void | Promise<void>;
}

export function TemplateForm({
  disabled,
  formId,
  onSubmit,
}: TemplateFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<CreateTemplateFormData>({
    defaultValues: {
      bodyTemplate: "",
      channel: undefined,
      contentType: undefined,
      name: "",
      subject: "",
      variableDefinitions: [],
    },
    resolver: zodResolver(createTemplateSchema),
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "variableDefinitions",
  });

  const isDisabled = disabled || isSubmitting;
  const selectedChannel = watch("channel");
  const isEmail = selectedChannel === NotificationChannel.EMAIL;

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Template Details</h3>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            disabled={isDisabled}
            placeholder="ORDER_CONFIRMATION"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="channel" className="text-sm font-medium">
              Channel
            </label>
            <select
              id="channel"
              {...register("channel")}
              disabled={isDisabled}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.channel}
            >
              <option value="">Select a channel...</option>
              <option value={NotificationChannel.EMAIL}>Email</option>
              <option value={NotificationChannel.SMS}>SMS</option>
              <option value={NotificationChannel.SSE}>SSE</option>
              <option value={NotificationChannel.WHATSAPP}>WhatsApp</option>
            </select>
            {errors.channel && (
              <p className="text-sm text-red-600">{errors.channel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="contentType" className="text-sm font-medium">
              Content Type
            </label>
            <select
              id="contentType"
              {...register("contentType")}
              disabled={isDisabled}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.contentType}
            >
              <option value="">Select content type...</option>
              <option value={TemplateContentType.PLAIN_TEXT}>Plain Text</option>
              {isEmail && (
                <option value={TemplateContentType.HTML}>HTML</option>
              )}
            </select>
            {errors.contentType && (
              <p className="text-sm text-red-600">
                {errors.contentType.message}
              </p>
            )}
          </div>
        </div>

        {isEmail && (
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
              disabled={isDisabled}
              placeholder="Order [[${orderId}]] Confirmed"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.subject}
            />
            {errors.subject && (
              <p className="text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="bodyTemplate" className="text-sm font-medium">
            Body
          </label>
          <textarea
            id="bodyTemplate"
            {...register("bodyTemplate")}
            disabled={isDisabled}
            rows={8}
            placeholder="Hello [[${name}]], your order [[${orderId}]] has been confirmed."
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-invalid={!!errors.bodyTemplate}
          />
          {errors.bodyTemplate && (
            <p className="text-sm text-red-600">
              {errors.bodyTemplate.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Variable Definitions</h3>
          <button
            type="button"
            onClick={() =>
              append({
                description: "",
                name: "",
                required: false,
                sensitive: false,
                type: TemplateVariableType.STRING,
              })
            }
            disabled={isDisabled}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Add Variable
          </button>
        </div>

        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No variables defined. Add variables referenced in your template.
          </p>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-md border border-input p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Variable {index + 1}</span>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={isDisabled}
                className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor={`variableDefinitions.${index}.name`}
                  className="text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id={`variableDefinitions.${index}.name`}
                  type="text"
                  {...register(`variableDefinitions.${index}.name`)}
                  disabled={isDisabled}
                  placeholder="orderId"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-invalid={!!errors.variableDefinitions?.[index]?.name}
                />
                {errors.variableDefinitions?.[index]?.name && (
                  <p className="text-sm text-red-600">
                    {errors.variableDefinitions[index].name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`variableDefinitions.${index}.type`}
                  className="text-sm font-medium"
                >
                  Type
                </label>
                <select
                  id={`variableDefinitions.${index}.type`}
                  {...register(`variableDefinitions.${index}.type`)}
                  disabled={isDisabled}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-invalid={!!errors.variableDefinitions?.[index]?.type}
                >
                  <option value={TemplateVariableType.STRING}>String</option>
                  <option value={TemplateVariableType.NUMBER}>Number</option>
                  <option value={TemplateVariableType.BOOLEAN}>Boolean</option>
                  <option value={TemplateVariableType.DATE}>Date</option>
                </select>
                {errors.variableDefinitions?.[index]?.type && (
                  <p className="text-sm text-red-600">
                    {errors.variableDefinitions[index].type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`variableDefinitions.${index}.description`}
                className="text-sm font-medium"
              >
                Description
              </label>
              <input
                id={`variableDefinitions.${index}.description`}
                type="text"
                {...register(`variableDefinitions.${index}.description`)}
                disabled={isDisabled}
                placeholder="The order identifier"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-invalid={
                  !!errors.variableDefinitions?.[index]?.description
                }
              />
              {errors.variableDefinitions?.[index]?.description && (
                <p className="text-sm text-red-600">
                  {errors.variableDefinitions[index].description.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-6">
              <Controller
                control={control}
                name={`variableDefinitions.${index}.required`}
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isDisabled}
                      className="h-4 w-4 rounded border-input"
                    />
                    Required
                  </label>
                )}
              />

              <Controller
                control={control}
                name={`variableDefinitions.${index}.sensitive`}
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      disabled={isDisabled}
                      className="h-4 w-4 rounded border-input"
                    />
                    Sensitive
                  </label>
                )}
              />
            </div>
          </div>
        ))}

        {errors.variableDefinitions?.root && (
          <p className="text-sm text-red-600">
            {errors.variableDefinitions.root.message}
          </p>
        )}
      </div>
    </form>
  );
}
