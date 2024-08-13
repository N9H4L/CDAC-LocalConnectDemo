import React, { useState } from 'react';
import './ServiceList.css'; // Ensure this path is correct based on your project structure
import electricianJpg from '../../Images/electrician.jpg';
import homeclearnerJpg from '../../Images/Homeclearner.jpg';
import carpenterJpg from '../../Images/Carpenter.jpg';
import acrepairJpg from '../../Images/Acrepair.jpg';
import washingmachienJpg from '../../Images/Washingmachine.jpg';
import barberJpg from '../../Images/Barber.jpg';
import carandbikeJpg from '../../Images/carandbike.jpg';
import clinicJpg from '../../Images/ClinicCompounder.jpg';

const services = [
  { name: "ELECTRICIAN SERVICE", image: electricianJpg, id:1},
  { name: "HOME CLEANER SERVICE", image: homeclearnerJpg ,id:2},
  { name: "CARPENTER SERVICE", image: carpenterJpg ,id:3},
  { name: "Website Development", image: acrepairJpg, id:4},
  { name: "Website Development", image: washingmachienJpg ,id:5},
  { name: "Website Development", image: barberJpg ,id:6},
  { name: "Website Development", image: carandbikeJpg ,id:7},
  { name: "Website Development", image: clinicJpg ,id:8},
  // Add more services as needed
];

const ServiceList = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ date: '', time: '' });

  const handleImageClick = (service) => {
    setSelectedService(service);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      service: selectedService.name,
      id: selectedService.id,
      date: formData.date,
      time: formData.time,
    };

    try {
      const response = await fetch('/your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Data sent successfully');
        // Reset form
        setSelectedService(null);
        setFormData({ date: '', time: '' });
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="service-list-container">
        {services.map((service, index) => (
          <div key={index} className="service-card" onClick={() => handleImageClick(service)}>
            <img src={service.image} alt={service.name} />
            <div className="service-card-text">
              {service.name}
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <h3>Schedule for {selectedService.name}</h3>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setSelectedService(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ServiceList;