import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Pagination from '@components/Pagination';
import Modal from '@components/Modal';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import useCategories from "@hooks/useCategories";
const CategoriesManager = () => {
    const { categories, refreshCategories } = useCategories();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
      const totalPages = Math.ceil(categories.length / itemsPerPage);
      const displayedData = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const validationSchema = Yup.object({
        name: Yup.string().required("Category Name is required"),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if(editCategory){
                updateCategory({...values, id: selectedCategory.id} )
            } else {
                createCategory(values)
            }
           
        }
    });

    const createCategory = async (categoryData) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/category/create`;
        try {
            toast.loading("Creating category... ⏳", { id: "category-create", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
                credentials: "include"
            });
            if (!response.ok) throw new Error(response.statusText);

            toast.success("Category created successfully! 🎉", { id: "category-create", duration: 5000 });
            formik.resetForm();
            refreshCategories();

        } catch (err) {
            toast.error(err.message, { id: "category-create" });

        }
    }   
    const updateCategory = async (categoryData) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/category/update/${categoryData.id}`;
        try {
            toast.loading("Updating category... ⏳", { id: "category-update", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
                credentials: "include"
            });
            if (!response.ok) throw new Error(response.statusText);

            toast.success("Category updated successfully! 🎉", { id: "category-update", duration: 5000 });
            refreshCategories();

        } catch (err) {
            toast.error(err.message, { id: "category-update" });
        }
    }   

    const DeleteCategory = async (id) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/category/delete/${id}`;
        try {
            toast.loading("Deleting category... ⏳", { id: "category-delete", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            if (!response.ok) throw new Error("Something went wrong");

            toast.success("Category deleted successfully! 🎉", { id: "category-delete", duration: 5000 });
            refreshCategories();

        } catch (err) {
            toast.error(err.message, { id: "category-delete" });

        }
    }
    const handleCreate = () => {
        setIsModalOpen(true);
        formik.resetForm();
        setEditCategory(false);
        setSelectedCategory(null);
    }
    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
        setEditCategory(true);
        formik.setValues({
            name: category.name
        });
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Categories</h2>
                <Button
                    onClick={() => handleCreate(true)}
                
                >Add Category
                </Button>
                
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr><th className="p-4">Name</th>
                        {/* <th className="p-4">Ads Count</th> */}
                        <th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">

                    {displayedData.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{c.name}</td>
                            {/* <td className="p-4">{c.count}</td> */}
                            <td className="p-4 text-right space-x-2">
                                <button onClick={() => handleEdit(c)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={18} /></button>
                                <button onClick={() => DeleteCategory(c.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Modal label="Add Category" title="Add / Edit Category" isOpen={isModalOpen}  onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={formik.handleSubmit}>
                        <fieldset>
                            <div className="mb-3">
                                <Input
                                    tag={"input"}
                                    type={"text"}
                                    id="name"
                                    name="name"
                                    required={true}
                                    label={"Category Name"}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && formik.errors.name}
                                />
                            </div>
                        </fieldset>
                        <div className="mb-3 text-left">
                            <Button
                                type={"submit"}
                                name={"category-btn"}
                                btnText={editCategory ? "Update" : "Add"}
                                disabled={formik.isSubmitting ? true : false}
                            />
                        </div>
                    </form>
                </Modal>
        </div>
    );
};

export default CategoriesManager;