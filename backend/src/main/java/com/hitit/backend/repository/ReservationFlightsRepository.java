package com.hitit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hitit.backend.entity.ReservationFlight;

@Repository
public interface ReservationFlightsRepository extends JpaRepository<ReservationFlight, Integer>{
    
}
