"use client";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export function CommonSuccessAlert(props:any) {
  return (
    <div className="fixed top-0 right-0 w-full z-999">
        <Alert className="relative w-full z-50" color={"success"} rounded>
            <span className="font-medium">Success!</span> {props?.text}
          </Alert>
    </div>
  );
}

export function CommonErrorAlert(props:any) {
  return (
    <Alert color={"failure"} rounded icon={HiInformationCircle}>
      <span className="font-medium">Failed!</span> {props?.text}
    </Alert>
  );
}
