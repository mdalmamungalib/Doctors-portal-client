import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import bg from '../../../assets/images/bg.png'

const AppointmentBanner = ({ setSelectedDate, selectedDate }) => {

    return (
        <section className='mx-5'>
            <div style={{
                backgroundImage: `url(${bg})`, maxWidth: "1363px", minHeight: "838px",
                '@media (max-width: 768px)': {
                    backgroundImage: "none"
                }
            }
            } className="hero pt-52  flex justify-center items-stretch pl-14 pr-9 ">
                <div className="hero-content flex-col lg:flex-row-reverse items-stretch lg:gap-32">

                    <img src={chair} className="lg:w-[594px] lg:h-[355px] rounded-lg shadow-2xl" alt='' />
                    <div className='card bg-[#eff0f6] mx-w-[312px] h-[322px] mt-4'>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        ></DayPicker>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;