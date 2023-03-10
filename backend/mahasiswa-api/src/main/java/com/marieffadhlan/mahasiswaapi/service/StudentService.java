package com.marieffadhlan.mahasiswaapi.service;

import com.marieffadhlan.mahasiswaapi.model.Student;
import com.marieffadhlan.mahasiswaapi.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id).get();
    }

    public List<Student> getStudentByNim(String nim) {
        return studentRepository.findStudentByNim(nim);
    }

    public List<Student> getStudentByEmail(String email) {
        return studentRepository.findStudentByEmail(email);
    }

    public Student addStudent(Student student) {
        student.setId(UUID.randomUUID().toString().split("-")[0]);
        student.setCreated(LocalDateTime.now());
        student.setUpdated(null);

        return studentRepository.save(student);
    }

    public Student updateStudent(String id, Student studentRequest) {
        // Get the existing student document from DB
        Student student = studentRepository.findById(id).get();

        student.setNim(studentRequest.getNim());
        student.setEmail(studentRequest.getEmail());
        student.setName(studentRequest.getName());
        student.setAddress(studentRequest.getAddress());
        student.setFavouriteSubjects(studentRequest.getFavouriteSubjects());
        student.setUpdated(LocalDateTime.now());

        return studentRepository.save(student);
    }

    public String deleteStudent(String id) {
        studentRepository.deleteById(id);

        return "Siswa dengan id: " + id + " telah berhasil dihapus.";
    }
}
