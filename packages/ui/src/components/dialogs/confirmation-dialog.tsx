"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../primitives/alert-dialog";

interface ConfirmationDialogProps {
    cancelText?: string;
    children?: React.ReactNode;
    confirmText: string;
    description?: string | React.ReactNode;
    entityName?: string;
    isPending?: boolean;
    onConfirm: () => void | Promise<void>;
    onOpenChange: (open: boolean) => void;
    open: boolean;
    title?: string;
    variant?: "default" | "destructive";
}

export function ConfirmationDialog({
                                       cancelText = "Cancel",
                                       children,
                                       confirmText,
                                       description,
                                       entityName,
                                       isPending = false,
                                       onConfirm,
                                       onOpenChange,
                                       open,
                                       title = "Are you sure?",
                                       variant = "destructive",
                                   }: ConfirmationDialogProps) {
    const loadingText = isPending
        ? `${confirmText.replace(/^(Delete|Remove|Set|Update|Restore)/, "$1ing")}...`
        : confirmText;

    return (
        <AlertDialog
            open={open}
            onOpenChange={(value) => {
                if (!isPending) {
                    onOpenChange(value);
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description ?? (
                            <>
                                Are you sure you want to proceed
                                {entityName && (
                                    <>
                                        {" "}
                                        with <strong>{entityName}</strong>
                                    </>
                                )}
                                ? This action may have irreversible effects.
                            </>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {children && <div className="py-4">{children}</div>}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isPending}
                        className={
                            variant === "destructive"
                                ? "bg-destructive hover:bg-destructive/90"
                                : undefined
                        }
                    >
                        {loadingText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
