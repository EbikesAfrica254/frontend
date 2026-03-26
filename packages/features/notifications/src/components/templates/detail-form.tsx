"use client";

import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@repo/ui/primitives/button";
import { Checkbox } from "@repo/ui/primitives/checkbox";
import { Input } from "@repo/ui/primitives/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/primitives/select";
import { Separator } from "@repo/ui/primitives/separator";
import { Textarea } from "@repo/ui/primitives/textarea";
import {
  UpdateTemplateFormData,
  updateTemplateSchema,
} from "../../schemas/template-schemas";
import { TemplateVariableType } from "../../types/enums";
import { TemplateResponse } from "../../types/templates";

interface TemplateDetailFormProps {
  formId: string;
  template: TemplateResponse;
  onSubmit: (data: UpdateTemplateFormData) => void | Promise<void>;
}

export function TemplateDetailForm({
  formId,
  template,
  onSubmit,
}: TemplateDetailFormProps) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateTemplateFormData>({
    defaultValues: {
      bodyTemplate: template.bodyTemplate,
      subject: template.subject ?? "",
      variableDefinitions: template.variableDefinitions,
    },
    resolver: zodResolver(updateTemplateSchema),
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "variableDefinitions",
  });

  const isEmail = template.channel === "EMAIL";

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 py-4"
    >
      {/* Template Content */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-foreground">
            Template Content
          </h4>
          <Separator className="flex-1" />
        </div>

        {isEmail && (
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Subject
            </label>
            <Input
              id="subject"
              {...register("subject")}
              disabled={isSubmitting}
              placeholder="Order [[${orderId}]] Confirmed"
              aria-invalid={!!errors.subject}
            />
            {errors.subject && (
              <p className="text-sm font-medium text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="bodyTemplate"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Body
          </label>
          <Textarea
            id="bodyTemplate"
            {...register("bodyTemplate")}
            disabled={isSubmitting}
            rows={8}
            aria-invalid={!!errors.bodyTemplate}
          />
          {errors.bodyTemplate && (
            <p className="text-sm font-medium text-destructive">
              {errors.bodyTemplate.message}
            </p>
          )}
        </div>
      </div>

      {/* Variable Definitions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-foreground">
            Variable Definitions
          </h4>
          <Separator className="flex-1" />
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isSubmitting}
            onClick={() =>
              append({
                description: "",
                name: "",
                required: false,
                sensitive: false,
                type: TemplateVariableType.STRING,
              })
            }
          >
            <Plus className="mr-1 h-3 w-3" />
            Add Variable
          </Button>
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
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={isSubmitting}
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor={`variableDefinitions.${index}.name`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name
                </label>
                <Input
                  id={`variableDefinitions.${index}.name`}
                  {...register(`variableDefinitions.${index}.name`)}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.variableDefinitions?.[index]?.name}
                />
                {errors.variableDefinitions?.[index]?.name && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.variableDefinitions[index].name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`variableDefinitions.${index}.type`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Type
                </label>
                <Controller
                  control={control}
                  name={`variableDefinitions.${index}.type`}
                  render={({ field: selectField }) => (
                    <Select
                      value={selectField.value}
                      onValueChange={selectField.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id={`variableDefinitions.${index}.type`}
                        aria-invalid={
                          !!errors.variableDefinitions?.[index]?.type
                        }
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TemplateVariableType.STRING}>
                          String
                        </SelectItem>
                        <SelectItem value={TemplateVariableType.NUMBER}>
                          Number
                        </SelectItem>
                        <SelectItem value={TemplateVariableType.BOOLEAN}>
                          Boolean
                        </SelectItem>
                        <SelectItem value={TemplateVariableType.DATE}>
                          Date
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.variableDefinitions?.[index]?.type && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.variableDefinitions[index].type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`variableDefinitions.${index}.description`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Description
              </label>
              <Input
                id={`variableDefinitions.${index}.description`}
                {...register(`variableDefinitions.${index}.description`)}
                disabled={isSubmitting}
                aria-invalid={
                  !!errors.variableDefinitions?.[index]?.description
                }
              />
              {errors.variableDefinitions?.[index]?.description && (
                <p className="text-sm font-medium text-destructive">
                  {errors.variableDefinitions[index].description.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-6">
              <Controller
                control={control}
                name={`variableDefinitions.${index}.required`}
                render={({ field: checkField }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`variableDefinitions.${index}.required`}
                      checked={checkField.value ?? false}
                      onCheckedChange={checkField.onChange}
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor={`variableDefinitions.${index}.required`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Required
                    </label>
                  </div>
                )}
              />

              <Controller
                control={control}
                name={`variableDefinitions.${index}.sensitive`}
                render={({ field: checkField }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`variableDefinitions.${index}.sensitive`}
                      checked={checkField.value ?? false}
                      onCheckedChange={checkField.onChange}
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor={`variableDefinitions.${index}.sensitive`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Sensitive
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
        ))}

        {errors.variableDefinitions?.root && (
          <p className="text-sm font-medium text-destructive">
            {errors.variableDefinitions.root.message}
          </p>
        )}
      </div>
    </form>
  );
}
