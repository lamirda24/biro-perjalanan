import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
import { ToursitFormValues } from '@/schema/touristSchema';
import { UseFormReturn } from 'react-hook-form';
interface FormProps {
  form: UseFormReturn<ToursitFormValues, any, undefined>;
  onSubmit: (values: ToursitFormValues) => void;
}
export const TouristForm = ({ form, onSubmit }: FormProps) => {
  return (
    <Form {...form}>
      <form className="flex flex-col gap-[20px]" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="tourist_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tourist Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tourist_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tourist Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tourist_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tourist Email</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
};
