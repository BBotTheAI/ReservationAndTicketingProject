package com.hitit.backend.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class FlightId implements Serializable {

    private String flightno;
    private String cabin;

    // getters & setters
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

    // equals & hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FlightId flightId = (FlightId) o;
        return Objects.equals(flightno, flightId.flightno) &&
               Objects.equals(cabin, flightId.cabin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(flightno, cabin);
    }
}
