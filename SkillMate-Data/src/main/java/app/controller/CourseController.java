package app.controller;

import app.entity.Course;
import app.service.CourseService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
// import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Create a new Course
    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestParam("courseName") String courseName,
                                               @RequestParam("days") String days,
                                               @RequestParam("price") String price,
                                               @RequestParam("description") String description,
                                               @RequestParam("coverImage") MultipartFile coverImage) {
        try {
            String coverImageBase64 = encodeToBase64(coverImage);
            Course course = new Course(courseName, days, price, description, coverImageBase64);
            Course createdCourse = courseService.createCourse(course);
            return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a Course by ID
    @GetMapping("/fetch/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long id) {
        Optional<Course> courseData = courseService.getCourseById(id);
        if (courseData.isPresent()) {
            return new ResponseEntity<>(courseData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Convert MultipartFile to Base64 string
    private String encodeToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }

	// Get all Courses
	@GetMapping("/fetch")
	public ResponseEntity<List<Course>> getAllCourses() {
		try {
			List<Course> courses = courseService.getAllCourses();
			return courses.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
					: new ResponseEntity<>(courses, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    // Update a Course
    @PutMapping("/update/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @Valid @RequestBody Course course) {
        Optional<Course> existingCourse = courseService.getCourseById(id);

        if (existingCourse.isPresent()) {
            course.setId(id);
            Course updatedCourse = courseService.updateCourse(course);
            return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a Course
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable("id") Long id) {
        try {
            courseService.deleteCourse(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}