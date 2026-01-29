// hooks/useLoginForm.ts
import { useCallback, useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .trim()
    .refine((email) => email.length > 0, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type FieldErrors = Partial<Record<keyof LoginFormData, string>>;

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const validate = useCallback((): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FieldErrors = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof LoginFormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleSubmit = useCallback(
    (callback: (data: LoginFormData) => void) => {
      if (validate()) {
        callback(formData);
      }
    },
    [formData, validate],
  );

  return {
    formData,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    validate,
    handleSubmit,
  };
}
