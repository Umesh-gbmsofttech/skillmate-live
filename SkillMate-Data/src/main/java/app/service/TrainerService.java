package app.service;

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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

// Update properties from the incoming request
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
			dbTrainer.setTechnologies(technologies); // Could split string into a list if needed

// Handle profile picture upload
		if (profilePic != null && !profilePic.isEmpty()) {
			try {
				byte[] profilePicBytes = profilePic.getBytes();
				dbTrainer.setProfilePic(profilePicBytes); // Assuming you are storing it as byte array in DB
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

// Handle resume upload
		if (resume != null && !resume.isEmpty()) {
			try {
				byte[] resumeBytes = resume.getBytes();
				dbTrainer.setResume(resumeBytes); // Assuming you are storing it as byte array in DB
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

// Save and return the updated trainer
		return trainerRepository.save(dbTrainer);
	}

	// Delete Trainer by ID
	public void deleteTrainer1(Long id) {
		trainerRepository.deleteById(id);
	}

	@Transactional
	public TrainerProfileUpdated updateTrainerWithHistory(Long id, Trainer updatedTrainer) {

		Trainer existingTrainer = trainerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));

		Optional<TrainerProfileUpdated> existingUpdatedProfile = trainerProfileUpdatedRepository
				.findByTrainerId(existingTrainer.getId());

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
