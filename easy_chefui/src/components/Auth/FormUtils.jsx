import React, { useState, useEffect } from "react";

function Thumb({ file }) {
  const [thumb, setThumb] = useState(undefined);

  useEffect(() => {
    if (!file) {
      setThumb(undefined);
      return;
    }

    let objectUrl = undefined;

    console.log("type of", typeof file);
    if (typeof file === "string") {
      objectUrl = file;
    } else {
      objectUrl = URL.createObjectURL(file);
    }

    setThumb(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file) {
    return null;
  }

  if (!thumb) {
    return <p>loading...</p>;
  }

  return (
    <img
      src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />
  );
}

export { Thumb };
