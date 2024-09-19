export default function CheckOutForm() {
          return (
                    <div className="billing-screen w-full lg:w-6/12">
                              <h1 className="text-3xl tracking-tighter lg:text-left text-center font-bold mb-10 lg:mt-0 mt-10">Billing details</h1>
                              <form>
                                        <div className="lg:flex lg:space-x-4">
                                                  <div className="mb-4 lg:w-1/2">
                                                            <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                                            <input type="text" id="fname" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Shreyash" required />
                                                  </div>
                                                  <div className="mb-4 lg:w-1/2">
                                                            <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                                            <input type="text" id="lname" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Sinha" required />
                                                  </div>
                                        </div>

                                        <div className="mb-4">
                                                  <label htmlFor="company-name" className="block mb-2 text-sm font-medium text-gray-90">Company Name [Optional]</label>
                                                  <input type="text" id="company-name" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Punjab National Bank" required />
                                        </div>

                                        <div className="mb-4">
                                                  <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">State</label>
                                                  <select id="countries" className=" outline-none focus:border-[#B88E2F] border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5 ">
                                                            <option value="Choose">Choose a State</option>
                                                            <option value="US">Uttar Pradesh</option>
                                                            <option value="CA">Karnataka</option>
                                                            <option value="FR">Madhya Pradesh</option>
                                                            <option value="DE">Maharashtra</option>
                                                  </select>
                                        </div>
                                        <div className="mb-4">
                                                  <label htmlFor="street-address" className="block mb-2 text-sm font-medium text-gray-90">Address</label>
                                                  <input type="text" id="street-address" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Padmavati Marketing, Banashankari 1st Stage" required />
                                        </div>

                                        <div className="mb-4">
                                                  <label htmlFor="town" className="block mb-2 text-sm font-medium text-gray-90">Town</label>
                                                  <input type="text" id="town" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Bengaluru South" required />
                                        </div>

                                        <div className="mb-4">
                                                  <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-90">Zip Code</label>
                                                  <input type="number" id="zipcode" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="560019" required />
                                        </div>

                                        <div className="mb-4">
                                                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-90">Phone</label>
                                                  <input type="tel" id="phone" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="7434247423" required />
                                        </div>

                                        <div className="mb-4">
                                                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-90">Email</label>
                                                  <input type="email" id="email" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="shreyash.cs22@bmsce.ac.in" required />
                                        </div>
                                        <div className="mb-4">
                                                  <label htmlFor="extra-info" className="block mb-2 text-sm font-medium text-gray-90">Additonal Information</label>
                                                  <textarea name="extra-info" id="extra-info" placeholder="Anything else we should know?" className="focus:border-[#B88E2F] border-2 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
                                        </div>

                              </form>
                    </div>
          )
}