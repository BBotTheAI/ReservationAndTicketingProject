package com.hitit.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hitit.backend.entity.Flight;
import com.hitit.backend.entity.FlightId;

@Repository
public interface  FlightRepository extends JpaRepository<Flight, FlightId>{

    @Query("SELECT f FROM Flight f WHERE f.departureport = :dep AND f.arrivalport = :arr AND f.date = :date")
    List<Flight> findFlights(@Param("dep") String dep,
                            @Param("arr") String arr,
                            @Param("date") Date date);
    
}
