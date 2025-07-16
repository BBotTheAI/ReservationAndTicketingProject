package com.hitit.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hitit.backend.entity.Reservation;
import com.hitit.backend.repository.ReservationRepository;




@RestController
public class PNRSearchController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping("/pnrsearch/{pnr}")
    public ResponseEntity<String> pnrSearch(@PathVariable int pnr) {
        if (reservationRepository.existsById(pnr)) {
            return ResponseEntity.ok("reservation found");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
        }


    }

    @PostMapping("/cancelRes/{pnr}")
    public ResponseEntity<String> cancelRes(@PathVariable int pnr) {
        Optional<Reservation> optional = reservationRepository.findById(pnr);
        
        if (optional.isPresent()) {
            Reservation res = optional.get();

            res.setStatus("CANCELED");

            reservationRepository.save(res);

            return ResponseEntity.ok("Reservation Canceled");
            
        }else {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
        
        }
        
        
    }

    @GetMapping("/reservation/{pnr}")
    public ResponseEntity<Reservation> getReservation(@PathVariable int pnr) {
        Optional<Reservation> opt = reservationRepository.findById(pnr);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    
    
    
    


    
}
