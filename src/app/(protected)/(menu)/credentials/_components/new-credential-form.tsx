"use client";
import { createCredential } from "@/actions/workflow/create-credential";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewCredentialDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const { mutate, data, isPending } = useMutation({
    mutationFn: createCredential,
    onError: (e) => {
      toast.error("Something went wrong" + JSON.stringify(e));
    },
    onSuccess: () => {
      setName("");
      setValue("");
      setDialogOpen(false);
      toast.success("Credentials added");
    },
  });
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            Add Credentials
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new credential</DialogTitle>
            <DialogDescription>
              Credentials will be encrypted and stored securely!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                placeholder="API_KEY"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                name="value"
                type="password"
                placeholder="**************"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => {
                if (!name.trim() || !value.trim()) {
                  toast.error("Please fill all the fields");
                  return;
                }
                mutate({
                  name,
                  userId: "683c2c052507b4cdade10e0d",
                  value: value.trim(),
                });
              }}
              className="cursor-pointer"
            >
              {isPending ? <Loader className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
