import { useForm } from "react-hook-form";
import { z } formimport { zodResolver } from "@hookform/resolvers/zod";
 "zod";

const formSchema = z.object({
    restaurantName: z.string({
        require_error: "restaurant name is required", 
    }),
     city: z.string({
        require_error: "city  is required", 
     }),  
     country: z.string({
        require_error: "country is required", 
    }),
    deliveryPrice: z.coerce.number({
        required_error:"delivery price is required",
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error:"estimated delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisunes: z.array(z.string()).nonempty({
        message: "please select at least one item",
    }),
    menuItems: z.array(
        z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
    })
   ),
   imageFile: z.instanceof(File, { message: "image is required"}),
});

type restaurantFormData = z.infer<typeof formSchema>

type props = {
    OnSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems:[{name: "", price: 0}],
        },
    });

    const onsubmit = (FormDataJson: restaurantFormData)=>{
        // TODO - convert formDataJson to a new FormData object
    }

return(
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-1g"
        ></form>
    </Form>
)

};

export default ManageRestaurantForm;