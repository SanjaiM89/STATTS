import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDevice = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddDevice = () => {
    if (!serialNumber || serialNumber.length !== 9) {
      setError('Please enter a valid 9-digit serial number');
      return;
    }

    // In a real app, this would make an API call to add the device
    console.log('Adding device with serial number:', serialNumber);
    
    // Navigate back to home after adding
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center p-4 bg-white">
        <button onClick={handleGoBack} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium">Manually Add</h1>
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="w-full bg-white rounded-lg p-4 mb-4">
          <div className="mb-2">
            <label className="block text-gray-700">
              <span className="text-red-500">*</span>Device Serial No.
            </label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => {
                setSerialNumber(e.target.value);
                setError('');
              }}
              placeholder="Input a 9-digit device serial No."
              className="w-full p-3 bg-gray-100 rounded-md mt-1"
              maxLength={9}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="w-full text-center mb-6">
          <p className="text-gray-600">
            You can find the serial number on the label or user manual of the device.
          </p>
        </div>

        <div className="w-full bg-white rounded-lg p-6 mb-8 flex justify-center">
          <div className="bg-gray-100 rounded-lg p-6 w-4/5 flex flex-col items-center">
            <div className="bg-white p-4 rounded-md w-full">
              <div className="text-center">
                <p className="font-medium">S/N: Q12345678</p>
                <p className="text-gray-400">xxxxxxxx</p>
              </div>
              <div className="flex justify-center mt-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-6 h-6 border border-gray-300"></div>
                  <div className="w-6 h-6 border border-gray-300"></div>
                  <div className="w-6 h-6 border border-gray-300"></div>
                  <div className="w-6 h-6 border border-gray-300"></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-6 bg-gray-200 w-full"></div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddDevice}
          className="w-full bg-red-500 text-white py-4 rounded-full hover:bg-red-600 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddDevice;