import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { submitTwitterHandle } from "@/services/mail";

const ApplyModal = ({ isOpen, closeModal }) => {
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Apply Now</h2>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {!emailSent ? (
          <Formik
            initialValues={{ twitterHandle: "" }}
            validationSchema={Yup.object({
              twitterHandle: Yup.string()
                .required("Twitter handle is required")
                .matches(/^@?(\w){1,15}$/, "Invalid Twitter handle format"),
            })}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                await submitTwitterHandle(values.twitterHandle);
                setSubmitting(false);
                setEmailSent(true);
              } catch (error) {
                setSubmitting(false);
                setFieldError(
                  "twitterHandle",
                  "Failed to submit Twitter handle. Please try again."
                );
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="twitterHandle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Twitter Handle
                  </label>
                  <Field
                    name="twitterHandle"
                    type="text"
                    placeholder="@username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="twitterHandle"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <p className="text-lg text-green-600 font-semibold">
            Email Sent! Thank you for applying.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
