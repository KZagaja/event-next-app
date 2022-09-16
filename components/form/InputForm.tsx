import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEvent } from "../../util/client/event-client/eventClient";
import { EventAPI } from "../../types/api/event.types";
import { queryKeys } from "../../util/query-keys/queryKeys";
import { clientDictionary } from "../../dictionary/client/clientDictionary";
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";

export const InputForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventAPI>();

  const toast = useRef<Toast>(null);
  const queryClient = useQueryClient();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: postEvent,
    onMutate: () => {
      setSubmitting(true);
    },
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: clientDictionary.toast.summary.error,
        detail: clientDictionary.toast.details.errorPostEvents,
      });
    },
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        summary: clientDictionary.toast.summary.success,
        detail: clientDictionary.toast.details.successPostEvents,
      });
      reset();
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.events]);
      setSubmitting(false);
    },
  });

  const onSubmit = async (eventData: EventAPI) => {
    await mutation.mutateAsync(eventData);
  };

  return (
    <div className="input-container">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <span className="p-float-label">
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <InputText
                  {...field}
                  disabled={submitting}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.error })}
                />
              )}
            />
            <label
              htmlFor="lastName"
              className={classNames({ "p-error": errors.lastName })}
            >
              Last Name
            </label>
          </span>
        </div>
        <div className="input-field">
          <span className="p-float-label">
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <InputText
                  {...field}
                  disabled={submitting}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.error })}
                />
              )}
            />
            <label
              htmlFor="firstName"
              className={classNames({ "p-error": errors.firstName })}
            >
              First Name
            </label>
          </span>
        </div>
        <div className="input-field">
          <span className="p-float-label">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              }}
              render={({ field, fieldState }) => (
                <InputText
                  {...field}
                  disabled={submitting}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.error })}
                />
              )}
            />
            <label
              htmlFor="email"
              className={classNames({ "p-error": errors.email })}
            >
              Email
            </label>
          </span>
        </div>
        <div className="input-field">
          <Controller
            name="eventDate"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Calendar
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                disabled={submitting}
                touchUI
                showTime
                hourFormat="24"
                showIcon
                className={classNames({ "p-invalid": fieldState.error })}
              />
            )}
          />
        </div>
        <Button
          label={clientDictionary.button.submit}
          type="submit"
          loading={submitting}
        />
      </form>
    </div>
  );
};
