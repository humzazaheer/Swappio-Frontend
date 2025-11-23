// src/views/AdsManager.js
import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import Pagination from '@components/Pagination';
import Modal from '@components/Modal';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import useAds from "@hooks/useAds";
import useCategories from "@hooks/useCategories";
import useLocations from "@hooks/useLocations";
import { useAuth } from "@context/AuthContext";


const AdsManager = () => {
    const { ads, refreshAds } = useAds();
    const { user } = useAuth();
    const { categories } = useCategories();
    const { locations } = useLocations();

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 1. Filter
    const filteredData = ads.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'All' || (item.isActive ? 'Active' : 'Closed') === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // 2. Paginate
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    

    useEffect(() => setCurrentPage(1), [search, filterStatus]); // Reset page on filter change

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [editAd, setEditAd] = useState(false);
    // const [selectedAd, setSelectedAd] = useState(null);
    

    // const validationSchema = Yup.object({
    //     title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    //     description: Yup.string().required("Description is required").min(3, "Description must be at least 3 characters"),
    //     userId: Yup.number().required("userId is required"),
    //     price: Yup.number()
    //         .transform((value, originalValue) =>
    //             originalValue === "" ? undefined : Number(originalValue)
    //         )
    //         .required("price is required"),

    //     categoryId: Yup.number()
    //         .transform((v, o) => Number(o))
    //         .required(),

    //     locationId: Yup.number()
    //         .transform((v, o) => Number(o))
    //         .required(),


    // });
    // const formik = useFormik({
    //     initialValues: {
    //         title: "",
    //         description: "",
    //         userId: user.id,
    //         categoryId: 0,
    //         locationId: 0, 
    //         price: "",
    //     },
    //     validationSchema,
    //     onSubmit: async (values) => {
    //         const payload = {
    //             ...values,
    //             price: Number(values.price),
    //             categoryId: Number(values.categoryId),
    //             locationId: Number(values.locationId),
    //             userId: Number(values.userId),
    //         };
    //         if (editAd) {
    //             updateAd({ ...payload, id: selectedAd.id })
    //         } else {
    //             createAd(payload)
    //         }

    //     }
    // });

    // const createAd = async (adData) => {
    //     const endpoint = `${import.meta.env.VITE_API_BASE_URL}/ad/create`;
    //     try {
    //         toast.loading("Creating ad... ⏳", { id: "ad-create", duration: Infinity });
    //         const response = await fetch(endpoint, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(adData),
    //             credentials: "include"
    //         });
    //         if (!response.ok) throw new Error(response.statusText);

    //         toast.success("Ad created successfully! 🎉", { id: "ad-create", duration: 5000 });
    //         formik.resetForm();
    //         refreshAds();

    //     } catch (err) {
    //         toast.error(err.message, { id: "ad-create" });

    //     }
    // }
    // const updateAd = async (adData) => {
    //     const endpoint = `${import.meta.env.VITE_API_BASE_URL}/ad/update/${adData.id}`;
    //     try {
    //         toast.loading("Updating ad... ⏳", { id: "ad-update", duration: Infinity });
    //         const response = await fetch(endpoint, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(adData),
    //             credentials: "include"
    //         });
    //         if (!response.ok) throw new Error(response.statusText);

    //         toast.success("Ad updated successfully! 🎉", { id: "ad-update", duration: 5000 });
    //         refreshAds();

    //     } catch (err) {
    //         toast.error(err.message, { id: "ad-update" });
    //     }
    // }

    const DeleteAd = async (id) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/ad/delete/${id}`;
        try {
            toast.loading("Deleting ad... ⏳", { id: "ad-delete", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            if (!response.ok) throw new Error("Something went wrong");

            toast.success("Ad deleted successfully! 🎉", { id: "ad-delete", duration: 5000 });
            refreshAds();

        } catch (err) {
            toast.error(err.message, { id: "ad-delete" });

        }
    }
    // const handleCreate = () => {
    //     setIsModalOpen(true);
    //     formik.resetForm();
    //     setEditAd(false);
    //     setSelectedAd(null);
    // }
    // const handleEdit = (ad) => {
    //     setSelectedAd(ad);
    //     setIsModalOpen(true);
    //     setEditAd(true);
    //     formik.setValues({
    //         title: ad.title,
    //         description: ad.description,
    //         userId: user.id,
    //         price: ad.price,
    //         categoryId: String(ad.__category__.id),
    //         locationId: String(ad.__location__.id),
    //     });
    // }


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-gray-800 text-lg">Ad Listings</h2>
                    {/* <Button
                        onClick={() => handleCreate(true)}>Add Ad
                    </Button> */}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 ring-indigo-500 outline-none" />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 ring-indigo-500 outline-none bg-white appearance-none cursor-pointer" >
                            <option value="All">All Status</option><option value="Active">Active</option><option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4">Location</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        
                        {displayedData.length > 0 ? displayedData.map(ad => (
                            <tr key={ad.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-800">{ad.title}</td>
                                <td className="p-4 text-gray-600">{ad.__category__.name}</td>
                                <td className="p-4 text-gray-600">{ad.__location__.name}</td>
                                <td className="p-4 ">PKR {ad.price}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${ad.isActive ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>{ad.isActive ? 'Active' : 'Inactive'}</span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    {/* <button onClick={() => handleEdit(ad)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={18} /></button> */}
                                    <button onClick={() => DeleteAd(ad.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        )) : (<tr><td colSpan="5" className="p-8 text-center text-gray-500">No ads found matching your filters.</td></tr>)}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            {/* <Modal  title="Create / Edit Ad" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <fieldset>
                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"text"}
                                id="title"
                                name="title"
                                label={"Ad Title"}
                                required={true}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && formik.errors.title}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                tag={"textarea"}
                                id="description"
                                name="description"
                                label={"Ad Description"}
                                required={true}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                tag={"select"}
                                id="categoryId"
                                name="categoryId"
                                label={"Ad Category"}
                                required={true}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.categoryId && formik.errors.categoryId}
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                                value={formik.values.categoryId}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                tag={"select"}
                                id="locationId"
                                name="locationId"
                                label={"Ad Location"}
                                required={true}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.locationId && formik.errors.locationId}
                                options={locations.map((location) => ({
                                    value: location.id,
                                    label: location.name,
                                }))}
                                value={formik.values.locationId}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"number"}
                                id="price"
                                name="price"
                                label={"Ad Price (PKR)"}
                                required={true}
                                placeholder="300"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.price && formik.errors.price}
                            />
                        </div>
                    </fieldset>
                    <div className="mb-3 text-left">
                        <Button
                            type={"submit"}
                            name={"ad-btn"}
                            btnText={editAd ? "Update" : "Create"}
                            disabled={formik.isSubmitting ? true : false}
                        />
                    </div>
                </form>
            </Modal> */}
        </div>
    );
};

export default AdsManager;