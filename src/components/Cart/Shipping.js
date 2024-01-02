import React,{useState} from 'react'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps.js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../../actions/cartActions.js';
const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);
  
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const shippingSubmit = (e) => {
        e.preventDefault();
    
        if (phoneNo.length < 10 || phoneNo.length > 10) {
          alert.error("Phone Number should be 10 digits Long");
          return;
        }
        dispatch(
          saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
       navigate("/order/confirm");
      };

  return (
   <>
   <CheckoutSteps activeStep={0}/>
     <div className=" w-screen max-w-full flex justify-center items-center flex-col">
        <div className="shippingBox h-96 w-50 box-border overflow-hidden">
          <h2 className="text-center lg:text-xl lg:p-2 border-b-2 border-orange m-auto w-2/4 ">Shipping Details</h2>

          <form
            className="flex flex-col items-center  lg:p-2 p-4 mb-10 justify-evenly h-4/5"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className='flex w-full items-center'>
              <HomeIcon className='absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1' />
              <input
              className='pl-10 w-full text-sm rounded'
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className='flex w-full items-center'>
              <LocationCityIcon className='absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1' />
              <input className='pl-10 w-full text-sm rounded'
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className='flex w-full items-center'>
              <PinDropIcon className='absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1' />
              <input className='pl-10 w-full text-sm rounded'
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className='flex w-full items-center'>
              <PhoneIcon className='absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1' />
              <input className='pl-10 w-full text-sm rounded'
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className='flex w-full items-center'>
              <PublicIcon className='absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1'/>

              <select className='pl-10 w-full text-sm rounded'
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className='flex w-full items-center'>
                <TransferWithinAStationIcon className='absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1' />

                <select className='pl-10 w-full text-sm rounded'
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input 
              type="submit"
              value="Continue"
              className="border-none w-full cursor-pointer outline-none bg-orange text-white text-sm p-2 transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
   </>
  )
}

export default Shipping