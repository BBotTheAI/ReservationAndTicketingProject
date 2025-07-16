package com.hitit.backend.dto;

import java.util.Date;


public class FlightDto {

    String flightno;

    String cabin;

    String departureport;

    String arrivalport;

    Date date;

    int price;

    public String getFlightno() {
        return flightno;
    }

    public void setFlightno(String flightno) {
        this.flightno = flightno;
    }

    public String getCabin() {
        return cabin;
    }

    public void setCabin(String cabin) {
        this.cabin = cabin;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
    
}
