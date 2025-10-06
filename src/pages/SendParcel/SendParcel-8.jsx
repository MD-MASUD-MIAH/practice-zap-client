import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Define a reusable InputField component for cleaner JSX
const InputField = ({  type = "text", placeholder, register, name, error, isTextarea = false }) => {
  const commonProps = {
    ...register(name, { required: true }),
    className: isTextarea ? "textarea textarea-bordered w-full" : "input input-bordered w-full",
    placeholder,
  };

  return (
    <div>
      {/* Label is conditionally rendered based on the visual layout in the image,
          where some fields have inline labels and others rely on placeholders.
          I'll add it for structure but rely on placeholders for the image match. */}
      {/* <label className="label">{label}</label> */}
      {isTextarea ? (
        <textarea {...commonProps} rows={3} />
      ) : (
        <input type={type} {...commonProps} />
      )}
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

// Define a reusable SelectField component
const SelectField = ({  register, name, error, options, placeholder }) => (
  <div>
    {/* <label className="label">{label}</label> */}
    <select {...register(name, { required: true })} className="select select-bordered w-full">
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);


export default function SendParcelForm() {
  const [warehouses, setWarehouses] = useState([]);
  const [senderAreas, setSenderAreas] = useState([]);
  const [receiverAreas, setReceiverAreas] = useState([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { parcelType: "Document" } // Set default for radio
  });

  const selectedSenderCity = watch("senderWarehouse");
  const selectedReceiverCity = watch("receiverWarehouse");

  // warehouses data aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  useEffect(() => {
    // Assuming /warehouses.json contains an array of objects like:
    // [{ city: "City A", covered_area: ["Area 1", "Area 2"] }, ...]
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setWarehouses(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Update sender areas when warehouse changes
  useEffect(() => {
    const warehouse = warehouses.find(w => w.city === selectedSenderCity);
    setSenderAreas(warehouse ? warehouse.covered_area : []);
  }, [selectedSenderCity, warehouses]);

  // Update receiver areas when warehouse changes
  useEffect(() => {
    const warehouse = warehouses.find(w => w.city === selectedReceiverCity);
    setReceiverAreas(warehouse ? warehouse.covered_area : []);
  }, [selectedReceiverCity, warehouses]);

  const onSubmit = (data) => console.log(data);

  // Helper function for warehouse options
  const warehouseOptions = warehouses.map(w => w.city);
  

  console.log(warehouseOptions);
  
  return (
    // Outer container matching the general style from the image
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4 text-[#000000]">Add Parcel</h1>
      <hr className="mb-8 w-16 h-1 bg-green-500 border-0 mx-0" /> {/* Decorative line */}

      <h2 className="text-xl font-semibold mb-4 text-[#000000]">Enter your parcel details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Type - Using flex and custom styles to better match the image's radio button look */}
        <div className="flex gap-6 mb-8">
          <label className="flex items-center cursor-pointer">
            {/* Custom radio button styling to match the image's look (green circle) */}
            <input 
              type="radio" 
              value="Document" 
              {...register("parcelType", { required: "Parcel type is required" })} 
              className="hidden" 
            />
            <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-colors duration-200 
                          ${watch("parcelType") === "Document" ? "bg-[#5cb85c] border-[#5cb85c] p-1 flex items-center justify-center" : "border-gray-400 p-1"}`}>
              {watch("parcelType") === "Document" && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            Document
          </label>
          <label className="flex items-center cursor-pointer">
            <input 
              type="radio" 
              value="Not-Document" 
              {...register("parcelType", { required: "Parcel type is required" })} 
              className="hidden" 
            />
             <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-colors duration-200 
                          ${watch("parcelType") === "Not-Document" ? "bg-gray-400 border-gray-400 p-1 flex items-center justify-center" : "border-gray-400 p-1"}`}>
              {watch("parcelType") === "Not-Document" && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            Not-Document
          </label>
        </div>
        {errors.parcelType && <span className="text-red-500 text-sm block -mt-4 mb-4">{errors.parcelType.message}</span>}

        {/* Parcel Name and Weight - Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-600">Parcel Name</label>
            <InputField
              name="parcelName"
              placeholder="Parcel Name"
              register={register}
              error={errors.parcelName}
            />
          </div>
          <div>
            <label className="text-gray-600">Parcel Weight (KG)</label>
            <InputField
              name="parcelWeight"
              type="number"
              placeholder="Parcel Weight (KG)"
              register={register}
              error={errors.parcelWeight}
            />
          </div>
        </div>

        {/* Sender and Receiver Details - Two main columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6 border-t border-gray-300">
          
          {/* SENDER DETAILS COLUMN */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#000000]">Sender Details</h3>
            <div className="space-y-4">
              {/* Row 1: Name and Warehouse */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="senderName"
                  placeholder="Sender Name"
                  register={register}
                  error={errors.senderName}
                />
                <SelectField
                  name="senderWarehouse"
                  options={warehouseOptions}
                  register={register}
                  error={errors.senderWarehouse}
                  placeholder="Select Wire house" // Matching the image text
                />
              </div>

              {/* Row 2: Address and Contact No */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="senderAddress"
                  placeholder="Address"
                  register={register}
                  error={errors.senderAddress}
                />
                <InputField
                  name="senderContact"
                  placeholder="Sender Contact No" // Matching the image text
                  register={register}
                  error={errors.senderContact}
                />
              </div>

              {/* Row 3: Region (Area) */}
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  name="senderRegion"
                  options={senderAreas}
                  register={register}
                  error={errors.senderRegion}
                  placeholder="Select your region" // Matching the image text
                />
                {/* Empty slot to keep alignment, or another field if needed */}
                <div className="invisible">Spacer</div>
              </div>

              {/* Row 4: Pickup Instruction (Full width) */}
              <div className="pt-2">
                <label className="text-gray-600">Pickup Instruction</label>
                <InputField
                  name="pickupInstruction"
                  placeholder="Pickup Instruction"
                  register={register}
                  error={errors.pickupInstruction}
                  isTextarea={true}
                />
              </div>
              <p className="text-sm text-gray-500 italic">* Pickup Time 4pm-7pm Approx.</p>

            </div>
          </div>
          
          {/* RECEIVER DETAILS COLUMN */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#000000]">Receiver Details</h3>
            <div className="space-y-4">
              {/* Row 1: Name and Warehouse */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="receiverName"
                  placeholder="Receiver Name"
                  register={register}
                  error={errors.receiverName}
                />
                <SelectField
                  name="receiverWarehouse"
                  options={warehouseOptions}
                  register={register}
                  error={errors.receiverWarehouse}
                  placeholder="Select Delivery Wire house" // Matching the image text
                />
              </div>

              {/* Row 2: Address and Contact No */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="receiverAddress"
                  placeholder="Receiver Address"
                  register={register}
                  error={errors.receiverAddress}
                />
                <InputField
                  name="receiverContact"
                  placeholder="Receiver Contact No"
                  register={register}
                  error={errors.receiverContact}
                />
              </div>

              {/* Row 3: Region (Area) */}
              <div className="grid grid-cols-2 gap-4">
                 <SelectField
                  name="receiverRegion"
                  options={receiverAreas}
                  register={register}
                  error={errors.receiverRegion}
                  placeholder="Select your region" // Matching the image text
                />
                {/* Empty slot to keep alignment, or another field if needed */}
                <div className="invisible">Spacer</div>
              </div>

              {/* Row 4: Delivery Instruction (Full width) */}
              <div className="pt-2">
                <label className="text-gray-600">Delivery Instruction</label>
                <InputField
                  name="deliveryInstruction"
                  placeholder="Delivery Instruction"
                  register={register}
                  error={errors.deliveryInstruction}
                  isTextarea={true}
                />
              </div>
            </div>
          </div>
        </div>

        
        <div className="pt-6">
          <button 
            type="submit" 
            className="w-full md:w-auto px-8 py-3 bg-[#a8d360] text-black font-semibold rounded-lg shadow-md hover:bg-[#92b851] transition duration-150"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}