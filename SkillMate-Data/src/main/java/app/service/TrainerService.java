package app.service;

import app.dto.MeetingDto;
import app.entity.Meeting;
import app.entity.Role;
import app.entity.Trainer;
import app.entity.TrainerProfileDeleted;
import app.entity.TrainerProfileUpdated;
import app.jwt.AuthService;
import app.jwt.JwtResponse;
import app.repository.TrainerProfileDeletedRepository;
import app.repository.TrainerProfileUpdatedRepository;
import app.repository.TrainerRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrainerService {

	@Autowired
	private AuthService authService; // Inject AuthService

	@Autowired
	private TrainerRepository trainerRepository;

	@Autowired
	private TrainerProfileUpdatedRepository trainerProfileUpdatedRepository;

	@Autowired
	private TrainerProfileDeletedRepository trainerProfileDeletedRepository;

	// Create a new Trainer with role and return JWT token and user details
	public JwtResponse createTrainer(Trainer trainer) {
		if (trainer.getRoles() == null) {
			trainer.setRoles(new HashSet<>());
		}
		trainer.getRoles().add(Role.TRAINER);
		Trainer savedTrainer = trainerRepository.save(trainer);
		// Generate JWT token for the saved trainer using AuthService
		String token = authService.generateToken(authService.getTrainerUserDetails(savedTrainer));
		// Return JWT token and user details
		return JwtResponse.builder().token(token).userData(savedTrainer).build();
	}

	// Get all Trainers
	public List<Trainer> getAllTrainers() {
		return trainerRepository.findAll();
	}

	// Get Trainer by ID
	public Optional<Trainer> getTrainerById(Long trainerId) {
		return trainerRepository.findById(trainerId);
	}

	public Trainer updateTrainer(Long id, String fullName, String mobileNumber, String email, String address,
			String qualification, String experience, String workingStatus, List<String> technologies,
			MultipartFile profilePic, MultipartFile resume) {

		Optional<Trainer> opTrainer = trainerRepository.findById(id);
		if (opTrainer.isEmpty()) {
			return null; // Trainer not found
		}

		Trainer dbTrainer = opTrainer.get();

// Create a new TrainerProfileUpdated entry
		TrainerProfileUpdated trainerProfileUpdated = new TrainerProfileUpdated();
		trainerProfileUpdated.setTrainerId(dbTrainer.getId());
		trainerProfileUpdated.setUpdatedAt(LocalDateTime.now());

// Store non-empty fields in TrainerProfileUpdated
		if (dbTrainer.getFullName() != null)
			trainerProfileUpdated.setFullName(dbTrainer.getFullName());
		if (dbTrainer.getMobileNumber() != null)
			trainerProfileUpdated.setMobileNumber(dbTrainer.getMobileNumber());
		if (dbTrainer.getEmail() != null)
			trainerProfileUpdated.setEmail(dbTrainer.getEmail());
		if (dbTrainer.getAddress() != null)
			trainerProfileUpdated.setAddress(dbTrainer.getAddress());
		if (dbTrainer.getQualification() != null)
			trainerProfileUpdated.setQualification(dbTrainer.getQualification());
		if (dbTrainer.getExperience() != null)
			trainerProfileUpdated.setExperience(dbTrainer.getExperience());
		if (dbTrainer.getWorkingStatus() != null)
			trainerProfileUpdated.setWorkingStatus(dbTrainer.getWorkingStatus());
		if (dbTrainer.getProfilePic() != null)
			trainerProfileUpdated.setProfilePic(dbTrainer.getProfilePic());
		if (dbTrainer.getResume() != null)
			trainerProfileUpdated.setResume(dbTrainer.getResume());
		if (dbTrainer.getCompanyName() != null)
			trainerProfileUpdated.setCompanyName(dbTrainer.getCompanyName());

// Save the historical data
		trainerProfileUpdatedRepository.save(trainerProfileUpdated);

// Update Trainer with new values (only if they are not null)
		if (fullName != null)
			dbTrainer.setFullName(fullName);
		if (mobileNumber != null)
			dbTrainer.setMobileNumber(mobileNumber);
		if (email != null)
			dbTrainer.setEmail(email);
		if (address != null)
			dbTrainer.setAddress(address);
		if (qualification != null)
			dbTrainer.setQualification(qualification);
		if (experience != null)
			dbTrainer.setExperience(experience);
		if (workingStatus != null)
			dbTrainer.setWorkingStatus(workingStatus);
		if (technologies != null)
			dbTrainer.setTechnologies(technologies);

// Handle profile picture upload
		if (profilePic != null && !profilePic.isEmpty()) {
			try {
				byte[] profilePicBytes = profilePic.getBytes();
				dbTrainer.setProfilePic(profilePicBytes);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

// Handle resume upload
		if (resume != null && !resume.isEmpty()) {
			try {
				byte[] resumeBytes = resume.getBytes();
				dbTrainer.setResume(resumeBytes);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

// Save and return the updated trainer
		return trainerRepository.save(dbTrainer);
	}

//    @Transactional
//    public void updateTrainerProfile(Long id, Trainer updatedTrainer) {
//        Trainer existingTrainer = trainerRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));
//
//        // Update the trainer's fields (including profilePic if provided)
//        existingTrainer.setFullName(updatedTrainer.getFullName());
//        existingTrainer.setEmail(updatedTrainer.getEmail());
//        existingTrainer.setMobileNumber(updatedTrainer.getMobileNumber());
//        existingTrainer.setWorkingStatus(updatedTrainer.getWorkingStatus());
//        existingTrainer.setExperience(updatedTrainer.getExperience());
//        existingTrainer.setCompanyName(updatedTrainer.getCompanyName());
//        existingTrainer.setAddress(updatedTrainer.getAddress());
//        existingTrainer.setQualification(updatedTrainer.getQualification());
//        existingTrainer.setResume(updatedTrainer.getResume());
//
//        if (updatedTrainer.getProfilePic() != null) {
//            existingTrainer.setProfilePic(updatedTrainer.getProfilePic());
//        }
//
//        // Save the updated trainer to the database
//        trainerRepository.save(existingTrainer);
//    }

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
