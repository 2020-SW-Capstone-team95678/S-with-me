package com.swithme.web.controller;

import com.swithme.payment.BootpayApi;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PaymentController {
    private final BootpayApi api;

    @CrossOrigin
    @GetMapping("student/profile/payhistory")
    public String verifyPayment(@RequestParam("receiptId") String receiptId) {
        try {
            api.getAccessToken();
        } catch (Exception e) {
            e.printStackTrace();
            return "getAccessToken Fail.";
        }

        try {
            HttpResponse res = api.verify(receiptId);
            String str = IOUtils.toString(res.getEntity().getContent(), "UTF-8");
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Verify Fail.";
        }
    }
}
