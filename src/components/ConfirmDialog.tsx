import React from "react";
import Button from "./Button";
import Image from "next/image";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  action?: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  content,
  action,
}) => {
  return (
    <>
      {open && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b-[1px] border-gray-600">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Image
                        src="/icons/ico_error.svg"
                        alt="error"
                        width={23}
                        height={23}
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-white"
                        id="modal-title"
                      >
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">{content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 flex justify-between sm:justify-start sm:flex-row-reverse sm:px-6 gap-3">
                  {action}

                  <Button secondary={true} onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;
