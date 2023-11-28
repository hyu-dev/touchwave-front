import { TSwal, TSwalTemplate } from "@utils/Alert/typed";
import Swal from "sweetalert2";

const template = ({ action, failed, ...args }: TSwalTemplate) => {
  Swal.fire({ ...args })
    .then(action)
    .catch(failed);
};

const confirm: TSwal = (args) => {
  template({
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "CANCEL",
    reverseButtons: true,
    ...args,
  });
};

const success: TSwal = (args) => {
  template({ icon: "success", ...args });
};

const error: TSwal = (args) => {
  template({ icon: "error", ...args });
};

const warning: TSwal = (args) => {
  template({ icon: "warning", ...args });
};

const basic: TSwal = (args) => {
  template({ ...args });
};

const input: TSwal = (args) => {
  template({
    input: "email",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "SEND",
    cancelButtonText: "CANCEL",
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    ...args,
  });
};

export const Alert = { success, error, warning, confirm, basic, input };
