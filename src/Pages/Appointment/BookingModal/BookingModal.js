import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name, slots, price } = treatment;
    const [error, setError] = useState("");
    const date = format(selectedDate, "PP");
    const { user } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        // if(!phone.length < 11){
        //     setError("Please provide a valid number");
        //     return
        // };
        const booking = {
            appointmentDate: date,
            treatment: treatment.name,
            patient: name,
            slot,
            phone,
            email,
            price
        }

        fetch("https://doctors-portal-server-smoky-mu.vercel.app/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.acknowledged) {
                    setTreatment(null);
                    toast.success("Booking confirmed")
                    refetch();
                }
                else{
                    toast.error(data?.message);
                }
            })

    }
    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle " />
            <div className="modal bg-[#eff0f6]">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn  btn-sm btn-circle absolute right-2 top-2 bg-[#3A4256] text-[#D4D9E3]">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-5 mt-14'>
                        <input type="text" disabled value={date} className="input input-bordered bg-[#E6E6E6] w-full" />
                        <select name='slot' className="select select-bordered bg-[#E6E6E6] w-full">
                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" disabled defaultValue={user?.displayName} placeholder="Full Name" className="input input-bordered w-full" required />
                        <input name='phone' type="number" placeholder="Phone Number" className="input input-bordered w-full" required />
                        {error}
                        <input name='email' type="text" disabled defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full" required />
                        <input type="submit" value="Submit" className="input input-bordered bg-[#3A4256] text-[#D4D9E3] w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;