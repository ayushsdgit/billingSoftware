package in.ayushdev.billingsoftware.controller;


import in.ayushdev.billingsoftware.io.OrderRequest;
import in.ayushdev.billingsoftware.io.OrderResponse;
import in.ayushdev.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

     private final OrderService orderService;


     @PostMapping
     @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createdOrder(@RequestBody OrderRequest request){

        return orderService.createOrder(request);

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable String orderId){
         orderService.deleteOrder(orderId);
    }

    @GetMapping("/latest")
    public List<OrderResponse> getLatestOrders(){
         return orderService.getLatestOrders();
    }
}
