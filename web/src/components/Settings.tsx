import React from "react";

interface Props {
  show: boolean;
}

const Settings: React.FC<Props> = ({ show }) => {
  return (
    <div
      className={`w-full h-full absolute z-10 bg-slate-900 clip-path ${
        show ? "clip-path-active" : ""
      }`}
    >
      <div className="text-2xl flex justify-center items-center w-full h-full text-center p-10">
        <p>
          Hi [Your Name]! Your personalized settings have been saved securely.
          Want to personalize further? Simply tap your name below to edit it.
          Remember, changes are automatically saved! If it's security updates
          you need, head over to 'Account Security' to update your password.
          Your safety matters, so after making changes, click 'Save' to keep
          your settings up-to-date.
        </p>
      </div>
    </div>
  );
};

export default Settings;
