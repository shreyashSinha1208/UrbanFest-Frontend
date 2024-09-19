import quality from '../assets/Trophy.png';
import warranty from '../assets/guarantee.png';
import shipping from '../assets/shipping.png';
import customerSupport from '../assets/customer-support.png';



export default function CartFooter() {
          return (
                    <div className='bg-[#F9F1E7]'>
                              <div className=" lg:mx-20 mx-12 lg:py-0 py-12 font-inter lg:h-40 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10 items-center">
                                        <div className="quality flex items-center">
                                                  <div className="img mr-2">
                                                            <img src={quality} alt="Quality-png" />
                                                  </div>
                                                  <div className="desc">
                                                            <h1 className='text-lg font-semibold'>High Quality</h1>
                                                            <p className='text-sm text-gray-500'>crafted from top materials.</p>
                                                  </div>

                                        </div>
                                        <div className="warranty flex items-center">
                                                  <div className="img mr-2">
                                                            <img src={warranty} alt="Warranty-png" />
                                                  </div>
                                                  <div className="desc">
                                                            <h1 className='text-lg font-semibold'>Warranty Protection</h1>
                                                            <p className='text-sm text-gray-500'>Over 2 years.</p>
                                                  </div>
                                        </div>
                                        <div className="shipping flex items-center">
                                                  <div className="img mr-2">
                                                            <img src={shipping} alt="Shipping-png" />
                                                  </div>
                                                  <div className="desc">
                                                            <h1 className='text-lg font-semibold'>Free Shipping</h1>
                                                            <p className='text-sm text-gray-500'>Order over ₹ 10,000</p>
                                                  </div>
                                        </div>
                                        <div className="customer-support  flex items-center">
                                                  <div className="img mr-2">
                                                            <img src={customerSupport} alt="CustomerSupport-png" />
                                                  </div>
                                                  <div className="desc">
                                                            <h1 className='text-lg font-semibold'>24/7 Support</h1>
                                                            <p className='text-sm text-gray-500'>Dedicated Support.</p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}