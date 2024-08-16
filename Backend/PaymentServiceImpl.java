package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.PaymentDTO;
import com.app.entities.Booking;
import com.app.entities.Payment;
import com.app.entities.Status;
import com.app.repository.BookingRepository;
import com.app.repository.PaymentRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService{

	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
    private BookingRepository bookingrepository;
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public String newPayment(PaymentDTO paymentDTO) {
		//Fetch Booking
		Booking booking = bookingrepository.findById(paymentDTO.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
		Booking amount = bookingrepository.findByPrice(paymentDTO.getAmount())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
		// Make and save the Payment
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentId(paymentDTO.getPaymentId());
        payment.setAmount(amount);
        payment.setStatus(Status.DONE);

		/* Payment newPayment = */paymentRepository.save(payment);

        // Optional: Send a booking confirmation email (if needed)
        // sendBookingConfirmationEmail(user, serviceProvider, savedBooking);
//        payment.setStatus("SUCCESSFUL");
      
        return "Payment Successfull"+paymentDTO.getStatus();
	}
	@Override
	public List<PaymentDTO> showPayments() {
		return paymentRepository.findAll() //List<Payment>
				.stream() //Stream<Service>
				.map(payment -> 
				modelMapper.map(payment,PaymentDTO.class)) 
				.collect(Collectors.toList());
	}
	@Override
	public List<PaymentDTO> showMyPayment(Long id) {
		// TODO Auto-generated method stub
		return null;
	} 
}
