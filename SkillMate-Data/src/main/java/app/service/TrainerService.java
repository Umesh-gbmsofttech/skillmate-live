package app.service;

import app.entity.Role;
import app.entity.Trainer;
import app.entity.TrainerProfileDeleted;
import app.entity.TrainerProfileUpdated;
import app.jwt.AuthService;
import app.repository.TrainerProfileDeletedRepository;
import app.repository.TrainerProfileUpdatedRepository;
import app.repository.TrainerRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrainerService {

    @Autowired
    private AuthService authService;  // Inject AuthService

    @Autowired
    private TrainerRepository trainerRepository;
    
    @Autowired
    private TrainerProfileUpdatedRepository trainerProfileUpdatedRepository;
    
    @Autowired
    private TrainerProfileDeletedRepository trainerProfileDeletedRepository;

    // Create a new Trainer with role
    public String createTrainer(Trainer trainer) {
        if (trainer.getRoles() == null) {
            trainer.setRoles(new HashSet<>());
        }
        trainer.getRoles().add(Role.TRAINER);
        Trainer savedTrainer = trainerRepository.save(trainer);

        // Generate JWT token for the saved trainer using AuthService
        return authService.generateToken(new org.springframework.security.core.userdetails.User(
                savedTrainer.getEmail(), 
                "", // Empty password as you might not be using passwords for trainers
                savedTrainer.getRoles().stream()
                    .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + role.name()))
                    .collect(Collectors.toList())
        ));
    }

    // Get all Trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // Get Trainer by ID
    public Optional<Trainer> getTrainerById(Long trainerId) {
        return trainerRepository.findById(trainerId);
    }

    // Update Trainer
    public Trainer updateTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // Delete Trainer by ID
    public void deleteTrainer1(Long id) {
        trainerRepository.deleteById(id);
    }
    
    
    @Transactional
    public TrainerProfileUpdated updateTrainerWithHistory(Long id, Trainer updatedTrainer) {
       
        Trainer existingTrainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));

        
        Optional<TrainerProfileUpdated> existingUpdatedProfile = 
                trainerProfileUpdatedRepository.findByTrainerId(existingTrainer.getId());

        TrainerProfileUpdated trainerProfileUpdated;

        if (existingUpdatedProfile.isPresent()) {
           
            trainerProfileUpdated = existingUpdatedProfile.get();
        } else {
            
            trainerProfileUpdated = new TrainerProfileUpdated();
            trainerProfileUpdated.setTrainerId(existingTrainer.getId()); 
        }

        
        trainerProfileUpdated.setProfilePic(updatedTrainer.getProfilePic());
        trainerProfileUpdated.setFullName(updatedTrainer.getFullName());
        trainerProfileUpdated.setMobileNumber(updatedTrainer.getMobileNumber());
        trainerProfileUpdated.setEmail(updatedTrainer.getEmail());
        trainerProfileUpdated.setWorkingStatus(updatedTrainer.getWorkingStatus());
        trainerProfileUpdated.setExperience(updatedTrainer.getExperience());
        trainerProfileUpdated.setCompanyName(updatedTrainer.getCompanyName());
        trainerProfileUpdated.setAddress(updatedTrainer.getAddress());
        trainerProfileUpdated.setQualification(updatedTrainer.getQualification());
        trainerProfileUpdated.setResume(updatedTrainer.getResume());

       
        return trainerProfileUpdatedRepository.save(trainerProfileUpdated);
    }
   
    @Transactional
    public void deleteTrainer(Long id) {
        
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));

       
        TrainerProfileDeleted trainerProfileDeleted = new TrainerProfileDeleted();
        trainerProfileDeleted.setTrainerId(trainer.getId());
        trainerProfileDeleted.setProfilePic(trainer.getProfilePic());
        trainerProfileDeleted.setFullName(trainer.getFullName());
        trainerProfileDeleted.setMobileNumber(trainer.getMobileNumber());
        trainerProfileDeleted.setEmail(trainer.getEmail());
        trainerProfileDeleted.setWorkingStatus(trainer.getWorkingStatus());
        trainerProfileDeleted.setExperience(trainer.getExperience());
        trainerProfileDeleted.setCompanyName(trainer.getCompanyName());
        trainerProfileDeleted.setAddress(trainer.getAddress());
        trainerProfileDeleted.setQualification(trainer.getQualification());
        trainerProfileDeleted.setResume(trainer.getResume());

        trainerProfileDeletedRepository.save(trainerProfileDeleted);

        
        trainerRepository.deleteById(id);
    }

}
