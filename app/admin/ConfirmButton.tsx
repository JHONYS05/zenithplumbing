"use client";

export function ConfirmButton({
  message,
  children,
  className,
  formAction,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
  /** Optional: submit the surrounding form to a different server action. */
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <button
      className={className}
      formAction={formAction}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
