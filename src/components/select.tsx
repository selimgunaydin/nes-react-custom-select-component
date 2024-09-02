"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface Option {
  value?: string;
  label?: string;
  meta?: string;
  isActive?: boolean;
  image?: string;
  icon?: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  title?: string;
  label?: string;
  variant?: "iconView" | "imageView" | "activeView" | "search" | "multiSearch";
  sorting?: "asc" | "desc";
  className?: string;
  width?: number;
  disabled?: boolean;
  selectedIcon?: string;
  viewData?: "value" | "label" | "meta" | "image" | "icon";
  onChange?: (option: Option | Option[]) => void;
}

export default function Select({
  options,
  placeholder,
  title,
  label,
  variant,
  className,
  width = 320,
  disabled,
  selectedIcon,
  sorting,
  viewData = "meta",
  onChange,
}: SelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [sortedOptions, setSortedOptions] = useState<Option[]>(options);
  const selecRef = React.useRef<HTMLDivElement>(null);
  const closeSelect = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);
  useOnClickOutside(selecRef, closeSelect);

  const handleOptionSelect = (option: Option) => {
    let updatedOptions = [];

    if (variant === "multiSearch") {
      updatedOptions = selectedOptions.some(
        (selected) => selected.value === option.value
      )
        ? selectedOptions.filter((selected) => selected.value !== option.value)
        : [...selectedOptions, option];

      setSelectedOptions(updatedOptions);
      onChange && onChange(updatedOptions);
    } else {
      updatedOptions = [option];
      setSelectedOptions(updatedOptions);
      onChange && onChange(option);
    }

    setIsOpen(false);
    setIsSearchActive(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    if (variant === "search" || variant === "multiSearch") {
      if (!isOpen) {
        setIsOpen(true);
        setIsSearchActive(!isSearchActive);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSorting = (options: Option[], sorting: "asc" | "desc") => {
    return options
      .filter((option) => option.label)
      .sort((a: any, b: any) => {
        const comparison = a.label.localeCompare(b.label);
        return sorting === "asc" ? comparison : -comparison;
      });
  };

  useEffect(() => {
    let sorted = [...options];
    if (sorting) {
      sorted = handleSorting(sorted, sorting);
    }
    setSortedOptions(sorted);
  }, [options, sorting]);

  const filteredOptions =
    searchTerm.length > 1
      ? sortedOptions.filter((option) =>
          option.label?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : sortedOptions;

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowLabel(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowLabel(false);
    }
  }, [isOpen]);

  const getOptionData = (option: Option) => {
    if (!viewData) return null;
    const value = option[viewData];

    if (typeof value === "string") {
      if (value.split(" ").length > 1) {
        return value.split(" ")[0];
      }
      return value;
    }

    return null;
  };

  return (
    <div
      className={twMerge(
        clsx(
          className,
          `w-[${width}px]`,
          disabled && "opacity-50 pointer-events-none"
        )
      )}
      ref={selecRef}
    >
      <p className="text-[#344054] mb-1.5 font-medium text-sm">{title}</p>
      <motion.div
        onClick={toggleDropdown}
        className={clsx(
          "flex justify-between rounded-lg cursor-pointer border py-2.5 px-[14px]",
          isOpen && "border-[#D6BBFB] shadow-[0_0_0_4px_rgba(158,119,237,0.24)]"
        )}
      >
        <div className="flex items-center overflow-hidden">
          {!variant && selectedOptions.length > 0 && (
            <div className="flex font-medium">
              <p className="truncate max-w-[140px]">
                {selectedOptions[0].label}
              </p>
              <span className="ml-2 text-[#475467] font-normal">
                {getOptionData(selectedOptions[0])}
              </span>
            </div>
          )}
          {variant === "iconView" && selectedOptions.length > 0 && (
            <>
              <Image
                src={selectedOptions[0].icon || ""}
                alt="Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              <p className="font-medium">
                {selectedOptions[0].label}
                <span className="ml-2 text-[#475467] font-normal">
                  {getOptionData(selectedOptions[0])}
                </span>
              </p>
            </>
          )}
          {variant === "imageView" && selectedOptions.length > 0 && (
            <>
              <Image
                src={selectedOptions[0].image || ""}
                alt="Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              <p className="font-medium">
                {selectedOptions[0].label}
                <span className="ml-2 text-[#475467] font-normal">
                  {getOptionData(selectedOptions[0])}
                </span>
              </p>
            </>
          )}
          {variant === "activeView" && selectedOptions.length > 0 && (
            <>
              {selectedOptions[0].isActive ? (
                <Image
                  src={"./icons/dot.svg"}
                  alt="Active"
                  width={12}
                  height={12}
                  className="mr-2"
                />
              ) : (
                <Image
                  src={"./icons/dot.svg"}
                  alt="Inactive"
                  width={12}
                  height={12}
                  className="mr-2 grayscale"
                />
              )}

              <p className="font-medium flex">
                {selectedOptions[0].label}
                <span className="ml-2 text-[#475467] font-normal">
                  {viewData == "icon" || viewData == "image" ? (
                    <Image
                      src={selectedOptions[0][viewData] || ""}
                      alt="Icon"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  ) : (
                    getOptionData(selectedOptions[0])
                  )}
                </span>
              </p>
            </>
          )}
          {variant === "search" && selectedOptions.length > 0 && (
            <p className="font-medium truncate flex">
              {selectedOptions[0].label}
              <span className="ml-2 text-[#475467] font-normal">
                {viewData == "icon" || viewData == "image" ? (
                  <Image
                    src={selectedOptions[0][viewData] || ""}
                    alt="Icon"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                ) : (
                  getOptionData(selectedOptions[0])
                )}
              </span>
            </p>
          )}
          {variant === "multiSearch" && selectedOptions.length > 0 && (
            <div className="flex gap-1 mr-2">
              {selectedOptions.map((option, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-center border px-[5px] rounded-md py-0.5",
                    isOpen && index > 0 && "hidden",
                    !isOpen && index > 1 && "hidden"
                  )}
                >
                  {option.image && (
                    <Image
                      src={option.image}
                      alt={option.label || "Option Image"}
                      width={16}
                      height={16}
                      className={twMerge(
                        clsx(
                          "mr-1",
                          viewData == "image" && "mr-0",
                          viewData == "icon" && "mr-0"
                        )
                      )}
                    />
                  )}
                  <span className={clsx("text-sm")}>
                    {viewData == "icon" || viewData == "image" ? (
                      <></>
                    ) : (
                      getOptionData(option)
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
          {isSearchActive ? (
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className={twMerge(
                clsx(
                  "focus:outline-none h-6",
                  selectedOptions.length > 0 && "h-4"
                )
              )}
              autoFocus
            />
          ) : selectedOptions.length > 0 ? null : (
            <p className="text-[#667085] font-normal select-none">
              {variant == "search" || variant == "multiSearch"
                ? "Search"
                : placeholder || "Select"}
            </p>
          )}
          {selectedOptions.length > 2 && (
            <div className="flex items-center border px-[5px] rounded-md">
              <p className="text-sm">+{selectedOptions.length - 2}</p>
            </div>
          )}
        </div>
        <Image
          src={"./icons/chevron-down.svg"}
          alt="Chevron Down"
          onClick={() => {
            setIsOpen(!isOpen);
            setIsSearchActive(false);
          }}
          width={16}
          height={16}
        />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="border mt-1 py-[5px] rounded-md max-h-[320px] overflow-auto scrollbar absolute w-[320px] bg-white z-20 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),_0px_4px_6px_-2px_rgba(16,24,40,0.03)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredOptions.map((option, index) => (
              <motion.div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={clsx(
                  "flex justify-between py-2.5 ps-3.5 cursor-pointer hover:bg-[#F9FAFB] overflow-hidden",
                  `max-w-[${width}px]`,
                  selectedOptions.some(
                    (selected) => selected.value === option.value
                  ) && "bg-[#F9FAFB]"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  {variant === "activeView" && option.isActive && (
                    <Image
                      src={"./icons/dot.svg"}
                      alt="Active"
                      width={12}
                      height={12}
                      className="mr-2"
                    />
                  )}
                  {variant === "activeView" && !option.isActive && (
                    <Image
                      src={"./icons/dot.svg"}
                      alt="Inactive"
                      width={12}
                      height={12}
                      className="mr-2 grayscale"
                    />
                  )}
                  {variant === "iconView" && option.icon && (
                    <Image
                      src={option.icon}
                      alt="Icon"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {variant === "imageView" && option.image && (
                    <Image
                      src={option.image || option.icon || ""}
                      alt="Option Image"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  {variant === "multiSearch" && option.image && (
                    <Image
                      src={option.image || option.icon || ""}
                      alt="Option Image"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  <span
                    className={twMerge(
                      clsx("text-ellipsis truncate", `max-w-[140px]`)
                    )}
                  >
                    {option.label}
                  </span>
                  {option.meta && (
                    <span className="text-[#667085] ms-2">
                      {getOptionData(option)}
                    </span>
                  )}
                </div>
                {selectedOptions.some(
                  (selected) => selected.value === option.value
                ) && (
                  <Image
                    src={selectedIcon || "./icons/check.svg"}
                    alt="Check"
                    width={20}
                    height={20}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && showLabel && (
        <p className="mt-2 font-normal text-[#475467] text-sm">{label}</p>
      )}
    </div>
  );
}
