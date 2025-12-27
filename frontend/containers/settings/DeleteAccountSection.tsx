"use client";

const DeleteAccountSection = () => {
  return (
    <section className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-red-700">
            Delete Account
          </h2>
          <p className="text-sm text-red-600/70 mt-1">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>

        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-6 h-10 shadow-lg shadow-red-600/20 transition-all duration-200 text-sm whitespace-nowrap"
        >
          Delete Account
        </button>
      </div>
    </section>
  );
};

export default DeleteAccountSection;