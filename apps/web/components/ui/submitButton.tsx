import { PropsWithChildren } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="w-full mt-2 text-base"
    >
      {pending ? "Enviando..." : children}
    </Button>
  );
};

export default SubmitButton;
