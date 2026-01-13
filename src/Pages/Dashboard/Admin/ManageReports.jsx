import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageReports = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reports = [], refetch, isLoading } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reports');
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Report?',
            text: "This will remove the report permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff7070',
            cancelButtonColor: '#333333',
            confirmButtonText: 'Yes, delete!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reports/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire('Deleted!', 'Report has been removed.', 'success');
                }
            }
        });
    };

    if (isLoading) return <div className="p-10 text-center font-bold">Loading Reports...</div>

    return (
        <div className="fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#333333] dark:text-white">Manage <span className="text-[#2bb673]">Reports</span></h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Review and handle reported submissions</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-premium overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-[#f9f9f9] dark:bg-gray-700 text-gray-400 uppercase text-[10px] tracking-widest font-black border-b border-gray-100 dark:border-gray-600">
                                <th className="py-6 px-8 text-left">Reporter</th>
                                <th>Reported Worker</th>
                                <th>Task Title</th>
                                <th>Reason</th>
                                <th className="text-center px-8">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                            {reports.map((report) => (
                                <tr key={report._id} className="hover:bg-red-50/20 dark:hover:bg-red-900/10 transition-colors group">
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#333333] dark:text-gray-200">{report.buyer_name}</span>
                                            <span className="text-xs text-gray-400 font-medium">{report.buyer_email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#333333] dark:text-gray-200">{report.worker_name}</span>
                                            <span className="text-xs text-gray-400 font-medium">{report.worker_email}</span>
                                        </div>
                                    </td>
                                    <td className="font-bold text-gray-600 dark:text-gray-300 text-sm">
                                        {report.task_title}
                                    </td>
                                    <td>
                                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium italic">
                                            "{report.reason}"
                                        </div>
                                    </td>
                                    <td className="text-center px-8">
                                        <button
                                            onClick={() => handleDelete(report._id)}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            title="Delete Report"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {reports.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-gray-400 italic">No reports found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageReports;
