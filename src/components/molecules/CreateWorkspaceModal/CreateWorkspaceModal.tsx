
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Plus, Sparkles, X } from "lucide-react";
import { type FormEvent,useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    WORKSPACE_MODAL_COPY,
    WORKSPACE_UI_CONFIG,
} from "@/config/workspace-navigation";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const CreateWorkspaceModal = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        openCreateWorkspaceModal,
        setOpenCreateWorkspaceModal,
    } = useCreateWorkspaceModal();

    const {
        isPending,
        createWorkspaceMutation,
    } = useCreateWorkspace();

    const [workspaceName, setWorkspaceName] = useState("");
    const [workspaceDescription, setWorkspaceDescription] = useState("");
    const [formError, setFormError] = useState("");

    const copy = WORKSPACE_MODAL_COPY;
    const config = WORKSPACE_UI_CONFIG;

    const resetForm = () => {
        setWorkspaceName("");
        setWorkspaceDescription("");
        setFormError("");
    };

    const handleClose = (open: boolean) => {
        if (isPending) {
            return;
        }

        setOpenCreateWorkspaceModal(open);

        if (!open) {
            resetForm();
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = workspaceName.trim();
        const description = workspaceDescription.trim();

        if (name.length < 3) {
            setFormError("Workspace name must be at least 3 characters.");
            return;
        }

        if (name.length > config.workspaceNameMaxLength) {
            setFormError(
                `Workspace name cannot exceed ${config.workspaceNameMaxLength} characters.`
            );
            return;
        }

        setFormError("");

        try {
            const data = await createWorkspaceMutation({
                name,
                description,
            });

            await queryClient.invalidateQueries({
                queryKey: ["fetchWorkspaces"],
            });

            const workspaceId = data?._id ?? data?.id;

            setOpenCreateWorkspaceModal(false);
            resetForm();

            if (workspaceId) {
                navigate(`/workspaces/${workspaceId}`);
            } else {
                navigate("/app/chat");
            }
        } catch (error: unknown) {
            setFormError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while creating your workspace."
            );
        }
    };

    return (
        <Dialog
            open={openCreateWorkspaceModal}
            onOpenChange={handleClose}
        >
            <DialogContent
                className="overflow-hidden border-white/10 bg-[#121212] p-0 text-white sm:max-w-[480px]"
            >
                {/* Top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500" />

                <div className="p-6 sm:p-7">
                    <DialogHeader className="text-left">
                        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
                            <Sparkles className="size-5 text-violet-300" />
                        </div>

                        <DialogTitle className="text-xl font-semibold tracking-tight">
                            {copy.title}
                        </DialogTitle>

                        <DialogDescription className="mt-2 text-sm leading-6 text-white/50">
                            {copy.description}
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="workspace-name"
                                className="text-sm font-medium text-white/80"
                            >
                                {copy.nameLabel}
                            </label>

                            <Input
                                id="workspace-name"
                                autoFocus
                                required
                                minLength={3}
                                maxLength={config.workspaceNameMaxLength}
                                placeholder={copy.namePlaceholder}
                                value={workspaceName}
                                onChange={(event) => {
                                    setWorkspaceName(event.target.value);
                                    setFormError("");
                                }}
                                disabled={isPending}
                                className="h-11 border-white/10 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:ring-violet-400/40"
                            />

                            <div className="flex justify-end">
                                <span className="text-[11px] text-white/30">
                                    {workspaceName.length}/
                                    {config.workspaceNameMaxLength}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="workspace-description"
                                className="text-sm font-medium text-white/80"
                            >
                                {copy.descriptionLabel}
                            </label>

                            <textarea
                                id="workspace-description"
                                maxLength={
                                    config.workspaceDescriptionMaxLength
                                }
                                rows={3}
                                placeholder={copy.descriptionPlaceholder}
                                value={workspaceDescription}
                                onChange={(event) =>
                                    setWorkspaceDescription(
                                        event.target.value
                                    )
                                }
                                disabled={isPending}
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/10 disabled:opacity-50"
                            />
                        </div>

                        {formError && (
                            <div
                                role="alert"
                                className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-3 py-2.5 text-sm text-red-300"
                            >
                                {formError}
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 border-t border-white/[0.07] pt-5">
                            <Button
                                type="button"
                                variant="ghost"
                                disabled={isPending}
                                onClick={() => handleClose(false)}
                                className="text-white/60 hover:bg-white/5 hover:text-white"
                            >
                                {copy.cancel}
                            </Button>

                            <Button
                                type="submit"
                                disabled={isPending || workspaceName.trim().length < 3}
                                className="gap-2 bg-white text-black hover:bg-white/90 disabled:opacity-50"
                            >
                                {isPending ? (
                                    <>
                                        <LoaderCircle className="size-4 animate-spin" />
                                        {copy.submitting}
                                    </>
                                ) : (
                                    <>
                                        <Plus className="size-4" />
                                        {copy.submit}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};