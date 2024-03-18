package com.example.demo.api.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {

        return studentService.getStudents();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        System.out.println("studentId");
        System.out.println(studentId);
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    public Student updateStudent(@PathVariable("studentId") Long id, @RequestBody Map<String, Object> student) {
        System.out.println("Issue HERE Before calling Service");
        return studentService.updateStudent(id, student);
    }

}
