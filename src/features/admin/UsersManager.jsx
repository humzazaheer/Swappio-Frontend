// src/views/UsersManager.js
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Ban, Search, Filter, Shield, Users } from 'lucide-react';
import Pagination from '@components/Pagination';
import useUsers from '@hooks/useUsers';
import Modal from '@components/Modal';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

const UsersManager = () => {
    const { users, refreshUsers } = useUsers();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterRole, setFilterRole] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = users.filter(item => {
        const itemName = item.firstName + ' ' + item.lastName;
        const matchesSearch = itemName.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'All' || (item.isActive ? 'Active' : 'Inactive') === filterStatus || (item.isVerified ? 'Verified' : 'Unverified') === filterStatus;
        const matchesRole = filterRole === 'All' || item.role === filterRole;
        return matchesSearch && matchesStatus && matchesRole;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => setCurrentPage(1), [search, filterStatus, filterRole]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const validation = {
        firstName: Yup.string().required("First Name is required").min(3, "First Name must be at least 3 characters"),
        lastName: Yup.string().required("Last Name is required").min(3, "Last Name must be at least 3 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        address: Yup.string(),
        phone: Yup.string().matches(/^(?:\+|00)[1-9]\d{1,14}$/, "Phone number must start with + or 00 and be valid"),
        role: Yup.string().required("Please choose one option"),
        gender: Yup.string().required("Please select a value")
    }

    const validationSchema = Yup.object(editUser ? validation : { ...validation, password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")});

    const initValues = {
        firstName: "",
            lastName: "",
            email: "",
            address: "",
            phone: "",
            role: "",
            gender: ""
    }

    const formik = useFormik({
        initialValues: editUser ? initValues : {...initValues, password: "" },
        validationSchema,
        onSubmit: async (values) => {
            if (editUser) {
                updateUser({ ...values, id: selectedUser.id })
            } else {
                createUser(values)
            }
        }


    });

    const createUser = async (userData) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/create`;
        try {
            toast.loading("Creating your account... ⏳", { id: "register", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error("Something went wrong");


            toast.success("Account created successfully! 🎉", { id: "register", duration: 5000 });
            refreshUsers();
            formik.resetForm();


        } catch (err) {
            toast.error(err.message, { id: "register" });

        }
    }
    const updateUser = async (userData) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/update/${userData?.id}`;
        try {
            toast.loading("Updating profile... ⏳", { id: "profile", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error("Something went wrong");
            toast.success("Profile updated successfully! 🎉", { id: "profile", duration: 5000 });
            refreshUsers();


        } catch (err) {
            toast.error(err.message, { id: "profile" });

        }
    }

    const DeleteUser = async (id) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/delete/${id}`;
        try {
            toast.loading("Deleting user... ⏳", { id: "user-delete", duration: Infinity });
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            if (!response.ok) throw new Error("Something went wrong");

            toast.success("User deleted successfully! 🎉", { id: "user-delete", duration: 5000 });
            refreshUsers();

        } catch (err) {
            toast.error(err.message, { id: "user-delete" });

        }
    }

    const handleCreate = () => {
        setIsModalOpen(true);
        formik.resetForm();
        setEditUser(false);
        setSelectedUser(null);
    }
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        setEditUser(true);
        formik.setValues({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            address: user?.address || "",
            phone: user?.phone || "",
            role: user?.role || "",
            gender: user?.gender || ""
        });
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">User Management</h2>
                    <Button
                        onClick={() => handleCreate(true)}

                    >Add User
                    </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 ring-[#23e5db] outline-none" />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
                            className="pl-10 pr-8 py-2 border rounded-lg focus:ring-2 ring-[#23e5db] outline-none bg-white appearance-none cursor-pointer" >
                            <option value="All">All Roles</option><option value="user">User</option><option value="admin">Admin</option>
                        </select>
                    </div>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:ring-2 ring-[#23e5db] outline-none bg-white cursor-pointer" >
                        <option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Verified">Verified</option><option value="Unverified">Unverified</option>
                    </select>
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr><th className="p-4">Name & Email</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {displayedData.length > 0 ? displayedData.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50">
                            <td className="p-4"><div className="font-medium text-gray-800">{u.name}</div><div className="text-sm text-gray-700">{u.email}</div></td>
                            <td className="p-4 flex items-center gap-2">{u.role === 'Admin' ? <Shield size={14} className="text-purple-600" /> : <Users size={14} className="text-gray-400" />} {u.role}</td>
                            <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                            <td className="p-4 text-right space-x-2">
                                <button onClick={() => handleEdit(u)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={18} /></button>
                                <button onClick={() => DeleteUser(u.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Ban size={18} /></button>
                            </td>
                        </tr>
                    )) : (<tr><td colSpan="4" className="p-8 text-center text-gray-500">No users found matching your filters.</td></tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Modal label="Create User" title="Create / Edit User" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form id="login-form" className="p-10" onSubmit={formik.handleSubmit}>
                    <fieldset>
                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"text"}
                                id="firstName"
                                name="firstName"
                                required={true}
                                label={"First Name"}
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && formik.errors.firstName}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"text"}
                                id="lastName"
                                name="lastName"
                                required={true}
                                label={"Last Name"}
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && formik.errors.lastName}
                            />
                        </div>


                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"email"}
                                id="email"
                                name="email"
                                required={true}
                                inputMode={"email"}
                                label={"Email"}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        {!editUser &&
                            <div className="mb-3">
                                <Input
                                    tag={"input"}
                                    type={"password"}
                                    id="password"
                                    name="password"
                                    required={true}
                                    label={"password"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && formik.errors.password}
                                />
                            </div>
                        }

                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"text"}
                                id="address"
                                name="address"
                                required={true}
                                label={"Address"}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && formik.errors.address}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                tag={"input"}
                                type={"tel"}
                                id="phone"
                                name="phone"
                                required={true}
                                label={"Phone"}
                                value={formik.values.phone}
                                inputMode={"tel"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                tag="select"
                                name="gender"
                                label="Gender"
                                id="gender"
                                required={true}
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                    { value: "other", label: "Other" },
                                    { value: "not specified", label: "Not specified" }
                                ]}
                                error={formik.touched.gender && formik.errors.gender}
                            />

                        </div>

                        <div className="mb-3">
                            <div className="flex space-x-4">
                                <Input
                                    type="radio"
                                    id="adminRole"
                                    name="role"
                                    value="admin"
                                    label="Admin"
                                    checked={formik.values.role === "admin"}
                                    onChange={formik.handleChange}
                                />
                                <Input
                                    type="radio"
                                    id="userRole"
                                    name="role"
                                    value="user"
                                    label="User"
                                    checked={formik.values.role === "user"}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {formik.touched.role && formik.errors.role && (
                                <div className="text-red-500 text-md mt-1">{formik.errors.role}</div>
                            )}


                        </div>



                    </fieldset>
                    <div className="mb-3 text-left">
                        <Button
                            type={"submit"}
                            name={"register-btn"}
                            btnText={editUser ? "Update" : "Create"}
                            disabled={formik.isSubmitting ? true : false}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UsersManager;