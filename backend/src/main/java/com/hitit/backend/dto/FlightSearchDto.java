package com.hitit.backend.dto;

import java.util.Date;

public class FlightSearchDto {
    String departureport;

    String arrivalport;

    Date date;

    

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDepartureport() {
        return departureport;
    }

    public void setDepartureport(String departureport) {
        this.departureport = departureport;
    }

    public String getArrivalport() {
        return arrivalport;
    }

    public void setArrivalport(String arrivalport) {
        this.arrivalport = arrivalport;
    }


    
}
