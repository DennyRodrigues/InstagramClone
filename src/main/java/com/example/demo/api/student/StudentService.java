package com.example.demo.api.student;

import com.example.demo.utils.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public Student addNewStudent(Student student) {
        Optional<Student> studentByEmail = studentRepository.findStudentByEmail(student.getEmail());

        if (studentByEmail.isPresent()) {
            throw new IllegalStateException("email taken");
        }

        return studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new ApiRequestException(
                    "student with provided id " + studentId + " does not exists",
                    HttpStatus.BAD_REQUEST

            );
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public Student updateStudent(Long id, Map<String, Object> student) {

        Optional<Student> studentByEmail = studentRepository.findById(id);
        if (studentByEmail.isEmpty()) throw new IllegalStateException(
                "student with id " + id + " does not exists"
        );
        Student existingStudent = studentByEmail.get();
        // Update name if present in the received student

        // Update name if present and greater than 0
        if (student.containsKey("name") && student.get("name") != null && !student.get("name")
                                                                                  .toString()
                                                                                  .isEmpty()) {
            existingStudent.setName(student.get("name")
                                           .toString());
        }

        // Update date of birth if present
        if (student.containsKey("dov")) {
            Object dovValue = student.get("dov");
            if (dovValue instanceof String) {
                existingStudent.setDov(LocalDate.parse((String) dovValue));
            } else if (dovValue instanceof LocalDate) {
                existingStudent.setDov((LocalDate) dovValue);
            }
        }

        // Update email if present and greater than 0
        if (student.containsKey("email") && student.get("email") != null && !student.get("email")
                                                                                    .toString()
                                                                                    .isEmpty()) {
            existingStudent.setEmail(student.get("email")
                                            .toString());
        }


        studentRepository.save(existingStudent);
        return existingStudent;
    }
}
