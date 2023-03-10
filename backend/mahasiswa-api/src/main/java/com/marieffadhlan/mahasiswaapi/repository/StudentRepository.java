package com.marieffadhlan.mahasiswaapi.repository;

import com.marieffadhlan.mahasiswaapi.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findStudentByNim(String nim);
    List<Student> findStudentByEmail(String email);
}
