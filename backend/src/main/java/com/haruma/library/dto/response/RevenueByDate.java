package com.haruma.library.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@Builder
public class RevenueByDate {
    private Date date;
    private BigDecimal totalPrice;

    public RevenueByDate(Date date, BigDecimal totalPrice) {
        this.date = date;
        this.totalPrice = totalPrice;
    }


}


