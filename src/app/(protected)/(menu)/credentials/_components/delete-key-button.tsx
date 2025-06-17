"use client";
import { deleteCredentialById } from "@/actions/workflow/delete-ceredential-by-id";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader, Trash } from "lucide-react";
import React from "react";

const DeleteKeyButton = ({ credentialId }: { credentialId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteCredentialById,
  });
  return (
    <Button
      variant="ghost"
      className="cursor-pointer"
      onClick={() => {
        mutate({ credentialId });
      }}
      disabled={isPending}
    >
      {isPending ? <Loader className="animate-spin" /> : <Trash />}
    </Button>
  );
};

export default DeleteKeyButton;
