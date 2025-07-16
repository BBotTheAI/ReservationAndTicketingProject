package com.hitit.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservationflights")
public class ReservationFlight {

    @Id
    int pnr;

    String flightno;

    String cabin;

    public int getPnr() {
        return pnr;
    }

    public void setPnr(int pnr) {
        this.pnr = pnr;
    }

    public String getFlightNo() {
        return flightno;
    }

    public void setFlightNo(String flightNo) {
        this.flightno = flightNo;
    }

    public String getCabin() {
        return cabin;
    }

    public void setCabin(String cabin) {
        this.cabin = cabin;
    }

    


    


    
}
