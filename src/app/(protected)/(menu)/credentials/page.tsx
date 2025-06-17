import { getCredentialsByUserId } from "@/actions/workflow/get-credentials-by-user-id";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Key, LockKeyhole, Shield } from "lucide-react";
import React, { Suspense } from "react";
import { NewCredentialDialog } from "./_components/new-credential-form";
import { Credential } from "@/actions/workflow/create-credential";
import { Card } from "@/components/ui/card";
import DeleteKeyButton from "./_components/delete-key-button";

const CredentialPage = () => {
  return (
    <div className="size-full relative pl-12">
      <div className="w-full px-10 py-4 flex items-center sticky top-0 bg-background border-b justify-between">
        <div className="flex gap-4 items-center">
          <Key />
          <label className="text-2xl">Credentials</label>
        </div>
        <NewCredentialDialog />
      </div>
      <div className="w-full h-full py-6 space-y-8 px-10">
        <div className="flex flex-col bg-sidebar border rounded-md p-4 gap-1">
          <div className="flex gap-2 text-green-500">
            <Shield />
            <AlertTitle>Encrypted</AlertTitle>
          </div>
          <AlertDescription>
            Your passwords are encrypted and stored securely
          </AlertDescription>
        </div>
        <Suspense
          fallback={
            <div className="flex gap-2">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          }
        >
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  );
};

export default CredentialPage;

async function UserCredentials() {
  const credentials = await getCredentialsByUserId("683c2c052507b4cdade10e0d");
  if (!credentials)
    return (
      <div className="w-full flex items-center justify-center text-muted-foreground">
        Something went wrong
      </div>
    );
  if (credentials.length === 0)
    return (
      <div className="w-full flex items-center justify-center text-muted-foreground flex-col gap-4">
        No credentials found!
      </div>
    );
  return (
    <div className="flex flex-wrap gap-2">
      {credentials.map((credential: Credential) => {
        return (
          <Card
            className="px-4 py-2 flex flex-row items-center justify-between w-fit"
            key={credential.id}
          >
            <div className="flex gap-4 items-center">
              <div className="rounded-full bg-primary/10 size8 flex items-center justify-center">
                <LockKeyhole size={18} className="stroke-primary" />
              </div>
              <div>
                <p className="font-semibold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">
                  {`${credential.value.substring(
                    0,
                    4
                  )}...${credential.value.substring(
                    credential.value.length - 4
                  )}`}
                </p>
              </div>
            </div>
            <DeleteKeyButton credentialId={credential.id!} />
          </Card>
        );
      })}
    </div>
  );
}
