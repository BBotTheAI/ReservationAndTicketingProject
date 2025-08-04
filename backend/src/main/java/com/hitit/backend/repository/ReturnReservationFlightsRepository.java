package com.hitit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hitit.backend.entity.ReturnReservationFlight;

@Repository
public interface ReturnReservationFlightsRepository extends JpaRepository<ReturnReservationFlight, Integer>{
    
}
