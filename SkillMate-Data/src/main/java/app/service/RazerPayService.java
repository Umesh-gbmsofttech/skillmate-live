package app.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class RazerPayService {

   @Value("${razerpay.api.url}")
   private String razerPayApiUrl;

   @Value("${razerpay.api.key.id}")
   private String apiKey;
   
   @Value("${razerpay.api.key.secrete}")
   private String apiKeySecrete;

   private RestTemplate restTemplate;
   private ObjectMapper objectMapper;

   public RazerPayService() {
       this.restTemplate = new RestTemplate();
       this.objectMapper = new ObjectMapper();
   }

   // Method to create a payment request
   public String createPaymentRequest(double amount, String currency) {
       String url = razerPayApiUrl + "/v1/orders";

       // Define the headers
       HttpHeaders headers = new HttpHeaders();
       headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString((apiKey + ":" + apiKeySecrete).getBytes()));
       headers.set("Content-Type", "application/json");

       // Define the body using a Map (for easier JSON conversion)
       Map<String, Object> body = new HashMap<>();
       body.put("amount", (int) (amount * 100)); // Razorpay expects amount in paisa
       body.put("currency", currency);
       body.put("receipt", "receipt#1"); // Example receipt

       try {
           String jsonBody = objectMapper.writeValueAsString(body); // Convert the body map to a JSON string

           // Make the HTTP POST request
           ResponseEntity<String> response = restTemplate.exchange(
               url, 
               HttpMethod.POST, 
               new HttpEntity<>(jsonBody, headers), 
               String.class
           );

           return response.getBody(); // Return the response body (payment details)

       } catch (Exception e) {
           e.printStackTrace();
           return "Error creating payment request";
       }
   }

   // Method to verify the payment after success
   public String verifyPayment(String paymentId) {
       String url = razerPayApiUrl + "/v1/payments/" + paymentId + "/verify";

       // Define the headers
       HttpHeaders headers = new HttpHeaders();
       headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString((apiKey + ":" + apiKeySecrete).getBytes()));

       // Make the HTTP GET request
       ResponseEntity<String> response = restTemplate.exchange(
           url, 
           HttpMethod.GET, 
           new HttpEntity<>(headers), 
           String.class
       );
       
       return response.getBody();
   }
}
