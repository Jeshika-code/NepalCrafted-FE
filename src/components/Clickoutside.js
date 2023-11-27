import React, { useState, useRef, useEffect } from "react";

export default function withClickOutside(WrappedComponent) {
  const Component = (props) => {
    const [isOpen, setisOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event?.target)) {
          setisOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return <WrappedComponent isOpen={isOpen} setisOpen={setisOpen} ref={ref} />;
  };

  return Component;
}
