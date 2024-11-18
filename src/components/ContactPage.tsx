import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "./Toast";
import { useState, useCallback } from "react";

type formData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  message: string;
};

function ContactPage() {
  const [showToast, setShowToast] = useState<boolean>(false);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().min(2).required(),
    company: yup.string().required(),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      ),
    areaCode: yup
      .string()
      .required()
      .matches(/^\d{3}$/, "Invalid Area Code"),
    phoneNumber: yup
      .string()
      .required()
      .matches(/^\d{1,8}$/, "Invalid Phone Number"),
    message: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(() => {
    setShowToast(true);
    reset();
  }, [reset]);

  return (
    <>
      <div className="h-screen">
        <Toast
          message="Form submitted successfully!"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
        <h1 className="text-5xl text-center my-24">Contact Us</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-stone-600 p-14 rounded-xl max-w-3xl mx-auto"
        >
          <div className="flex flex-col gap-6">
            {/* Name Section */}
            <div className="flex gap-4">
              <h2 className="w-24 text-white text-xl">Name</h2>
              <div className="flex gap-4 flex-1">
                <div className="flex-1">
                  <input
                    className="w-full h-10 px-3 rounded bg-white border border-gray-300"
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                  />
                  <label
                    htmlFor="firstName"
                    className="text-sm text-white mt-1 block"
                  >
                    First Name
                  </label>
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    className="w-full h-10 px-3 rounded bg-white border border-gray-300"
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                  />
                  <label
                    htmlFor="lastName"
                    className="text-sm text-white mt-1 block"
                  >
                    Last Name
                  </label>
                  {errors.lastName && (
                    <p className="text-red-500">Last name must be equal or greater than 2 characters</p>
                  )}
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div className="flex gap-4">
              <h2 className="w-24 text-white text-xl">Company</h2>
              <div className="flex-1">
                <input
                  className="w-full h-10 px-3 rounded bg-white border border-gray-300"
                  type="text"
                  {...register("company")}
                />
                {errors.company && (
                  <p className="text-red-500">{errors.company.message}</p>
                )}
              </div>
            </div>

            {/* Email Section */}
            <div className="flex gap-4">
              <h2 className="w-24 text-white text-xl">Email</h2>
              <div className="flex-1">
                <input
                  className="w-full h-10 px-3 rounded bg-white border border-gray-300"
                  type="email"
                  required
                  placeholder="example@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex gap-4">
              <h2 className="w-24 text-white text-xl">Phone</h2>
              <div className="flex gap-4 flex-1">
                <div className="w-1/4">
                  <input
                    className="w-full h-10 px-3 rounded bg-white border border-gray-300"
                    type="text"
                    id="areaCode"
                    {...register("areaCode")}
                  />
                  <label
                    htmlFor="areaCode"
                    className="text-sm text-white mt-1 block"
                  >
                    Area Code
                  </label>
                  {errors.areaCode && (
                    <p className="text-red-500">{errors.areaCode.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <input
                    className="w-full h-10 px-3 rounded bg-white border border-gray-300"
                    type="text"
                    id="phoneNumber"
                    {...register("phoneNumber")}
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm text-white mt-1 block"
                  >
                    Phone Number
                  </label>
                  {errors.phoneNumber && (
                    <p className="text-red-500">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="flex gap-4">
              <h2 className="w-24 text-white text-xl">Message</h2>
              <div className="flex-1">
                <textarea
                  className="w-full h-32 px-3 py-2 rounded bg-white border border-gray-300 resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <div className="w-24"></div>
              <button
                type="submit"
                className="bg-yellow-600 font-semibold text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactPage;
