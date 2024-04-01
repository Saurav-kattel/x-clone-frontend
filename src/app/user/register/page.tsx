import React, { Suspense } from "react";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <div>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default page;
