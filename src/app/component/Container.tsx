import type { ComponentProps } from "react";

type ContainerProps = ComponentProps<"div">;

/**
 * Shared page container used across the whole site.
 *
 * Standard width: `max-w-6xl` (1152px), centered with `mx-auto`,
 * and responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
 *
 * Place it inside a full-width wrapper (`main`, `section`, `header`,
 * `footer`) so backgrounds bleed edge-to-edge while their content
 * stays aligned to the same container.
 */
export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={
        className
          ? `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`
          : "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      }
      {...props}
    />
  );
}
