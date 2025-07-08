<script lang="ts">
    import SuperDebug, {filesProxy, type Infer, setError, superForm, type SuperValidated} from "sveltekit-superforms";
    import {zodClient} from "sveltekit-superforms/adapters";
    import { Dialog, DialogTrigger } from "$lib/components/ui/dialog";
    import {type CreateWorkspaceSchema, createWorkspaceSchema} from "$lib/schemas/workspace";
    import {DialogContent, DialogFooter, DialogHeader, DialogTitle} from "$lib/components/ui/dialog/index.js";
    import {Button} from "$lib/components/ui/button";
    import {FormControl, FormDescription, FormField, FormFieldErrors, FormLabel} from "$lib/components/ui/form";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import {Plus} from "@lucide/svelte";
    import type {User} from "@prisma/client";
    import type {ActionResult} from "@sveltejs/kit";
    import {setFlash} from "sveltekit-flash-message/server";
    import {toast} from "svelte-sonner";

    type CreateWorkspaceFormProps = {
        data: {
            form: SuperValidated<Infer<CreateWorkspaceSchema>>,
            user: User
        }
    }

    let { data }: CreateWorkspaceFormProps = $props();

    const form = superForm(data.form, {
        validators: zodClient(createWorkspaceSchema),
    });
    const { form: formData, enhance } = form;

    function handleResult(result: ActionResult) {
        console.log(result.type === 'error' ? 'Error' : 'Success');
        if(result.type !== 'error') {
            toast.success('Workspace created!');
            open = false;
            return;
        }
        toast.error(result.error.message ?? 'An unknown error occurred!');
    }

    let open = $state(false);
</script>

<Dialog bind:open>
    <DialogTrigger>
        <Button>
            <Plus />
            Create Workspace
        </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>
        <form id="create-workspace" method="POST" use:enhance>
            <FormField {form} name="name">
                <FormControl>
                    {#snippet children({ props })}
                        <FormLabel>Name</FormLabel>
                        <Input {...props} bind:value={$formData.name} placeholder="Your Workspace" />
                    {/snippet}
                </FormControl>
                <FormDescription>This is the project name</FormDescription>
                <FormFieldErrors />
            </FormField>
            <input type="hidden" name="userId" bind:value={$formData.userId} />
        </form>
        <DialogFooter>
            <Button type="submit" form="create-workspace">
                Erstellen
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>