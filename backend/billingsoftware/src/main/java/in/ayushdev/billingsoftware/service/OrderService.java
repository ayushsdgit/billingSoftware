package in.ayushdev.billingsoftware.service;

import in.ayushdev.billingsoftware.io.OrderRequest;
import in.ayushdev.billingsoftware.io.OrderResponse;
import in.ayushdev.billingsoftware.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);
}
