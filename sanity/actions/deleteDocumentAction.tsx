"use client";

import {TrashIcon} from "@sanity/icons";
import {useState} from "react";
import type {DocumentActionComponent, DocumentActionProps} from "sanity";
import {useDocumentOperation} from "sanity";

function DeleteDocumentAction(props: DocumentActionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {delete: deleteOperation} = useDocumentOperation(props.id, props.type);
  const disabled = deleteOperation.disabled;

  return {
    label: "Hapus",
    icon: TrashIcon,
    tone: "critical",
    disabled: Boolean(disabled),
    title:
      disabled === "NOTHING_TO_DELETE"
        ? "Tidak ada data yang bisa dihapus"
        : disabled === "NOT_READY"
          ? "Document belum siap dihapus"
          : "Hapus data ini",
    onHandle: () => {
      if (disabled) return;
      setDialogOpen(true);
    },
    dialog: dialogOpen
      ? {
          type: "confirm",
          tone: "critical",
          message: "Data ini akan dihapus permanen dari Sanity. Lanjutkan?",
          confirmButtonText: "Hapus",
          cancelButtonText: "Batal",
          onConfirm: () => {
            deleteOperation.execute();
            setDialogOpen(false);
            props.onComplete();
          },
          onCancel: () => {
            setDialogOpen(false);
            props.onComplete();
          },
        }
      : null,
  };
}

DeleteDocumentAction.action = "delete";
DeleteDocumentAction.displayName = "DeleteDocumentAction";

export default DeleteDocumentAction as DocumentActionComponent;
