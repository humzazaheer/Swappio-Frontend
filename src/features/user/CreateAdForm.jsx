import useCategories from "@hooks/useCategories";
import useLocations from "@hooks/useLocations";
import { Button } from "@components/Button";
import { useAuth } from "@context/AuthContext";
import { Input } from "@components/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RoutePath } from "@routes/routes";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateAdForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();



    const {categories} = useCategories();
    const {locations} = useLocations();

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
        description: Yup.string().required("Description is required").min(3, "Description must be at least 3 characters"),
        userId: Yup.number().required("userId is required"),
        price: Yup.number()
            .transform((value, originalValue) =>
                originalValue === "" ? undefined : Number(originalValue)
            )
            .required("price is required"),

        categoryId: Yup.number()
            .transform((v, o) => Number(o))
            .required(),

        locationId: Yup.number()
            .transform((v, o) => Number(o))
            .required(),


    });


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            userId: user.id,


        },
        validationSchema,
        onSubmit: async (values) => {
            const payload = {
                ...values,
                price: Number(values.price),
                categoryId: Number(values.categoryId),
                locationId: Number(values.locationId),
                userId: Number(values.userId),
            };
            const endpoint = `${import.meta.env.VITE_API_BASE_URL}/ad/create`;
            try {
                toast.loading("Creating your account... ⏳", { id: "newAd", duration: 5000 });
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                });

                if (!response.ok) throw new Error("Something went wrong", response);

                const data = await response.json();
                toast.success("Account created successfully!", { id: "newAd", duration: 5000 });
                navigate(`${RoutePath.USER}/${RoutePath.MYADS}`, {
                    state: { response: data },
                });
            } catch (err) {
                toast.error(err.message, { id: "newAd" });

            }
        }


    });

    return (
        <section id="register-section" className="max-w-[1000px] mx-auto mt-5">
            <h2 className="text-4xl text-center font-semibold text-slate-700 pb-4">
                Create An Ad
            </h2>


            <div className="py-10 flex flex-col justify-between bg-white">
                <form id="create-ad-form" className="md:p-10 p-4 space-y-5 " onSubmit={formik.handleSubmit}>

                    <div>
                        {/* <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input accept="image/*" type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png" alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div> */}
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label className="text-base font-medium" htmlFor="product-name">Ad Title</label>
                        <Input
                            tag={"input"}
                            type={"text"}
                            id="title"
                            name="title"
                            required={true}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && formik.errors.title}
                        />                </div>
                    <div className="flex flex-col gap-1 ">
                        <label className="text-base font-medium" htmlFor="product-description">Ad Description</label>
                        <Input
                            tag={"textarea"}
                            id="description"
                            name="description"
                            required={true}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && formik.errors.description}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="category">Category</label>
                        <Input
                            tag={"select"}
                            id="categoryId"
                            name="categoryId"
                            required={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.categoryId && formik.errors.categoryId}
                            options={categories.map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                            value={Number(formik.values.categoryId)}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="category">Location</label>
                        <Input
                            tag={"select"}
                            id="locationId"
                            name="locationId"
                            required={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.locationId && formik.errors.locationId}
                            options={locations.map((location) => ({
                                value: location.id,
                                label: location.name,
                            }))}
                            value={Number(formik.values.locationId)}
                        />
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="product-price">Price ( PKR )</label>
                            <Input
                                tag={"input"}
                                type={"number"}
                                id="price"
                                name="price"
                                required={true}
                                placeholder="300"
                                value={Number(formik.values.price)}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.price && formik.errors.price}
                            />
                        </div>
                    </div>
                    <Button
                        type={"submit"}
                        name={"create-ad-btn"}
                        btnText={formik.isSubmitting ? "Adding..." : "Add"}

                    />
                </form>
            </div>
        </section>
    );
};

export default CreateAdForm;