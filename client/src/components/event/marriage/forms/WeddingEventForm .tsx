import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
// import { Form } from "react-hook-form";
import { useForm, FormProvider, Form } from "react-hook-form";

import { FieldValues, FormSubmitHandler } from "react-hook-form";
import { WeddingEventFormDataInterface } from "../SubhBibahaTheme";

interface WeddingEventFormProps {
  formData: WeddingEventFormDataInterface;
  setFormData: Dispatch<SetStateAction<WeddingEventFormDataInterface>>;
}

const WeddingEventForm: React.FC<WeddingEventFormProps> = ({
  formData,
  setFormData,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState(null); // Track which date picker is active

  // Open the date picker modal and set the active date picker
  const openDatePicker = (pickerName: any) => {
    setActiveDatePicker(pickerName);
    setIsDatePickerOpen(true);
  };

  // Close the date picker modal
  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
    setActiveDatePicker(null);
  };

  // Handle date selection
  const handleDateSelect = (date: any) => {
    if (activeDatePicker) {
      handleDateChange(date, `${activeDatePicker}.date`);
      closeDatePicker();
    }
  };

  const methods = useForm(); // Initialize react-hook-form

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date.toISOString().split("T")[0], // Storing the date in ISO format (YYYY-MM-DD)
    }));
  };

  const handleSubmit: FormSubmitHandler<FieldValues> = (data) => {
    // Now you have access to form data
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Bride Name */}
          <FormItem>
            <FormLabel>Bride Name</FormLabel>
            <FormControl>
              <Input
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                placeholder="Bride's Name"
              />
            </FormControl>
          </FormItem>

          {/* Bride's Father's Name */}
          <FormItem>
            <FormLabel>Bride's Father's Name</FormLabel>
            <FormControl>
              <Input
                name="brideFatherName"
                value={formData.brideFatherName}
                onChange={handleChange}
                placeholder="Bride's Father's Name"
              />
            </FormControl>
          </FormItem>

          {/* Bride's Mother's Name */}
          <FormItem>
            <FormLabel>Bride's Mother's Name</FormLabel>
            <FormControl>
              <Input
                name="brideMotherName"
                value={formData.brideMotherName}
                onChange={handleChange}
                placeholder="Bride's Mother's Name"
              />
            </FormControl>
          </FormItem>

          {/* Groom Name */}
          <FormItem>
            <FormLabel>Groom Name</FormLabel>
            <FormControl>
              <Input
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                placeholder="Groom's Name"
              />
            </FormControl>
          </FormItem>

          {/* Groom's Father's Name */}
          <FormItem>
            <FormLabel>Groom's Father's Name</FormLabel>
            <FormControl>
              <Input
                name="groomFatherName"
                value={formData.groomFatherName}
                onChange={handleChange}
                placeholder="Groom's Father's Name"
              />
            </FormControl>
          </FormItem>

          {/* Groom's Mother's Name */}
          <FormItem>
            <FormLabel>Groom's Mother's Name</FormLabel>
            <FormControl>
              <Input
                name="groomMotherName"
                value={formData.groomMotherName}
                onChange={handleChange}
                placeholder="Groom's Mother's Name"
              />
            </FormControl>
          </FormItem>

          {/* Wedding Date Picker */}
          <FormItem>
            <FormLabel>Wedding Date</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger>
                  <Input
                    name="weddingDate"
                    value={formData.weddingDate}
                    readOnly
                    placeholder="Select Wedding Date"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={
                      formData.reception.date
                        ? new Date(formData.reception.date)
                        : undefined
                    }
                    onDayClick={(date) =>
                      handleDateChange(date, "reception.date")
                    } // Use onDayClick or the correct prop name
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>

          {/* Muhurat Time */}
          <FormItem>
            <FormLabel>Wedding Muhurat Time</FormLabel>
            <FormControl>
              <Input
                name="muhuratTime"
                value={formData.muhuratTime}
                onChange={handleChange}
                placeholder="Muhurta Time"
              />
            </FormControl>
          </FormItem>

          {/* Venue Name */}
          <FormItem>
            <FormLabel>Venue Name</FormLabel>
            <FormControl>
              <Input
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                placeholder="Venue Name"
              />
            </FormControl>
          </FormItem>

          {/* Venue Address */}
          <FormItem>
            <FormLabel>Venue Address</FormLabel>
            <FormControl>
              <Textarea
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                placeholder="Venue Address"
              />
            </FormControl>
          </FormItem>

          {/* Haldi Ceremony Date Picker */}
          <FormItem>
            <FormLabel>Haldi Ceremony</FormLabel>
            <FormControl>
              <>
                <Popover>
                  <PopoverTrigger>
                    <Input
                      name="haldiCeremony.date"
                      value={formData.haldiCeremony.date}
                      readOnly
                      placeholder="Select Haldi Date"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={
                        formData.haldiCeremony.date
                          ? new Date(formData.haldiCeremony.date)
                          : undefined
                      }
                      onDayClick={(date) =>
                        handleDateChange(date, "haldiCeremony.date")
                      } // Using onDayClick instead of onDateChange
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  name="haldiCeremony.time"
                  value={formData.haldiCeremony.time}
                  onChange={handleChange}
                  placeholder="Haldi Time"
                />
                <Input
                  name="haldiCeremony.venue"
                  value={formData.haldiCeremony.venue}
                  onChange={handleChange}
                  placeholder="Haldi Venue"
                />
              </>
            </FormControl>
          </FormItem>

          {/* Mehendi Ceremony Date Picker */}
          <FormItem>
            <FormLabel>Mehendi Ceremony</FormLabel>
            <FormControl>
              <>
                <Popover>
                  <PopoverTrigger>
                    <Input
                      name="mehendiCeremony.date"
                      value={formData.mehendiCeremony.date}
                      readOnly
                      placeholder="Select Mehendi Date"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={
                        formData.mehendiCeremony.date
                          ? new Date(formData.mehendiCeremony.date)
                          : undefined
                      }
                      onDayClick={(date) =>
                        handleDateChange(date, "mehendiCeremony.date")
                      } // Using onDayClick instead of onDateChange
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  name="mehendiCeremony.time"
                  value={formData.mehendiCeremony.time}
                  onChange={handleChange}
                  placeholder="Mehendi Time"
                />
                <Input
                  name="mehendiCeremony.venue"
                  value={formData.mehendiCeremony.venue}
                  onChange={handleChange}
                  placeholder="Mehendi Venue"
                />
              </>
            </FormControl>
          </FormItem>

          {/* Sangeet Ceremony Date Picker */}
          <FormItem>
            <FormLabel>Sangeet Ceremony</FormLabel>
            <FormControl>
              <>
                <Popover>
                  <PopoverTrigger>
                    <Input
                      name="sangeetCeremony.date"
                      value={formData.sangeetCeremony.date}
                      readOnly
                      placeholder="Select Sangeet Date"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={
                        formData.sangeetCeremony.date
                          ? new Date(formData.sangeetCeremony.date)
                          : undefined
                      }
                      onDayClick={(date) =>
                        handleDateChange(date, "sangeetCeremony.date")
                      } // Using onDayClick instead of onDateChange
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  name="sangeetCeremony.time"
                  value={formData.sangeetCeremony.time}
                  onChange={handleChange}
                  placeholder="Sangeet Time"
                />
                <Input
                  name="sangeetCeremony.venue"
                  value={formData.sangeetCeremony.venue}
                  onChange={handleChange}
                  placeholder="Sangeet Venue"
                />
              </>
            </FormControl>
          </FormItem>

          {/* Reception Ceremony Date Picker */}
          <FormItem>
            <FormLabel>Reception Ceremony</FormLabel>
            <FormControl>
              <>
                <Popover>
                  <PopoverTrigger>
                    <Input
                      name="reception.date"
                      value={formData.reception.date}
                      readOnly
                      placeholder="Select Reception Date"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={
                        formData.reception.date
                          ? new Date(formData.reception.date)
                          : undefined
                      }
                      onDayClick={(date) =>
                        handleDateChange(date, "reception.date")
                      } // Using onDayClick instead of onDateChange
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  name="reception.time"
                  value={formData.reception.time}
                  onChange={handleChange}
                  placeholder="Reception Time"
                />
                <Input
                  name="reception.venue"
                  value={formData.reception.venue}
                  onChange={handleChange}
                  placeholder="Reception Venue"
                />
              </>
            </FormControl>
          </FormItem>

          {/* RSVP Contact */}
          {/* <FormItem>
            <FormLabel>RSVP Contact</FormLabel>
            <FormControl>
              <Input
                name="rsvpContact"
                value={formData.rsvpContact}
                onChange={handleChange}
                placeholder="RSVP Contact"
              />
            </FormControl>
          </FormItem> */}

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </FormProvider>
  );
};

export default WeddingEventForm;
