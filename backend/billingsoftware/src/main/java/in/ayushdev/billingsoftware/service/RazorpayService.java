package in.ayushdev.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.ayushdev.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
