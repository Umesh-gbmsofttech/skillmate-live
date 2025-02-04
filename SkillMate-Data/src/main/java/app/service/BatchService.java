package app.service;

import app.entity.Batch;
import app.entity.Course;
import app.entity.Student;
import app.entity.Trainer;
import app.entity.Attendance;
import app.repository.BatchRepository;
import app.repository.CourseRepository;
import app.repository.StudentRepository;
import app.repository.TrainerRepository;
import app.repository.AttendanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BatchService {

	private static final Logger logger = LoggerFactory.getLogger(BatchService.class);

	@Autowired
	private BatchRepository batchRepository;

	@Autowired
	private AttendanceRepository attendanceRepository;
	@Autowired
	private TrainerRepository trainerRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private CourseRepository courseRepository;

	// Save or update Batch with Attendance management
	@Transactional
	public ResponseEntity<Batch> saveBatch(Batch batch) {
		Batch savedBatch = batchRepository.save(batch);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedBatch);
	}

	// Get Batch by ID
	public ResponseEntity<Batch> getBatchById(Long id) {
		Optional<Batch> batch = batchRepository.findById(id);
		return batch.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

	// Get All Batches with pagination
	public List<Batch> getAllBatches(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return batchRepository.findAll(pageable).getContent();
	}

	// Delete Batch by ID
	public ResponseEntity<String> deleteBatch(Long id) {
		if (batchRepository.existsById(id)) {
			batchRepository.deleteById(id);
			logger.info("Batch with ID {} deleted successfully.", id);
			return ResponseEntity.ok("Batch record deleted successfully.");
		}
		logger.warn("Batch with ID {} not found.", id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Batch record not found.");
	}

	// Get Batches by Trainer ID
	public List<Batch> getBatchesByTrainerId(Long trainerId) {
		logger.info("Fetching batches for trainer ID: {}", trainerId);
		return batchRepository.findByTrainerId(trainerId); // Fetch batches by trainer ID
	}

	// Get Batches by Student ID
	public List<Batch> getBatchesStudentId(Long studentId) {
		logger.info("Fetching batches for student ID: {}", studentId);
		return batchRepository.findByStudentsId(studentId); // Fetch batches by student ID
	}

	// Update Batch by ID
	public ResponseEntity<Batch> updateBatch(Long id, Batch newBatch) {
	    Optional<Batch> existingBatchOpt = batchRepository.findById(id);
	    
	    if (existingBatchOpt.isPresent()) {
	        Batch existingBatch = existingBatchOpt.get();

	        // Update only fields that are non-null and non-empty
	        if (newBatch.getTrainer() != null && !newBatch.getTrainer().isEmpty()) {
	            existingBatch.setTrainer(newBatch.getTrainer());
	        }
	        if (newBatch.getStudents() != null && !newBatch.getStudents().isEmpty()) {
	            existingBatch.setStudents(newBatch.getStudents());
	        }
	        if (newBatch.getMeetings() != null && !newBatch.getMeetings().isEmpty()) {
	            existingBatch.setMeetings(newBatch.getMeetings());
	        }
	        if (newBatch.getCourse() != null && !newBatch.getCourse().isEmpty()) {
	            existingBatch.setCourse(newBatch.getCourse());
	        }
	        if (newBatch.getAttendance() != null && !newBatch.getAttendance().isEmpty()) {
	            existingBatch.setAttendance(newBatch.getAttendance());
	        }

	        Batch updatedBatch = batchRepository.save(existingBatch);
	        return ResponseEntity.ok(updatedBatch);
	    } else {
	        return ResponseEntity.notFound().build(); // Return 404 if batch not found
	    }
	}


	private void updateBatchFields(Batch existingBatch, Batch newBatch) {
		if (newBatch.getTrainer() != null)
			existingBatch.setTrainer(newBatch.getTrainer());
		if (newBatch.getStudents() != null && !newBatch.getStudents().isEmpty())
			existingBatch.setStudents(newBatch.getStudents());
		if (newBatch.getCourse() != null)
			existingBatch.setCourse(newBatch.getCourse());
		if (newBatch.getAttendance() != null && !newBatch.getAttendance().isEmpty())
			existingBatch.setAttendance(newBatch.getAttendance());
	}

}
