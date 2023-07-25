import React from 'react'

import CardBox from '../components/CardBox'




import SectionMain from '../components/SectionMain'
function NewAppointment() {

    return (
      <SectionMain>
        <CardBox>
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <a
                href="#"
                className="font-medium text-orange-500 underline dark:text-blue-500 hover:no-underline"
              >
                Fetch Patient Details
              </a>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="patient_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Patient Id
                </label>
                <input
                  type="text"
                  id="patient_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="patient_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patient_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="modality"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {' '}
                  Modality
                </label>
                <input
                  type="text"
                  id="modality"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Traditional Clinician"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="speciality"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Speciality
                </label>
                <input
                  type="text"
                  id="speciality"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Oncology"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="patient_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {' '}
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="appointment-date"
                  name="appointment-date"
                  className="block w-full h-10 p-4 text-sm text-gray-900 border border-success rounded-lg bg-gray-50 focus:ring-success focus:border-success dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <div className="grid  mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="doctor_time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Doctor Time
                    </label>
                    <input
                      type="text"
                      id="doctor_time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="4:30"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="patient_time"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Patient Time
                    </label>
                    <input
                      type="text"
                      id="patient_time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="4:30"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="doctor_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Doctor Id
                </label>
                <input
                  type="text"
                  id="doctor_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Oncology"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="doctor_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctor_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Oncology"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
        </CardBox>
      </SectionMain>
    )
}
export default NewAppointment 