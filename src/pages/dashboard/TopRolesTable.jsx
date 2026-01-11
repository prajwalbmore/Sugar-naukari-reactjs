import React from "react";

const TopRolesTable = ({ data, t }) => {
  const topRoles = data?.top_roles;
  return (
    <div className="p-5 w-full bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{t("Top Roles")}</h2>
      {/* Scrollable container */}
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-4 text-left border-b">{t("Role")}</th>
              <th className="py-2 px-4 text-center border-b">{t("Jobs")}</th>
              <th className="py-2 px-4 text-center border-b">{t("Hires")}</th>
            </tr>
          </thead>
          <tbody>
            {topRoles.map((role, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{role.role}</td>
                <td className="py-2 px-4 text-center border-b">{role.jobs}</td>
                <td className="py-2 px-4 text-center border-b">{role.hires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopRolesTable;
