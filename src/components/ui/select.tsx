"use client";

import { ComponentProps, useId, useMemo } from "react";
import ReactSelect, { StylesConfig } from "react-select";

export interface SelectProps extends ComponentProps<typeof ReactSelect> {
  isError?: boolean;
}

export type Option = {
  label: string;
  value: string;
};

const Select = ({ components, isError, name, ...props }: SelectProps) => {
  const id = useId();

  const customStyle: StylesConfig = useMemo(
    () => ({
      menu: (provided) => ({
        ...provided,
        borderRadius: "12px",
        padding: "10px",
        zIndex: 100,
        position: "absolute",
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: 200,
      }),
      option: (provided, state) => ({
        ...provided,
        "&:hover": {
          color: "white",
          backgroundColor: "#a31dae",
        },
        color: state.isSelected ? "white" : provided.color,
        backgroundColor: state.isSelected
          ? "#a31dae"
          : provided.backgroundColor,
        padding: 5,
        margin: "2px 0",
        borderRadius: "5px",
      }),
      control: (base, state) => ({
        ...base,
        height: "40px",
        borderRadius: "8px",
        borderColor: state.isFocused ? "#a31dae" : isError ? "red" : "#e2e8f0",
        boxShadow: "none",
        "&:hover": {
          borderColor: state.isFocused
            ? "#a31dae"
            : isError
            ? "red"
            : "#e2e8f0",
        },
      }),
    }),
    [isError]
  );

  return (
    <ReactSelect
      instanceId={id}
      styles={customStyle}
      name={name}
      components={{ IndicatorSeparator: null, ...components }}
      {...props}
    />
  );
};

export default Select;
