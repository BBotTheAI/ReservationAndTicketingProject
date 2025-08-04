package com.hitit.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hitit.backend.entity.Reservation;
import com.hitit.backend.entity.ReservationFlight;
import com.hitit.backend.entity.ReturnReservationFlight;
import com.hitit.backend.repository.ReservationFlightsRepository;
import com.hitit.backend.repository.ReservationRepository;
import com.hitit.backend.repository.ReturnReservationFlightsRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@RestController
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationFlightsRepository reservationFlightsRepository;

    @Autowired
    private ReturnReservationFlightsRepository returnReservationFlightsRepository;

    @PersistenceContext
    private EntityManager entityManager;



    @PostMapping("/createres")
    @Transactional
    public ResponseEntity<Integer> createReservation(@RequestBody Reservation reservation) {
        if (reservationRepository.existsById(reservation.getPnr())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Reservation saved = reservationRepository.save(reservation);
        saved.setStatus("PENDING");
        entityManager.refresh(saved);

        System.out.println("Generated pnr : " + saved.getPnr());

        Integer pnr = saved.getPnr();

        return ResponseEntity.ok(pnr);
        
    }

    @PostMapping("/createresflightrel")
    public ResponseEntity<String>  createReservationFligh(@RequestBody ReservationFlight reservationFlight) {
        
        
        if (reservationFlightsRepository.existsById(reservationFlight.getPnr())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }


        reservationFlightsRepository.save(reservationFlight);
        return ResponseEntity.ok("Relation Created");

        
    }

    @PostMapping("/createreturnresflightrel")
    public ResponseEntity<String>  createReturnReservationFligh(@RequestBody ReturnReservationFlight res) {
        
        
        if (returnReservationFlightsRepository.existsById(res.getPnr())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }


        returnReservationFlightsRepository.save(res);
        return ResponseEntity.ok("Relation Created");

        
    }
    
    















    
}
