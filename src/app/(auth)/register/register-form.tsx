"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/src/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/app/components/ui/field";
import { Input } from "@/src/app/components/ui/input";

const formSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hổng trùng khớp nha! (Passwords do not match)",
    path: ["confirmPassword"],
  });
export function RegisterForm() {
  const t = useTranslations("Register");
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    
    // Show toast
    toast.success(t('successMessage'), {
      description: t('successDescription'),
    });
    
    // Redirect logic
    // router.push("/login");
  }

  return (
    <Card className="relative z-10 w-full max-w-[420px] mx-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(234,88,12,0.3)] border-orange-200/40 dark:border-orange-900/30 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(234,88,12,0.4)]">
      {/* Top highlight bar */}
      <div className="h-2.5 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
      <CardHeader className="space-y-3 pb-6 pt-10 text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-red-900/40 rounded-2xl flex items-center justify-center mb-2 shadow-inner ring-4 ring-white/50 dark:ring-zinc-900/50 transform -rotate-3 hover:rotate-3 transition-transform duration-300">
          <span className="text-3xl">🍔</span>
        </div>
        <CardTitle className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 drop-shadow-sm">
          {t('title')}
        </CardTitle>
        <CardDescription className="text-base font-medium text-zinc-600 dark:text-zinc-300 px-4">
          {t('description1')} <br /> {t('description2')}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="gap-5">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field
                  className="space-y-2 transition-all group"
                  data-invalid={!!fieldState.error}
                >
                  <FieldLabel className="text-zinc-800 dark:text-zinc-200 font-bold ml-1 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block mr-2 group-focus-within:animate-ping"></span>
                    {t('fullName')}
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder={t('fullNamePlaceholder')}
                    className="h-12 px-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 hover:border-orange-300 focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 shadow-sm transition-all placeholder:text-zinc-400 font-medium"
                  />
                  <FieldError
                    errors={[{ message: fieldState.error?.message }]}
                  />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field
                  className="space-y-2 transition-all group"
                  data-invalid={!!fieldState.error}
                >
                  <FieldLabel className="text-zinc-800 dark:text-zinc-200 font-bold ml-1 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block mr-2 group-focus-within:animate-ping"></span>
                    {t('email')}
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="h-12 px-4 rounded-xl bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 hover:border-orange-300 focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 shadow-sm transition-all placeholder:text-zinc-400 font-medium"
                  />
                  <FieldError
                    errors={[{ message: fieldState.error?.message }]}
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field
                  className="space-y-2 transition-all group"
                  data-invalid={!!fieldState.error}
                >
                  <FieldLabel className="text-zinc-800 dark:text-zinc-200 font-bold ml-1 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-2 group-focus-within:animate-ping"></span>
                    {t('password')}
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder={t('passwordPlaceholder')}
                      className="h-12 px-4 pr-12 rounded-xl bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 hover:border-orange-300 focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 shadow-sm transition-all placeholder:text-zinc-400 font-medium tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FieldError
                    errors={[{ message: fieldState.error?.message }]}
                  />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field
                  className="space-y-2 transition-all group"
                  data-invalid={!!fieldState.error}
                >
                  <FieldLabel className="text-zinc-800 dark:text-zinc-200 font-bold ml-1 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block mr-2 group-focus-within:animate-ping"></span>
                    {t('confirmPassword')}
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t('confirmPasswordPlaceholder')}
                      className="h-12 px-4 pr-12 rounded-xl bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 hover:border-orange-300 focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 shadow-sm transition-all placeholder:text-zinc-400 font-medium tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FieldError
                    errors={[{ message: fieldState.error?.message }]}
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full h-14 cursor-pointer mt-6 text-lg font-black text-white bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 rounded-xl shadow-[0_8px_20px_rgba(234,88,12,0.4)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.5)] transform hover:-translate-y-1 transition-all duration-300 border border-orange-400/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                {t('submitLoading')}
              </>
            ) : (
              t('submit')
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center pb-8 pt-2 bg-gradient-to-t from-orange-50/50 to-transparent dark:from-zinc-900/50">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {t('alreadyAccount')}{" "}
          <Link
            href="/login"
            className="font-bold text-orange-600 dark:text-orange-500 hover:text-red-500 hover:underline decoration-2 underline-offset-4 transition-colors"
          >
            {t('signIn')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
