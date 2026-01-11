import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import {
  XMarkIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import React from "react";
import { useDisclosure } from "../../hooks/useDisclosure";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const sizeClassMap = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-3xl",
  xl_2: "max-w-4xl",
  xl_3: "max-w-5xl",
  xl_4: "max-w-6xl",
  xl_5: "max-w-7xl",
  full: "w-full h-full max-w-none",
};

export default function Modal({
  trigger,
  title,
  children,
  open: externalOpen,
  onClose: externalClose,
  size = "md",
  isFormDirty = false,
  setIsFormDirty = () => {},
}) {
  const [isFull, setIsFull] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const saveRef = useRef(null);
  const { t } = useTranslation();

  // useDisclosure hook
  const [isOpen, { open, close }] = useDisclosure(false);

  const isControlled = externalOpen !== undefined;
  const isModalOpen = isControlled ? externalOpen : isOpen;

  const openModal = () => {
    if (!isControlled) open();
  };

  const closeModalHandler = () => {
    if (!isControlled) close();
  };

  const safeClose = () => {
    if (isFormDirty) return setShowConfirmModal(true);
    if (isControlled) externalClose?.();
    else closeModalHandler();
  };

  const effectiveSize = isFull ? "full" : size;
  const sizeClass = sizeClassMap[effectiveSize] || sizeClassMap.md;

  return (
    <>
      {trigger && <div onClick={openModal}>{trigger}</div>}

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          onClose={safeClose}
          initialFocus={saveRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`relative flex w-full origin-top flex-col overflow-hidden bg-gray-200 dark:bg-dark-700 transition-all duration-300 ${sizeClass} max-h-screen rounded-lg`}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-white dark:bg-dark-800 px-4 py-3 sm:px-5 rounded-t-lg">
                <Dialog.Title className="text-xl font-bold text-dark">
                  {t(title)}
                </Dialog.Title>
                <div className="flex items-center gap-2">
                  {/* <Button
                    variant="flat"
                    size="sm"
                    onClick={() => setIsFull((prev) => !prev)}
                    isIcon
                    className="size-7 rounded-full"
                    title={isFull ? "Default Size" : "Full Screen"}
                  >
                    {isFull ? (
                      <ArrowsPointingInIcon className="size-4.5" />
                    ) : (
                      <ArrowsPointingOutIcon className="size-4.5" />
                    )}
                  </Button> */}

                  <Button
                    onClick={safeClose}
                    variant="flat"
                    isIcon
                    className=" rounded-full"
                    title="Close"
                  >
                    <XCircleIcon className="size-8" />
                  </Button>
                </div>
              </div>

              {/* Body */}
              <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto px-6 py-4 sm:px-5 hide-scrollbar">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Confirm unsaved changes logic here */}
    </>
  );
}
