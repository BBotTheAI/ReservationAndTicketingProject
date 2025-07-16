package com.hitit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hitit.backend.entity.Flight;
import com.hitit.backend.entity.FlightId;

@Repository
public interface  FlightRepository extends JpaRepository<Flight, FlightId>{
    
}
