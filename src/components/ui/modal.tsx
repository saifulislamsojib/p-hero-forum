"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, MouseEvent, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";

interface DialogProps extends Omit<ComponentProps<"dialog">, "open"> {
  open: boolean;
  setOpen: (open: boolean) => void;
  heading: string;
}

const Modal = ({
  children,
  open,
  setOpen,
  onClose,
  className,
  heading,
  ...props
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      document.body.style.overflowY = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflowY = "scroll";
    }
  }, [open]);

  const handleOutsideClick = (
    event: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>
  ) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions?.left! ||
      event.clientX > dialogDimensions?.right! ||
      event.clientY < dialogDimensions?.top! ||
      event.clientY > dialogDimensions?.bottom!
    ) {
      setOpen(false);
    }
  };

  return (
    <dialog
      onClose={(e) => {
        setOpen(false);
        onClose?.(e);
      }}
      className={cn(
        "backdrop:bg-gray-500/50 backdrop:backdrop-blur-[1px] w-[98%] max-w-[600px] p-3 md:p-4 rounded duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] z-50 backdrop:z-50 shadow-md",
        className
      )}
      ref={dialogRef}
      {...props}
      onClick={handleOutsideClick}
      data-state={open ? "open" : "closed"}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold leading-none tracking-tight">
          {heading}
        </h3>
        <MdOutlineClose
          className="text-2xl cursor-pointer hover:bg-slate-300 rounded-full p-1 w-8 h-8"
          onClick={() => setOpen(false)}
        />
      </div>
      <hr className="my-3" />
      {children}
      <Toaster />
    </dialog>
  );
};

export default Modal;
