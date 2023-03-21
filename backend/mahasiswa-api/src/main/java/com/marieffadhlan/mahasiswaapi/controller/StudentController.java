package com.marieffadhlan.mahasiswaapi.controller;

import com.marieffadhlan.mahasiswaapi.model.Student;
import com.marieffadhlan.mahasiswaapi.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("api/v1/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<Student> fetchAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student fetchStudent(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @GetMapping("/nim/{nim}")
    public List<Student> fetchStudentByNim(@PathVariable String nim) {
        return studentService.getStudentByNim(nim);
    }

    @GetMapping("/email/{email}")
    public List<Student> getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

    @GetMapping("edit/{id}")
    public Student editStudent(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public Student modifyStudent(@PathVariable String id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id) {
        return studentService.deleteStudent(id);
    }
}
