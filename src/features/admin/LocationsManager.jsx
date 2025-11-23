import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Pagination from '@components/Pagination';
import Modal from '@components/Modal';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import useLocations from "@hooks/useLocations";

const LocationsManager = () => {
    const { locations, refreshLocations } = useLocations();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = locations.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => setCurrentPage(1), [search]); // Reset page on search change

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const validationSchema = Yup.object({
          name: Yup.string().required("Location Name is required"),
      });
      const formik = useFormik({
          initialValues: {
              name: "",
          },
          validationSchema,
          onSubmit: async (values) => {
              if(editLocation){
                  updateLocation({...values, id: selectedLocation.id} )
              } else {
                  createLocation(values)
              }
             
          }
      });
  
      const createLocation = async (locationData) => {
          const endpoint = `${import.meta.env.VITE_API_BASE_URL}/location/create`;
          try {
              toast.loading("Creating location... ⏳", { id: "location-create", duration: Infinity });
              const response = await fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(locationData),
                  credentials: "include"
              });
              if (!response.ok) throw new Error(response.statusText);
  
              toast.success("Location created successfully! 🎉", { id: "location-create", duration: 5000 });
              formik.resetForm();
              refreshLocations();
  
          } catch (err) {
              toast.error(err.message, { id: "location-create" });
  
          }
      }   
      const updateLocation = async (locationData) => {
          const endpoint = `${import.meta.env.VITE_API_BASE_URL}/location/update/${locationData.id}`;
          try {
              toast.loading("Updating location... ⏳", { id: "location-update", duration: Infinity });
              const response = await fetch(endpoint, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(locationData),
                  credentials: "include"
              });
              if (!response.ok) throw new Error(response.statusText);
  
              toast.success("Location updated successfully! 🎉", { id: "location-update", duration: 5000 });
              refreshLocations();
  
          } catch (err) {
              toast.error(err.message, { id: "location-update" });
          }
      }   
  
      const DeleteLocation = async (id) => {
          const endpoint = `${import.meta.env.VITE_API_BASE_URL}/location/delete/${id}`;
          try {
              toast.loading("Deleting location... ⏳", { id: "location-delete", duration: Infinity });
              const response = await fetch(endpoint, {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include"
              });
  
              if (!response.ok) throw new Error("Something went wrong");
  
              toast.success("Location deleted successfully! 🎉", { id: "location-delete", duration: 5000 });
              refreshLocations();
  
          } catch (err) {
              toast.error(err.message, { id: "location-delete" });
  
          }
      }
      const handleCreate = () => {
          setIsModalOpen(true);
          formik.resetForm();
          setEditLocation(false);
          setSelectedLocation(null);
      }
      const handleEdit = (location) => {
          setSelectedLocation(location);
          setIsModalOpen(true);
          setEditLocation(true);
          formik.setValues({
              name: location.name
          });
      }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Locations</h2>
          <Button
                    onClick={() => handleCreate(true)}
                
                >Add Location
                </Button>
                
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search location..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 ring-indigo-500 outline-none" />
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr><th className="p-4">Location</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {displayedData.map(l => (
            <tr key={l.id} className="hover:bg-gray-50">
              <td className="p-4 font-medium">{l.name}</td>
              <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${l.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{l.isActive ? 'Active' : 'Inactive'  }</span></td>
              <td className="p-4 text-right space-x-2">
                <button onClick={() => handleEdit(l)} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={18} /></button>
                <button onClick={() => DeleteLocation(l.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <Modal label="Add Category" title="Add / Edit Location" isOpen={isModalOpen}  onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={formik.handleSubmit}>
                        <fieldset>
                            <div className="mb-3">
                                <Input
                                    tag={"input"}
                                    type={"text"}
                                    id="name"
                                    name="name"
                                    required={true}
                                    label={"Location Name"}
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
                                name={"location-btn"}
                                btnText={editLocation ? "Update" : "Add"}
                                disabled={formik.isSubmitting ? true : false}
                            />
                        </div>
                    </form>
                </Modal>
    </div>
  );
};

export default LocationsManager;