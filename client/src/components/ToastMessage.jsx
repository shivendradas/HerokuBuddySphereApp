// ToastMessage.js
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Toast } from 'primereact/toast';

const ToastMessage = forwardRef((props, ref) => {
  const toast = useRef(null);

  // Expose a 'show' method to parent via ref
  useImperativeHandle(ref, () => ({
    show: (message) => {
      toast.current.show(message);
    }
  }));

  return <Toast ref={toast} position="top-right" />;
});

export default ToastMessage;
