package app.service;

import app.entity.Role;
import app.entity.Trainer;
import app.jwt.AuthService;
import app.jwt.JwtResponse;
import app.repository.TrainerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    AuthService authService;

    public JwtResponse saveTrainer(Trainer trainer) {
        if (trainer.getRoles() == null) {
            trainer.setRoles(new HashSet<>());
        }
        trainer.getRoles().add(Role.TRAINER);
        Trainer saved = trainerRepository.save(trainer);
        String token = authService.generateToken(authService.getTrainerUserDetails(saved));
        return JwtResponse.builder().token(token).userData(saved).build();
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }

    public Trainer updateTrainer(Long id, Trainer trainer) {
        Trainer existingTrainer = trainerRepository.findById(id).orElse(null);

        if (existingTrainer == null) {
            return null;
        }

        if (trainer.getName() != null) {
            existingTrainer.setName(trainer.getName());
        }
        if (trainer.getMobileNumber() != null) {
            existingTrainer.setMobileNumber(trainer.getMobileNumber());
        }
        if (trainer.getWorkingStatus() != null) {
            existingTrainer.setWorkingStatus(trainer.getWorkingStatus());
        }
        if (trainer.getExperience() != null) {
            existingTrainer.setExperience(trainer.getExperience());
        }
        if (trainer.getCompanyName() != null) {
            existingTrainer.setCompanyName(trainer.getCompanyName());
        }
        if (trainer.getEmail() != null) {
            existingTrainer.setEmail(trainer.getEmail());
        }
        if (trainer.getImage() != null) {
            existingTrainer.setImage(trainer.getImage());
        }
        if (trainer.getResume() != null) {
            existingTrainer.setResume(trainer.getResume());
        }
        if (trainer.getAddress() != null) {
            existingTrainer.setAddress(trainer.getAddress());
        }
        if (trainer.getQualification() != null) {
            existingTrainer.setQualification(trainer.getQualification());
        }
        if (trainer.getTechnologies() != null) {
            existingTrainer.setTechnologies(trainer.getTechnologies());
        }
        if (trainer.getRoles() != null) {
            existingTrainer.setRoles(trainer.getRoles());
        }
        return trainerRepository.save(existingTrainer);
    }

    // public void deleteTrainer(Long id) {

    // trainerRepository.deleteByTrainerId(id);
    // }
    @Transactional
    public void deleteTrainer(Long trainerId) {
        trainerRepository.deleteTrainerRatings(trainerId);
        trainerRepository.deleteTrainerCourses(trainerId);
        trainerRepository.deleteTrainerTechnologies(trainerId);
        trainerRepository.deleteTrainerAttendance(trainerId);
        trainerRepository.deleteTrainerMeetings(trainerId);
        trainerRepository.deleteTrainerRoles(trainerId);
        trainerRepository.deleteTrainerById(trainerId);
    }
}
