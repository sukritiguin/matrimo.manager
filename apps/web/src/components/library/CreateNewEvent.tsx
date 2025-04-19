import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { CANVAS_PRESETS } from "@/lib/constants";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLibraryProvider } from "./LibraryProvider";
import { TagsInput } from "../ui/tags-input";
import { Loader2 } from "lucide-react";

export function NewEventSettingsModal({
  ...props
}: React.ComponentProps<React.FC<DialogProps>>) {
  const {
    createNewEventForm: form,
    onSubmitNewEvent,
    Categories,
    isCreatingNewEvent,
  } = useLibraryProvider();

  return (
    <Dialog {...props}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-orange-500">Create new event</DialogTitle>
          </DialogHeader>
          <DialogDescription>You can add a description, tags, and a category.</DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onSubmitNewEvent(data))}
              className="grid gap-4 py-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dimension"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimension</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select dimension" />
                          </SelectTrigger>
                          <SelectContent>
                            {CANVAS_PRESETS.map((option) => (
                              <SelectItem value={option.id} key={option.id}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Untitled" autoFocus {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Categories.map((option) => (
                              <SelectItem value={option} key={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("category").type === "Other" && (
                  <FormField
                    control={form.control}
                    name="category.other"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other</FormLabel>
                        <FormControl>
                          <Input placeholder="other" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagsInput value={field.value || []} onValueChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="focus">
                {isCreatingNewEvent && <Loader2 className="animate-spin size-4" />}
                Submit
              </Button>
              <DialogFooter>
                {/* <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose> */}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
