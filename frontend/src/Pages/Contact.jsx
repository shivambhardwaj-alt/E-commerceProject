import React, { useReducer } from "react";
import { assets } from "../assets/assets.js";

const initialState = {
  name: "",
  email: "",
  query: "",
  errors: {},
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "RESET_FORM":
      return initialState;

    case "SET_SUBMITTED":
      return {
        ...state,
        submitted: action.payload,
      };

    default:
      return state;
  }
}

const Contact = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validate = () => {
    const errors = {};

    if (!state.name.trim()) errors.name = "Name is required.";
    if (!state.email.trim()) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(state.email))
      errors.email = "Enter a valid email address.";

    if (!state.query.trim()) errors.query = "Please enter your query.";

    return errors;
  };

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    console.log("Form submitted:", {
      name: state.name,
      email: state.email,
      query: state.query,
    });

    dispatch({ type: "SET_SUBMITTED", payload: true });
    dispatch({ type: "RESET_FORM" });
  };

  const contactInfo = [
    {
      icon: assets.whatsapp,
      title: "Phone",
      lines: ["+91 92323 4234", "+91 23234 4234"],
    },
    {
      icon: assets.whatsapp,
      title: "Email",
      lines: ["frostCollection@gmail.com", "support@winterwear.com"],
    },
    {
      icon: assets.whatsapp,
      title: "Address",
      lines: ["82 Lane Main Road", "USA"],
    },
  ];

  return (
    <div className="md:pt-20 md:px-32 pt-20 px-10">
      <h1 className="text-3xl prata-regular uppercase tracking-wider">
        Let's Get in Touch
      </h1>

      <div className="flex flex-col lg:flex-row md:gap-10 lg:items-center items-start gap-5 md:justify-between justify-center mt-10">
        {contactInfo.map((item) => (
          <div key={item.title} className="flex flex-col gap-2 mt-8 md:mt-1">
            <img
              src={item.icon}
              alt={item.title}
              className="w-10 h-10 border border-gray-700/45"
            />
            {item.lines.map((line) => (
              <p key={line} className="text-gray-500 tracking-wider">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex-1 w-full md:max-w-[600px] mt-16">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
          <div className="absolute top-4 left-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow">
            <h3>Visit Our Office</h3>
            <p>123 Business Street, Lucknow, Uttar Pradesh</p>
          </div>

          <div className="h-[320px] md:h-[420px] w-full">
            <iframe
              title="Store location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28198.137900704154!2d77.8238543093881!3d27.939780080918187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397359ff7abf70ff%3A0xd2df8cd95d60600c!2sKhair%2C%20Uttar%20Pradesh%20202138!5e0!3m2!1sen!2sin!4v1782234406458!5m2!1sen!2sin"
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <hr className="mt-10 border-gray-600" />

      <p className="mt-10 text-2xl prata-regular tracking-wider">
        Or fill out the form below
      </p>

      {state.submitted && (
        <p className="mt-4 text-green-600">Your message has been sent.</p>
      )}

      <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5 md:flex-row md:gap-10">
          <div className="flex-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="w-full p-3 outline-none border-gray-500 border-b-2"
              aria-invalid={!!state.errors.name}
              aria-describedby={state.errors.name ? "name-error" : undefined}
            />
            {state.errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-600">
                {state.errors.name}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="w-full p-3 outline-none border-gray-500 border-b-2"
              aria-invalid={!!state.errors.email}
              aria-describedby={state.errors.email ? "email-error" : undefined}
            />
            {state.errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-600">
                {state.errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="query" className="block mb-2 text-sm font-medium">
            Your Query
          </label>
          <textarea
            id="query"
            name="query"
            className="outline-none border-gray-600 border rounded-xl w-full md:w-[500px] h-44 p-3"
            placeholder="Enter your query here..."
            value={state.query}
            onChange={handleChange}
            aria-invalid={!!state.errors.query}
            aria-describedby={state.errors.query ? "query-error" : undefined}
          />
          {state.errors.query && (
            <p id="query-error" className="mt-2 text-sm text-red-600">
              {state.errors.query}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="border border-gray-600 w-40 rounded-xl p-4 mb-10 hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer uppercase text-xl hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;