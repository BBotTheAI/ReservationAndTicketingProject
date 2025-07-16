package com.hitit.backend.dto;

public class ReservationFlightDto {

    int pnr;
    String flightno;
    String cabin;

    public int getPnr() {
        return pnr;
    }

    public void setPnr(int pnr) {
        this.pnr = pnr;
    }

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


    
}
