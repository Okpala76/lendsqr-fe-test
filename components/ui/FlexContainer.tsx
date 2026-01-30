import * as React from "react";
import styles from "./FlexContainer.module.scss";

export interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  mdDirection?: "row" | "col";
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
  gap?: "none" | "sm" | "md" | "lg";
  pad?: "none" | "sm" | "md" | "lg";
  margin?: "none" | "sm" | "md" | "lg";
  spread?: "none" | "full" | "fullWidth" | "fullHeight";
  radioItemContainer?: "default";
  radioItemFocused?: boolean;
}

export const FlexContainer = React.forwardRef<
  HTMLDivElement,
  FlexContainerProps
>(
  (
    {
      className,
      direction = "row",
      justify = "start",
      align = "start",
      wrap = false,
      gap = "none",
      pad,
      margin,
      radioItemContainer,
      radioItemFocused,
      spread = "none",
      mdDirection,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.flexContainer} ${className || ""}`}
        data-direction={direction}
        data-md-direction={mdDirection}
        data-justify={justify}
        data-align={align}
        data-wrap={wrap.toString()}
        data-gap={gap}
        data-pad={pad}
        data-margin={margin}
        data-spread={spread}
        data-radio-item-container={radioItemContainer}
        data-radio-item-focused={radioItemFocused?.toString()}
        {...props}
      />
    );
  },
);

FlexContainer.displayName = "FlexContainer";
