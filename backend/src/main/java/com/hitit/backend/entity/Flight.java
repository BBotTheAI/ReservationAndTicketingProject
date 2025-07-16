package com.hitit.backend.entity;

import java.util.Date;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "flights")
public class Flight {

    @EmbeddedId
    private FlightId id;

    String departureport;

    String arrivalport;

    Date date;

    int price;


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

    public FlightId getId() {
        return id;
    }

    public void setId(FlightId id) {
        this.id = id;
    }
    
}
